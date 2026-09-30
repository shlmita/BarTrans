const db = require('../config/db');

exports.getTestimoni = async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM testimoni ORDER BY created_at DESC';
    let params = [];
    
    if (status) {
      query = 'SELECT * FROM testimoni WHERE status = ? ORDER BY created_at DESC';
      params = [status];
    }
    
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTestimoni = async (req, res) => {
  const { nama, role, layanan, rating, comment, gambar } = req.body;
  try {
    // 🔥 UBAH 'Pending' JADI 'Approved' AGAR LANGSUNG MUNCUL DI BERANDA
    const [result] = await db.query(
      `INSERT INTO testimoni (nama, role, layanan, rating, comment, gambar, status) VALUES (?, ?, ?, ?, ?, ?, 'Approved')`,
      [nama, role, layanan, rating, comment, gambar]
    );
    res.status(201).json({ status: 'success', message: 'Testimoni terkirim', id: result.insertId });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    await db.query('UPDATE testimoni SET status = ? WHERE id = ?', [status, id]);
    res.json({ status: 'success', message: `Testimoni berhasil di-${status}` });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteTestimoni = async (req, res) => {
  try {
    await db.query('DELETE FROM testimoni WHERE id = ?', [req.params.id]);
    res.json({ status: 'success', message: 'Testimoni dihapus' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};