// src/components/UserInfo.js

import React from 'react';

function UserInfo({ user }) {
  return (
    <div>
      <img src={user.avatar_url} alt={`${user.login} avatar`} width="100" />
      <h2>{user.name} ({user.login})</h2>
      <p>{user.bio}</p>
      <p>Location: {user.location}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
    </div>
  );
}

export default UserInfo;
