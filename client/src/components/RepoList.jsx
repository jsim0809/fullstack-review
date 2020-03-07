import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => {
  var sortedAndTruncatedRepos = repos.sort((a, b) => a.updated_at < b.updated_at ? 1 : -1).slice(0, 25);
  return (
    <div>
      <h4> Most recently updated repos </h4>
      <table>
        {sortedAndTruncatedRepos.map((repo) => (
          <Repo repo={repo} />
        ))}
      </table>
      Watching {repos.length} repos.
  </div>
  );
};

export default RepoList;