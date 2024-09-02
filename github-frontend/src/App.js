import React, { useState } from 'react';
import axios from 'axios';
import UserInfo from './components/UserInfo';
import RepositoryList from './components/RepositoryList';
import FollowerList from './components/FollowerList';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [view, setView] = useState('repositories'); // 'repositories' or 'followers'

  const fetchGitHubData = async () => {
    try {
      // Fetch user data
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userResponse.data);

      // Fetch repositories
      const reposResponse = await axios.get(userResponse.data.repos_url);
      setRepositories(reposResponse.data);

      // Fetch followers
      const followersResponse = await axios.get(userResponse.data.followers_url);
      setFollowers(followersResponse.data);

      setView('repositories'); // Default view
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserData(null);
      setRepositories([]);
      setFollowers([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={fetchGitHubData}>Search</button>
      </header>

      {userData && (
        <div>
          <UserInfo user={userData} />
          <div>
            <button onClick={() => setView('repositories')}>Repositories</button>
            <button onClick={() => setView('followers')}>Followers</button>
          </div>
          {view === 'repositories' ? (
            <RepositoryList repositories={repositories} />
          ) : (
            <FollowerList followers={followers} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
