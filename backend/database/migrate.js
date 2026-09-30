const db = require('../config/db');

const createTables = async () => {
  const queryMobil = `
    CREATE TABLE IF NOT EXISTS mobil (
      id SERIAL PRIMARY KEY,
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
      gambar TEXT
    );
  `;

  const queryPesanan = `
    CREATE TABLE IF NOT EXISTS pesanan (
      id SERIAL PRIMARY KEY,
      nama_user VARCHAR(100) NOT NULL,
      no_hp VARCHAR(20) NOT NULL,
      layanan VARCHAR(50) DEFAULT 'Sewa Mobil',
      unit_mobil VARCHAR(100),
      rute TEXT, 
      tgl_sewa TIMESTAMP,
      total_harga DECIMAL(12,2) DEFAULT 0,
      status VARCHAR(20) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const queryAkun = `
    CREATE TABLE IF NOT EXISTS akun (
      id SERIAL PRIMARY KEY,
      nama VARCHAR(100) NOT NULL,
      whatsapp VARCHAR(20) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      nik VARCHAR(30),
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'User' CHECK (role IN ('Superadmin', 'Driver', 'User')),
      status VARCHAR(50) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Banned')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const queryTruk = `
    CREATE TABLE IF NOT EXISTS truk (
      id SERIAL PRIMARY KEY,
      jenis VARCHAR(150) NOT NULL,
      nopol VARCHAR(20),
      kapasitas VARCHAR(50),
      volume VARCHAR(50),
      tarif DECIMAL(12,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'Tersedia',
      deskripsi TEXT,
      gambar TEXT
    );
  `;

  const queryWisata = `
    CREATE TABLE IF NOT EXISTS paket_wisata (
      id SERIAL PRIMARY KEY,
      nama VARCHAR(150) NOT NULL,
      tujuan VARCHAR(150) NOT NULL,
      durasi VARCHAR(100),
      min_pax INT DEFAULT 1,
      harga DECIMAL(12,2) NOT NULL,
      deskripsi TEXT,
      fasilitas TEXT,
      gambar TEXT,
      status VARCHAR(50) DEFAULT 'Tersedia',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const queryPenginapan = `
    CREATE TABLE IF NOT EXISTS penginapan (
      id SERIAL PRIMARY KEY,
      nama VARCHAR(150) NOT NULL,
      tipe VARCHAR(50) NOT NULL,
      noKamar VARCHAR(20),
      lantai VARCHAR(20),
      jmlKamarTidur VARCHAR(20),
      kapasitas VARCHAR(20),
      harga DECIMAL(12,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'Tersedia',
      deskripsi TEXT,
      fasilitas TEXT,
      gambar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const queryTravel = `
    CREATE TABLE IF NOT EXISTS travel (
      id SERIAL PRIMARY KEY,
      rute VARCHAR(150) NOT NULL,
      unit VARCHAR(100),
      kursiTotal INT,
      kursiTersedia INT,
      harga DECIMAL(12,2) NOT NULL,
      gambar TEXT,
      seatMap TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const queryTestimoni = `
    CREATE TABLE IF NOT EXISTS testimoni (
      id SERIAL PRIMARY KEY,
      nama VARCHAR(100) NOT NULL,
      role VARCHAR(100),
      layanan VARCHAR(50),
      rating INT DEFAULT 5,
      comment TEXT,
      gambar TEXT,
      status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const queryWebConfig = `
    CREATE TABLE IF NOT EXISTS web_settings (
      id INT PRIMARY KEY DEFAULT 1,
      hero_badge VARCHAR(255),
      hero_heading1 VARCHAR(255),
      hero_heading2 VARCHAR(255),
      hero_subtext TEXT,
      hero_btnText VARCHAR(100),
      hero_gambar TEXT,
      company_heading1 VARCHAR(255),
      company_heading2 VARCHAR(255),
      company_subtext TEXT,
      company_stat1Value VARCHAR(50),
      company_stat1Label VARCHAR(50),
      company_stat2Value VARCHAR(50),
      company_stat2Label VARCHAR(50),
      company_gambar TEXT,
      footer_desc TEXT,
      footer_address TEXT,
      footer_phone VARCHAR(50),
      footer_email VARCHAR(100)
    );
  `;

  const queryInsertDefaultWeb = `
    INSERT INTO web_settings (
      id, hero_badge, hero_heading1, hero_heading2, hero_subtext, hero_btnText,
      company_heading1, company_heading2, company_subtext, company_stat1Value, company_stat1Label, company_stat2Value, company_stat2Label,
      footer_desc, footer_address, footer_phone, footer_email
    ) VALUES (
      1, 'Indonesia''s Finest', 'Redefine Your', 'Travel Experience.', 'Momen liburan itu mahal, jangan sampai dirusak itinerary yang berantakan. Biar kami yang atur, kamu tinggal nikmati perjalanannya.', 'Eksplor Sekarang',
      'Crafting Memories', 'Since 2015', 'Berawal dari hobi jalan-jalan, BarTrans Travel kini hadir sebagai travel partner terpercaya buat lo yang anti-ribet dan butuh pengalaman liburan premium.', '5K+', 'HAPPY TRAVELERS', '50+', 'DESTINATIONS',
      'Solusi terpadu untuk segala kebutuhan mobilitas, sewa kendaraan, penginapan, dan paket wisata terbaik di Indonesia.', 'Jl. Raya Perjalanan No. 45, Kota Semarang, Jawa Tengah', '+62 812-3456-7890', 'support@travelpro.id'
    ) ON CONFLICT (id) DO NOTHING;
  `;

  try {
    await db.query(queryMobil);
    await db.query(queryTruk);
    await db.query(queryPesanan);
    await db.query(queryAkun);
    await db.query(queryWisata);
    await db.query(queryPenginapan);
    await db.query(queryTravel);
    await db.query(queryTestimoni);
    
    await db.query(queryWebConfig);
    await db.query(queryInsertDefaultWeb);

    await db.query("ALTER TABLE pesanan ALTER COLUMN rute TYPE TEXT;").catch(()=>console.log("Kolom rute sudah berwujud TEXT."));

    console.log("✅ Database Siap: Semua tabel BarTrans terverifikasi di Supabase.");
  } catch (error) {
    console.error("❌ Gagal merakit tabel database:", error.message);
  }
};

module.exports = createTables;