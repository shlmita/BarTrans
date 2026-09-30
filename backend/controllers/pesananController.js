const db = require('../config/db');

exports.getPesanan = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM pesanan ORDER BY created_at DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query('UPDATE pesanan SET status = $1 WHERE id = $2', [status, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Pesanan tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Status berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createPesanan = async (req, res) => {
  const { nama_user, no_hp, layanan, unit_mobil, rute, tgl_sewa, total_harga, status } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO pesanan (nama_user, no_hp, layanan, unit_mobil, rute, tgl_sewa, total_harga, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [
        nama_user, 
        no_hp, 
        layanan || 'Sewa Mobil', 
        unit_mobil || '-', 
        rute || '-', 
        tgl_sewa, 
        total_harga || 0, 
        status || 'Pending'
      ]
    );
    res.status(201).json({ status: 'success', message: 'Pesanan berhasil dibuat', data: { id: rows[0].id } });
  } catch (error) {
    console.error("Error createPesanan:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deletePesanan = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM pesanan WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Data pesanan tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Data pesanan berhasil dihapus' });
  } catch (error) {
    console.error("Error deletePesanan:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};