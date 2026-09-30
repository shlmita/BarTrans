const db = require('../config/db');

exports.getWisata = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM paket_wisata ORDER BY id DESC');
    
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

exports.createWisata = async (req, res) => {
  const { nama, tujuan, durasi, minPax, harga, deskripsi, fasilitas, gambar, status } = req.body;
  const fasString = JSON.stringify(fasilitas || []);

  try {
    const { rows } = await db.query(
      'INSERT INTO paket_wisata (nama, tujuan, durasi, min_pax, harga, deskripsi, fasilitas, gambar, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [nama, tujuan, durasi, minPax || 1, harga, deskripsi, fasString, gambar, status || 'Tersedia']
    );
    res.status(201).json({ 
      status: 'success', 
      message: 'Paket Wisata berhasil ditambahkan', 
      data: { id: rows[0].id } 
    });
  } catch (error) {
    console.error("Error createWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateWisata = async (req, res) => {
  const { id } = req.params;
  const { nama, tujuan, durasi, minPax, harga, deskripsi, fasilitas, gambar, status } = req.body;
  const fasString = JSON.stringify(fasilitas || []);

  try {
    const result = await db.query(
      'UPDATE paket_wisata SET nama=$1, tujuan=$2, durasi=$3, min_pax=$4, harga=$5, deskripsi=$6, fasilitas=$7, gambar=$8, status=$9 WHERE id=$10',
      [nama, tujuan, durasi, minPax, harga, deskripsi, fasString, gambar, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Data wisata tidak ditemukan' });
    }

    res.json({ status: 'success', message: 'Data paket wisata berhasil diupdate' });
  } catch (error) {
    console.error("Error updateWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteWisata = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM paket_wisata WHERE id=$1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Data wisata tidak ditemukan' });
    }

    res.json({ status: 'success', message: 'Data paket wisata berhasil dihapus' });
  } catch (error) {
    console.error("Error deleteWisata:", error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
};