const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    // 1. Bulanan (Menggunakan EXTRACT untuk ambil bulan dan tahun di PostgreSQL)
    const { rows: resBulanan } = await db.query(`
      SELECT SUM(total_harga) as bulanan 
      FROM pesanan 
      WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) 
      AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE) 
      AND status = 'Lunas'
    `);
    const bulanan = resBulanan[0]?.bulanan || 0;

    // 2. Mingguan (Menggunakan INTERVAL untuk PostgreSQL)
    const { rows: resMingguan } = await db.query(`
      SELECT SUM(total_harga) as mingguan 
      FROM pesanan 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days' 
      AND status = 'Lunas'
    `);
    const mingguan = resMingguan[0]?.mingguan || 0;

    // 3. Tertunda
    const { rows: resTertunda } = await db.query(`
      SELECT SUM(total_harga) as tertunda, COUNT(*) as tertunda_count 
      FROM pesanan 
      WHERE status = 'Pending' OR status IS NULL OR status != 'Lunas'
    `);
    const tertunda = resTertunda[0]?.tertunda || 0;
    const tertunda_count = resTertunda[0]?.tertunda_count || 0;

    // 4. Total User
    const { rows: resTotalUser } = await db.query(`SELECT COUNT(*) as total_user FROM akun WHERE role = 'User'`);
    const total_user = resTotalUser[0]?.total_user || 0;

    // 5. User Baru
    const { rows: resUserBaru } = await db.query(`
      SELECT COUNT(*) as user_baru 
      FROM akun 
      WHERE role = 'User' 
      AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) 
      AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
    `);
    const user_baru = resUserBaru[0]?.user_baru || 0;

    // 6. Layanan
    const { rows: layananRows } = await db.query(`SELECT layanan, COUNT(*) as jumlah FROM pesanan GROUP BY layanan`);
    let trxMobil = 0, trxTravel = 0, trxAngkut = 0, trxWisata = 0;
    
    layananRows.forEach(row => {
      const l = row.layanan ? row.layanan.toLowerCase() : '';
      const jumlah = Number(row.jumlah); // PostgreSQL mengembalikan COUNT sebagai string
      if (l.includes('mobil')) trxMobil = jumlah;
      else if (l.includes('travel')) trxTravel = jumlah;
      else if (l.includes('angkut') || l.includes('truk') || l.includes('box')) trxAngkut = jumlah;
      else if (l.includes('wisata') || l.includes('paket')) trxWisata = jumlah;
    });

    // 7. Grafik
    const hariIndo = { 'Sunday':'Min', 'Monday':'Sen', 'Tuesday':'Sel', 'Wednesday':'Rab', 'Thursday':'Kam', 'Friday':'Jum', 'Saturday':'Sab' };
    let grafikData = [];
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
        grafikData.push({ name: hariIndo[dayName], masuk: 0 });
    }

    // Mengganti DAYNAME() dengan to_char(created_at, 'Day') dan TRIM agar spasinya hilang
    const { rows: grafikRows } = await db.query(`
      SELECT DATE(created_at) as tgl, TRIM(to_char(created_at, 'Day')) as hari, SUM(total_harga) as masuk
      FROM pesanan
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days' 
      AND status = 'Lunas'
      GROUP BY DATE(created_at), TRIM(to_char(created_at, 'Day'))
    `);

    grafikRows.forEach(row => {
       const dayName = hariIndo[row.hari];
       const target = grafikData.find(g => g.name === dayName);
       if(target) target.masuk = Number(row.masuk) || 0;
    });

    res.json({
      status: 'success',
      data: {
        pemasukanMingguan: Number(mingguan),
        pemasukanBulanan: Number(bulanan),
        tertunda: Number(tertunda),
        tertundaCount: Number(tertunda_count),
        totalPengguna: Number(total_user),
        penggunaBaru: Number(user_baru),
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