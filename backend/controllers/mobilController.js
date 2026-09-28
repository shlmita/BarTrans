const db = require('../config/db');

exports.getMobil = async (req, res) => {
  try {
    // Ubah "created_at" menjadi "id"
    const [rows] = await db.query('SELECT * FROM mobil ORDER BY id DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error("Error getMobil:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};