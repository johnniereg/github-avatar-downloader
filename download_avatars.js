var request = require('request');
var githubToken = require('./secrets.js');
var fs = require('fs');
var path = require('path');

// Use to check for folder and make it if necessary.
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent': 'request',
      'Authorization': githubToken.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    let toObject = JSON.parse(body);
    cb(err, toObject);
  });
}

// Given URL and filepath, download files.
function downloadImageByURL(url, filePath) {
  ensureDirectoryExistence(filePath);
  request.get(url)
         .pipe(fs.createWriteStream(filePath));

}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(user) {
    var avatarURL = user.avatar_url;
    var username = user.login;
    var filepath = `./avatars/${username}.jpg`;
    downloadImageByURL(avatarURL, filepath);
  });
});

