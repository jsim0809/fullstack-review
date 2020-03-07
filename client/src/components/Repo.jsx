import React from 'react';

const Repo = ({ repo }) => (
  <tr>
    <td><a href={repo.html_url}>{repo.name}</a></td>
    <td>{repo.owner_login}</td>
    <td>Forks: {repo.forks_count}</td>
    <td>Starred by: {repo.stargazers_count}</td>
    <td>Watched by: {repo.watchers_count}</td>
    <td>Last updated:{repo.updated_at}</td>
  </tr>
);

export default Repo;