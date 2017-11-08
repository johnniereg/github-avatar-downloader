// recommend.js
//
// Given a targ repo, recommend 5 repos
// (based on the most starred repos by contributors to the target repo)


require('dotenv').config();
var request = require('request');
var fs = require('fs');
var path = require('path');


// Given a repo owner and repo name, return an object where each item is an ob.
function getRepoContributors(repoOwner, repoName) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
    }
  };

  request(options, function(err, res, body) {
    let contributors = JSON.parse(body);
    if (contributors.message) {
      throw (contributors.message);
    }
    // for (let contributor in contributors) {
    //   let user = contributors[contributor];
    //   console.log(user.starred_url);
    // }
    return contributors;
  });
}

function getStarredRepos(contributors) {


}


getRepoContributors("lighthouse-labs", "laser_shark");

