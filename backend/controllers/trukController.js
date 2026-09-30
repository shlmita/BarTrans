const db = require('../config/db');

exports.getTruk = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM truk ORDER BY id DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error("Error getTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTruk = async (req, res) => {
  const { jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO truk (jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar]
    );
    res.status(201).json({ status: 'success', message: 'Truk berhasil ditambahkan', data: { id: rows[0].id } });
  } catch (error) {
    console.error("Error createTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateTruk = async (req, res) => {
  const { id } = req.params;
  const { jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar } = req.body;
  try {
    const result = await db.query(
      'UPDATE truk SET jenis=$1, nopol=$2, kapasitas=$3, volume=$4, tarif=$5, status=$6, deskripsi=$7, gambar=$8 WHERE id=$9',
      [jenis, nopol, kapasitas, volume, tarif, status, deskripsi, gambar, id]
    );
    if (result.rowCount === 0) {
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
    const result = await db.query('DELETE FROM truk WHERE id=$1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Data truk tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Data truk berhasil dihapus' });
  } catch (error) {
    console.error("Error deleteTruk:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};