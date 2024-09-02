// src/components/RepositoryList.js

import React from 'react';

function RepositoryList({ repositories }) {
  return (
    <div>
      <h3>Repositories</h3>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <h4>{repo.name}</h4>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoryList;
