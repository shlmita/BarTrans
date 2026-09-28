const express = require('express');
const cors = require('cors');
require('dotenv').config();

const createTables = require('./database/migrate');
const pesananRoutes = require('./routes/pesananRoutes');
const mobilRoutes = require('./routes/mobilRoutes');

const app = express();

app.use(cors());
app.use(express.json());

createTables();

// Mounting Routes
app.use('/api/pesanan', pesananRoutes);
app.use('/api/mobil', mobilRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server BarTrans meluncur di port ${PORT}`);
});