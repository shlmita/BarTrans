const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ambil Data Setting Web
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM web_settings WHERE id = 1');
    res.json({ status: 'success', data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Gagal mengambil data web' });
  }
});

// Update Data Setting Web
router.put('/', async (req, res) => {
  try {
    const {
      hero_badge, hero_heading1, hero_heading2, hero_subtext, hero_btnText, hero_gambar,
      company_heading1, company_heading2, company_subtext, company_stat1Value, company_stat1Label, company_stat2Value, company_stat2Label, company_gambar,
      footer_desc, footer_address, footer_phone, footer_email
    } = req.body;

    const query = `
      UPDATE web_settings SET 
        hero_badge=$1, hero_heading1=$2, hero_heading2=$3, hero_subtext=$4, hero_btnText=$5, hero_gambar=$6,
        company_heading1=$7, company_heading2=$8, company_subtext=$9, company_stat1Value=$10, company_stat1Label=$11, company_stat2Value=$12, company_stat2Label=$13, company_gambar=$14,
        footer_desc=$15, footer_address=$16, footer_phone=$17, footer_email=$18
      WHERE id = 1
    `;

    const values = [
      hero_badge, hero_heading1, hero_heading2, hero_subtext, hero_btnText, hero_gambar,
      company_heading1, company_heading2, company_subtext, company_stat1Value, company_stat1Label, company_stat2Value, company_stat2Label, company_gambar,
      footer_desc, footer_address, footer_phone, footer_email
    ];

    await db.query(query, values);
    res.json({ status: 'success', message: 'Data website berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Gagal menyimpan data web' });
  }
});

module.exports = router;