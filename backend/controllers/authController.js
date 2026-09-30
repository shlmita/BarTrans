const db = require('../config/db');

// 1. REGISTER
exports.register = async (req, res) => {
  const { nama, whatsapp, email, nik, password } = req.body;
  try {
    const { rows: existing } = await db.query('SELECT * FROM akun WHERE email = $1', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Email sudah terdaftar!' });
    }

    await db.query(
      'INSERT INTO akun (nama, whatsapp, email, nik, password, role, status) VALUES ($1, $2, $3, $4, $5, \'User\', \'Aktif\')',
      [nama, whatsapp, email, nik || null, password]
    );

    res.json({ status: 'success', message: 'Pendaftaran berhasil!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. LOGIN (Proteksi Role Akses)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows: users } = await db.query('SELECT * FROM akun WHERE email = $1 AND password = $2', [email, password]);
    
    if (users.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Email atau password salah!' });
    }

    const user = users[0];

    if (user.status === 'Banned') {
      return res.status(403).json({ status: 'error', message: 'Akun Anda telah diblokir!' });
    }

    res.json({
      status: 'success',
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        whatsapp: user.whatsapp,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 3. GET ALL AKUN (Tampilan Manajemen Akun Admin)
exports.getAllAkun = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, nama, whatsapp, email, role, status FROM akun ORDER BY id DESC');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 4. UPDATE STATUS / BLOKIR AKUN
exports.toggleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query('UPDATE akun SET status = $1 WHERE id = $2', [status, id]);
    res.json({ status: 'success', message: 'Status akun berhasil diperbarui!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5. UPDATE PROFIL
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { whatsapp, password } = req.body;

  try {
    if (password && password.trim() !== '') {
      await db.query(
        'UPDATE akun SET whatsapp = $1, password = $2 WHERE id = $3',
        [whatsapp, password, id]
      );
    } else {
      await db.query(
        'UPDATE akun SET whatsapp = $1 WHERE id = $2',
        [whatsapp, id]
      );
    }

    res.json({ status: 'success', message: 'Profil berhasil diperbarui!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};