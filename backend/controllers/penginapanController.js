const db = require('../config/db');

exports.getAllPenginapan = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM penginapan ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createPenginapan = async (req, res) => {
  const { nama, tipe, noKamar, lantai, jmlKamarTidur, kapasitas, harga, status, deskripsi, fasilitas, gambar } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO penginapan 
      (nama, tipe, noKamar, lantai, jmlKamarTidur, kapasitas, harga, status, deskripsi, fasilitas, gambar) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nama, tipe, noKamar || '-', lantai || '-', jmlKamarTidur || '-', kapasitas || '-', harga, status, deskripsi, fasilitas, gambar]
    );
    res.status(201).json({ status: 'success', message: 'Penginapan berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updatePenginapan = async (req, res) => {
  const { id } = req.params;
  const { nama, tipe, noKamar, lantai, jmlKamarTidur, kapasitas, harga, status, deskripsi, fasilitas, gambar } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE penginapan SET 
      nama=?, tipe=?, noKamar=?, lantai=?, jmlKamarTidur=?, kapasitas=?, harga=?, status=?, deskripsi=?, fasilitas=?, gambar=? 
      WHERE id=?`,
      [nama, tipe, noKamar || '-', lantai || '-', jmlKamarTidur || '-', kapasitas || '-', harga, status, deskripsi, fasilitas, gambar, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ status: 'success', message: 'Data berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deletePenginapan = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM penginapan WHERE id = ?', [id]);
    res.json({ status: 'success', message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};