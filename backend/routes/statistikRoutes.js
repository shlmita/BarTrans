const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [[{ bulanan }]] = await db.query(`
      SELECT SUM(total_harga) as bulanan 
      FROM pesanan 
      WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) 
      AND YEAR(created_at) = YEAR(CURRENT_DATE()) 
      AND status = 'Lunas'
    `);
    
    const [[{ mingguan }]] = await db.query(`
      SELECT SUM(total_harga) as mingguan 
      FROM pesanan 
      WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) 
      AND status = 'Lunas'
    `);

    // 🔥 PERBAIKAN: Menghitung nominal DAN jumlah orang/pesanan
    const [[{ tertunda, tertunda_count }]] = await db.query(`
      SELECT SUM(total_harga) as tertunda, COUNT(*) as tertunda_count 
      FROM pesanan 
      WHERE status = 'Pending' OR status IS NULL OR status != 'Lunas'
    `);

    const [[{ total_user }]] = await db.query(`SELECT COUNT(*) as total_user FROM akun WHERE role = 'User'`);
    const [[{ user_baru }]] = await db.query(`
      SELECT COUNT(*) as user_baru 
      FROM akun 
      WHERE role = 'User' 
      AND MONTH(created_at) = MONTH(CURRENT_DATE()) 
      AND YEAR(created_at) = YEAR(CURRENT_DATE())
    `);

    const [layananRows] = await db.query(`SELECT layanan, COUNT(*) as jumlah FROM pesanan GROUP BY layanan`);
    let trxMobil = 0, trxTravel = 0, trxAngkut = 0, trxWisata = 0;
    
    layananRows.forEach(row => {
      const l = row.layanan ? row.layanan.toLowerCase() : '';
      if (l.includes('mobil')) trxMobil = row.jumlah;
      else if (l.includes('travel')) trxTravel = row.jumlah;
      else if (l.includes('angkut') || l.includes('truk') || l.includes('box')) trxAngkut = row.jumlah;
      else if (l.includes('wisata') || l.includes('paket')) trxWisata = row.jumlah;
    });

    // 🔥 PERBAIKAN GRAFIK: Buat template 7 hari kosong dulu (diisi angka 0)
    const hariIndo = { 'Sunday':'Min', 'Monday':'Sen', 'Tuesday':'Sel', 'Wednesday':'Rab', 'Thursday':'Kam', 'Friday':'Jum', 'Saturday':'Sab' };
    let grafikData = [];
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
        grafikData.push({ name: hariIndo[dayName], masuk: 0 });
    }

    // Ambil data asli dari DB
    const [grafikRows] = await db.query(`
      SELECT DATE(created_at) as tgl, DAYNAME(created_at) as hari, SUM(total_harga) as masuk
      FROM pesanan
      WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) 
      AND status = 'Lunas'
      GROUP BY tgl, hari
    `);

    // Timpa angka 0 dengan nominal asli jika di hari itu ada transaksi
    grafikRows.forEach(row => {
       const dayName = hariIndo[row.hari];
       const target = grafikData.find(g => g.name === dayName);
       if(target) target.masuk = Number(row.masuk) || 0;
    });

    res.json({
      status: 'success',
      data: {
        pemasukanMingguan: Number(mingguan) || 0,
        pemasukanBulanan: Number(bulanan) || 0,
        tertunda: Number(tertunda) || 0,
        tertundaCount: Number(tertunda_count) || 0, // <-- Data Baru
        totalPengguna: total_user || 0,
        penggunaBaru: user_baru || 0,
        trxMobil, trxTravel, trxAngkut, trxWisata,
        grafik: grafikData
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Gagal mengambil data statistik' });
  }
});

module.exports = router;