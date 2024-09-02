// routes/users.js
const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const Repository = require('../models/Repository');
const Friend = require('../models/Friend');
const router = express.Router();

// Fetch and save user data
router.post('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    let user = await User.findOne({ where: { username } });
    if (!user) {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      user = await User.create({
        username: response.data.login,
        name: response.data.name,
        location: response.data.location,
        blog: response.data.blog,
        bio: response.data.bio,
        public_repos: response.data.public_repos,
        public_gists: response.data.public_gists,
        followers: response.data.followers,
        following: response.data.following,
        created_at: response.data.created_at,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find mutual followers and save as friends
router.get('/users/:username/friends', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
    const followers = followersResponse.data.map(f => f.login);

    const friends = await Promise.all(
      followers.map(async (follower) => {
        const response = await axios.get(`https://api.github.com/users/${follower}/following`);
        const following = response.data.map(u => u.login);

        if (following.includes(username)) {
          return Friend.create({ userAId: user.id, userBId: (await User.findOne({ where: { username: follower } })).id });
        }
      })
    );

    res.status(200).json(friends.filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search users
router.get('/users', async (req, res) => {
  const { username, location } = req.query;
  try {
    const users = await User.findAll({
      where: {
        ...(username && { username: { [Op.like]: `%${username}%` } }),
        ...(location && { location: { [Op.like]: `%${location}%` } }),
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Soft delete user
router.delete('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.update({ deletedAt: new Date() });
    res.status(200).json({ message: 'User soft deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/users/:username', async (req, res) => {
  const { username } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update(updates);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sorted users
router.get('/users/sorted', async (req, res) => {
  const { sortBy = 'created_at' } = req.query;
  try {
    const users = await User.findAll({
      order: [[sortBy, 'DESC']],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
