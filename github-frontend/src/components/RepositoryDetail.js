// src/components/RepositoryDetail.js
import React from 'react';

const RepositoryDetail = ({ repo, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back to Repositories</button>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
      <p>Updated at: {new Date(repo.updated_at).toLocaleDateString()}</p>
    </div>
  );
};

export default RepositoryDetail;
