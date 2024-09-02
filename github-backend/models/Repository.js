// models/Repository.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

const Repository = sequelize.define('Repository', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

User.hasMany(Repository);
Repository.belongsTo(User);

module.exports = Repository;
