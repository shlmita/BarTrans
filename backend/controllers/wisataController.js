const db = require('../config/db');

// 1. GET ALL PAKET WISATA
exports.getWisata = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM paket_wisata ORDER BY id DESC');
    
    // Safety check parse JSON untuk array fasilitas
    const formatted = rows.map(item => ({
      ...item,
      fasilitas: typeof item.fasilitas === 'string' ? JSON.parse(item.fasilitas || '[]') : (item.fasilitas || [])
    }));

    res.json({ status: 'success', data: formatted });
  } catch (error) {
    console.error("Error getWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. CREATE PAKET WISATA
exports.createWisata = async (req, res) => {
  const { nama, tujuan, durasi, minPax, harga, deskripsi, fasilitas, gambar, status } = req.body;
  const fasString = JSON.stringify(fasilitas || []);

  try {
    const [result] = await db.query(
      'INSERT INTO paket_wisata (nama, tujuan, durasi, min_pax, harga, deskripsi, fasilitas, gambar, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nama, tujuan, durasi, minPax || 1, harga, deskripsi, fasString, gambar, status || 'Tersedia']
    );
    res.status(201).json({ 
      status: 'success', 
      message: 'Paket Wisata berhasil ditambahkan', 
      data: { id: result.insertId } 
    });
  } catch (error) {
    console.error("Error createWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 3. UPDATE PAKET WISATA
exports.updateWisata = async (req, res) => {
  const { id } = req.params;
  const { nama, tujuan, durasi, minPax, harga, deskripsi, fasilitas, gambar, status } = req.body;
  const fasString = JSON.stringify(fasilitas || []);

  try {
    const [result] = await db.query(
      'UPDATE paket_wisata SET nama=?, tujuan=?, durasi=?, min_pax=?, harga=?, deskripsi=?, fasilitas=?, gambar=?, status=? WHERE id=?',
      [nama, tujuan, durasi, minPax, harga, deskripsi, fasString, gambar, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data wisata tidak ditemukan' });
    }

    res.json({ status: 'success', message: 'Data paket wisata berhasil diupdate' });
  } catch (error) {
    console.error("Error updateWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 4. DELETE PAKET WISATA
exports.deleteWisata = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM paket_wisata WHERE id=?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data wisata tidak ditemukan' });
    }

    res.json({ status: 'success', message: 'Data paket wisata berhasil dihapus' });
  } catch (error) {
    console.error("Error deleteWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};