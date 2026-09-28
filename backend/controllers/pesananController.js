const db = require('../config/db');

exports.getPesanan = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pesanan ORDER BY created_at DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await db.query('UPDATE pesanan SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Pesanan tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Status berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};