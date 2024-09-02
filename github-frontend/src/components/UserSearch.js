// src/UserSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import RepositoryList from './RepositoryList';
import FollowerList from './FollowerList';

function UserSearch() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [view, setView] = useState('repositories'); // 'repositories' or 'followers'

  const fetchUser = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/users/${username}`);
      setUser(response.data);
      fetchRepositories(response.data.username);
      fetchFollowers(response.data.username);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchRepositories = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${username}/repositories`);
      setRepositories(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const fetchFollowers = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${username}/followers`);
      setFollowers(response.data);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchUser}>Search</button>

      {user && (
        <div>
          <h2>{user.username}</h2>
          {view === 'repositories' ? (
            <RepositoryList
              repositories={repositories}
              onRepositoryClick={(repo) => console.log(repo)} // Handle repository click
            />
          ) : (
            <FollowerList
              followers={followers}
              onFollowerClick={(follower) => console.log(follower)} // Handle follower click
            />
          )}
          <button onClick={() => setView(view === 'repositories' ? 'followers' : 'repositories')}>
            {view === 'repositories' ? 'View Followers' : 'View Repositories'}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;