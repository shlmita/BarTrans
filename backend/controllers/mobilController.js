const db = require('../config/db');

exports.getMobil = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mobil ORDER BY id DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error("Error getMobil:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 🔥 TAMBAHAN: Fungsi untuk MENYIMPAN data baru
exports.createMobil = async (req, res) => {
  const { unit, nopol, lokasi, brand, status, tglReady, harga, deskripsi, kondisi, fitur, gambar } = req.body;
  try {
    const fiturString = JSON.stringify(fitur || []); 
    const [result] = await db.query(
      'INSERT INTO mobil (unit, nopol, lokasi, brand, status, tglReady, harga, deskripsi, kondisi, fitur, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [unit, nopol, lokasi, brand, status, tglReady, harga, deskripsi, kondisi, fiturString, gambar]
    );
    res.status(201).json({ status: 'success', message: 'Mobil berhasil ditambahkan', data: { id: result.insertId } });
  } catch (error) {
    console.error("Error createMobil:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 🔥 TAMBAHAN: Fungsi untuk MENGEDIT data
exports.updateMobil = async (req, res) => {
  const { id } = req.params;
  const { unit, nopol, lokasi, brand, status, tglReady, harga, deskripsi, kondisi, fitur, gambar } = req.body;
  try {
    const fiturString = JSON.stringify(fitur || []);
    const [result] = await db.query(
      'UPDATE mobil SET unit=?, nopol=?, lokasi=?, brand=?, status=?, tglReady=?, harga=?, deskripsi=?, kondisi=?, fitur=?, gambar=? WHERE id=?',
      [unit, nopol, lokasi, brand, status, tglReady, harga, deskripsi, kondisi, fiturString, gambar, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data mobil tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Data mobil berhasil diupdate' });
  } catch (error) {
    console.error("Error updateMobil:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 🔥 TAMBAHAN: Fungsi untuk MENGHAPUS data
exports.deleteMobil = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM mobil WHERE id=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data mobil tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Data mobil berhasil dihapus' });
  } catch (error) {
    console.error("Error deleteMobil:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};