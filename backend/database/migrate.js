const db = require('../config/db');

const createTables = async () => {
  const queryMobil = `
    CREATE TABLE IF NOT EXISTS mobil (
      id INT AUTO_INCREMENT PRIMARY KEY,
      unit VARCHAR(150) NOT NULL,
      nopol VARCHAR(20),
      lokasi VARCHAR(150),
      brand VARCHAR(100),
      harga DECIMAL(12,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'Tersedia',
      tglReady DATE,
      kondisi VARCHAR(100),
      deskripsi TEXT,
      fitur TEXT,
      gambar VARCHAR(255)
    );
  `;

  const queryPesanan = `
    CREATE TABLE IF NOT EXISTS pesanan (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama_user VARCHAR(100) NOT NULL,
      no_hp VARCHAR(20) NOT NULL,
      layanan VARCHAR(50) DEFAULT 'Sewa Mobil',
      unit_mobil VARCHAR(100),
      rute VARCHAR(150),
      tgl_sewa DATETIME,
      total_harga DECIMAL(12,2) DEFAULT 0,
      status VARCHAR(20) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(queryMobil);
    await db.query(queryPesanan);
    console.log("✅ Sistem Database Siap: Tabel 'mobil' dan 'pesanan' diverifikasi.");
  } catch (error) {
    console.error("❌ Gagal merakit tabel database:", error.message);
  }
};

module.exports = createTables;