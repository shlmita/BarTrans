const db = require('../config/db');

exports.getTruk = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM truk ORDER BY id DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error("Error getTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTruk = async (req, res) => {
  const { jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO truk (jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar]
    );
    res.status(201).json({ status: 'success', message: 'Truk berhasil ditambahkan', data: { id: result.insertId } });
  } catch (error) {
    console.error("Error createTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateTruk = async (req, res) => {
  const { id } = req.params;
  const { jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE truk SET jenis=?, nopol=?, kapasitas=?, volume=?, tarif=?, status=?, deskripsi=?, gambar=? WHERE id=?',
      [jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data truk tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Data truk berhasil diupdate' });
  } catch (error) {
    console.error("Error updateTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteTruk = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM truk WHERE id=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data truk tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Data truk berhasil dihapus' });
  } catch (error) {
    console.error("Error deleteTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};