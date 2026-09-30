const db = require('../config/db');

exports.getAllTravel = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM travel ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTravel = async (req, res) => {
  const { rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMap } = req.body;
  try {
    const seatMapStr = typeof seatMap === 'string' ? seatMap : JSON.stringify(seatMap);
    const [result] = await db.query(
      `INSERT INTO travel (rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMap) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMapStr]
    );
    res.status(201).json({ status: 'success', message: 'Armada Travel ditambahkan', id: result.insertId });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateTravel = async (req, res) => {
  const { id } = req.params;
  const { rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMap } = req.body;
  try {
    const seatMapStr = typeof seatMap === 'string' ? seatMap : JSON.stringify(seatMap);
    const [result] = await db.query(
      `UPDATE travel SET rute=?, unit=?, kursiTotal=?, kursiTersedia=?, harga=?, gambar=?, seatMap=? WHERE id=?`,
      [rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMapStr, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ status: 'success', message: 'Data berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteTravel = async (req, res) => {
  try {
    await db.query('DELETE FROM travel WHERE id = ?', [req.params.id]);
    res.json({ status: 'success', message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 🔥 FUNGSI BARU: AUTO-CLOSE KURSI SAAT ADA TRANSAKSI 🔥
exports.bookSeats = async (req, res) => {
  const { id } = req.params;
  const { bookedSeats } = req.body; // Array kursi yang dipilih user, misal: [1, 2]

  try {
    // Tarik map kursi saat ini dari database
    const [rows] = await db.query('SELECT seatMap FROM travel WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Travel tidak ditemukan' });

    let seatMap = rows[0].seatMap;
    if (typeof seatMap === 'string') seatMap = JSON.parse(seatMap);
    if (typeof seatMap === 'string') seatMap = JSON.parse(seatMap); // Parse ganda untuk jaga-jaga

    // Ubah status kursi yang dipesan menjadi isReady: false
    seatMap = seatMap.map(seat => {
      if (bookedSeats.includes(seat.id)) {
        return { ...seat, isReady: false };
      }
      return seat;
    });

    // Hitung ulang jumlah kursi yang tersisa
    const newKursiTersedia = seatMap.filter(s => s.isReady).length;

    // Simpan kembali ke database
    await db.query('UPDATE travel SET seatMap = ?, kursiTersedia = ? WHERE id = ?', [JSON.stringify(seatMap), newKursiTersedia, id]);

    res.json({ status: 'success', message: 'Kursi berhasil dibooking dan ditutup.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};