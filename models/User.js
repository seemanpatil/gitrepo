// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    location: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: true,
    paranoid: true // Enables soft deletes by adding a deletedAt column
});

module.exports = User;
