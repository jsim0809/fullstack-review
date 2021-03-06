const express = require('express');
let app = express();
const bodyparser = require('body-parser');

const github = require('../helpers/github.js');
const database = require('../database');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());


app.post('/repos', function (req, res) {
  github.getReposByUsername(Object.keys(req.body)[0], (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      var toInsert = data.map((repo) => {
        console.log('========Hope', dbify(repo));
        return database.save(dbify(repo));
      });
      Promise.all(toInsert)
        .then(() => {
          console.log('====Saved to Mongo with no duplicates.===')
          res.sendStatus(201);
        });
    }
  });
});

app.get('/repos', function (req, res) {
  console.log('Received GET request.');
  database.grab()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


//////////
// Converts a github object to a database object for my DB.
//////////

var dbify = (githubObj) => {
  return {
    name: githubObj.name,
    owner_login: githubObj.owner.login,
    owner_avatar_url: githubObj.owner.avatar_url,
    owner_html_url: githubObj.owner.html_url,
    html_url: githubObj.html_url,
    forks_count: githubObj.forks_count,
    stargazers_count: githubObj.stargazers_count,
    watchers_count: githubObj.watchers_count,
    updated_at: githubObj.updated_at
  }
}