
require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/authroutes');
const documentRoutes = require('./routes/documentroutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/documents', documentRoutes);


db.sync().then(() => {
  console.log('Database synced successfully');
});

