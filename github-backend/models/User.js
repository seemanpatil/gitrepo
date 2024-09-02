// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  blog: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  public_repos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  public_gists: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  followers: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  following: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;
