var request = require('request');
var githubToken = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

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

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(user) {
    var avatarURL = user.avatar_url;
    var username = user.login;
    var filepath = `./avatars/${username}.jpg`;
    downloadImageByURL(avatarURL, filepath);
  });
});

