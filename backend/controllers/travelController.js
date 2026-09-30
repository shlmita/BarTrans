const db = require('../config/db');

exports.getAllTravel = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM travel ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createTravel = async (req, res) => {
  const { rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMap } = req.body;
  try {
    const seatMapStr = typeof seatMap === 'string' ? seatMap : JSON.stringify(seatMap);
    const { rows } = await db.query(
      `INSERT INTO travel (rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMap) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMapStr]
    );
    res.status(201).json({ status: 'success', message: 'Armada Travel ditambahkan', id: rows[0].id });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateTravel = async (req, res) => {
  const { id } = req.params;
  const { rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMap } = req.body;
  try {
    const seatMapStr = typeof seatMap === 'string' ? seatMap : JSON.stringify(seatMap);
    const result = await db.query(
      `UPDATE travel SET rute=$1, unit=$2, kursiTotal=$3, kursiTersedia=$4, harga=$5, gambar=$6, seatMap=$7 WHERE id=$8`,
      [rute, unit, kursiTotal, kursiTersedia, harga, gambar, seatMapStr, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ status: 'success', message: 'Data berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteTravel = async (req, res) => {
  try {
    await db.query('DELETE FROM travel WHERE id = $1', [req.params.id]);
    res.json({ status: 'success', message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.bookSeats = async (req, res) => {
  const { id } = req.params;
  const { bookedSeats } = req.body;

  try {
    const { rows } = await db.query('SELECT seatMap FROM travel WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Travel tidak ditemukan' });

    let seatMap = rows[0].seatmap || rows[0].seatMap; // Postgres kadang mengubah nama kolom jadi lowercase
    if (typeof seatMap === 'string') seatMap = JSON.parse(seatMap);
    if (typeof seatMap === 'string') seatMap = JSON.parse(seatMap);

    seatMap = seatMap.map(seat => {
      if (bookedSeats.includes(seat.id)) {
        return { ...seat, isReady: false };
      }
      return seat;
    });

    const newKursiTersedia = seatMap.filter(s => s.isReady).length;

    await db.query('UPDATE travel SET seatMap = $1, kursiTersedia = $2 WHERE id = $3', [JSON.stringify(seatMap), newKursiTersedia, id]);

    res.json({ status: 'success', message: 'Kursi berhasil dibooking dan ditutup.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};