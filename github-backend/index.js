// index.js
const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync(); // Sync all models
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
