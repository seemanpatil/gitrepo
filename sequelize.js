const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // Change to your database dialect if necessary
});

module.exports = sequelize;
