const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connection established.');
});

let repoSchema = new mongoose.Schema({
  name: String,
  owner_login: String,
  owner_avatar_url: String,
  owner_html_url: String,
  html_url: String,
  forks_count: Number,
  stargazers_count: Number,
  watchers_count: Number,
  updated_at: String
});


let Repo = mongoose.model('Repo', repoSchema);

let save = githubData => {
  return new Promise((resolve, reject) => {
    var newEntry = new Repo(githubData);
    newEntry.save((err) => {
      if (err) {
        if (err.code === 11000) {
          resolve();
        } else {
          reject(err);
        }
      } else {
        resolve();
      }
    });
  });
};

let grab = () => {
  return new Promise((resolve, reject) => {
    Repo.find({}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.save = save;
module.exports.grab = grab;