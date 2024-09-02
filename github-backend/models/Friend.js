// models/Friend.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

const Friend = sequelize.define('Friend', {
  userAId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  userBId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Friend;
