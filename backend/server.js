const express = require('express');
const cors = require('cors');
require('dotenv').config();
const serverless = require('serverless-http');

const createTables = require('./database/migrate');
const pesananRoutes = require('./routes/pesananRoutes');
const mobilRoutes = require('./routes/mobilRoutes');
const authRoutes = require('./routes/authRoutes'); 
const trukRoutes = require('./routes/trukRoutes');
const wisataRoutes = require('./routes/wisataRoutes');
const penginapanRoutes = require('./routes/penginapanRoutes');
const travelRoutes = require('./routes/travelRoutes');
const testimoniRoutes = require('./routes/testimoniRoutes');
const webRoutes = require('./routes/webRoutes');
const statistikRoutes = require('./routes/statistikRoutes');

const app = express();

app.use(cors({
  origin: '*', // Mengizinkan akses dari semua URL frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Tambahkan ini juga tepat di bawahnya untuk mengatasi preflight Vercel
app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

createTables();

app.use('/api/pesanan', pesananRoutes);
app.use('/api/mobil', mobilRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/truk', trukRoutes);
app.use('/api/wisata', wisataRoutes);
app.use('/api/penginapan', penginapanRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/testimoni', testimoniRoutes);
app.use('/api/web-settings', webRoutes);
app.use('/api/statistik', statistikRoutes);

// Démarrage local conditionnel (désactivé sur Vercel en production)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server BarTrans meluncur di http://0.0.0.0:${PORT}`);
  });
}

// Exports requis pour Vercel Serverless
module.exports = app;
module.exports.handler = serverless(app);