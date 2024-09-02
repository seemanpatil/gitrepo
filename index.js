// index.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

// Sync the database and create tables
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { username, email, location, bio } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = await User.create({ username, email, location, bio });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get users based on query parameters
app.get('/users', async (req, res) => {
    try {
        const { username, location } = req.query;

        const whereClause = {};
        if (username) whereClause.username = username;
        if (location) whereClause.location = location;

        const users = await User.findAll({ where: whereClause });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Soft delete a user by username
app.delete('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy(); // Soft delete the user
        res.status(200).json({ message: `User ${username} deleted successfully!` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Update user details
app.put('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const { location, blog, bio } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.location = location || user.location;
        user.blog = blog || user.blog;
        user.bio = bio || user.bio;

        await user.save();
        res.status(200).json({ message: `User ${username} updated successfully!`, user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
