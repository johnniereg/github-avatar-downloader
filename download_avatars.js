require('dotenv').config();
var request = require('request');
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

// Given a repo owner and repo name, return a JSON object.
function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
    }
  };

  request(options, function(err, res, body) {
    let toObject = JSON.parse(body);
    if (toObject.message) {
      throw (toObject.message);
    }
    console.log(toObject);
    cb(err, toObject);
  });
}

// Given an Image URL and filepath, download file to specified path.
function downloadImageByURL(url, filePath) {
  ensureDirectoryExistence(filePath);
  request.get(url)
         .on('error', function(err) {
            throw err;
         })
         .pipe(fs.createWriteStream(filePath))
         .on('finish', function(data){
            console.log("Image downloading.");
         });
}

// Take commandline arguments for owner and repo
var userInput = process.argv;
var owner = process.argv[2];
var repo = process.argv[3];

if (userInput.length !== 4) {
  throw error ("Incorrect number of arguments given. Example: node download_avatars.js <owner> <repo>");
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors(owner, repo, function(err, result) {
  result.forEach(function(user) {
    var avatarURL = user.avatar_url;
    var username = user.login;
    var filepath = `./avatars/${username}.jpg`;
    downloadImageByURL(avatarURL, filepath);
  });
});
