var request = require('request');
var githubToken = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      'User-Agent': 'request',
      'Authorization': githubToken.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var toObject = JSON.parse(body);
    console.log(toObject);
    cb(err, toObject);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(item) {
    console.log("Result:", item.avatar_url);
  });
});