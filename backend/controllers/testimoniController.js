const db = require('../config/db');

exports.getTestimoni = async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM testimoni ORDER BY created_at DESC';
    let params = [];
    
    if (status) {
      query = 'SELECT * FROM testimoni WHERE status = $1 ORDER BY created_at DESC';
      params = [status];
    }
    
    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTestimoni = async (req, res) => {
  const { nama, role, layanan, rating, comment, gambar } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO testimoni (nama, role, layanan, rating, comment, gambar, status) VALUES ($1, $2, $3, $4, $5, $6, 'Approved') RETURNING id`,
      [nama, role, layanan, rating, comment, gambar]
    );
    res.status(201).json({ status: 'success', message: 'Testimoni terkirim', id: rows[0].id });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    await db.query('UPDATE testimoni SET status = $1 WHERE id = $2', [status, id]);
    res.json({ status: 'success', message: `Testimoni berhasil di-${status}` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteTestimoni = async (req, res) => {
  try {
    await db.query('DELETE FROM testimoni WHERE id = $1', [req.params.id]);
    res.json({ status: 'success', message: 'Testimoni dihapus' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};