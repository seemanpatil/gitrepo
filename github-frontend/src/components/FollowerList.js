// src/components/FollowerList.js

import React from 'react';

function FollowerList({ followers }) {
  return (
    <div>
      <h3>Followers</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <img src={follower.avatar_url} alt={`${follower.login} avatar`} width="50" />
            <p>{follower.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowerList;
