// config/database.js

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance, connecting to MySQL database
const sequelize = new Sequelize('mydb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
