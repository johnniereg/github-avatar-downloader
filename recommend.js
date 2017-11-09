// recommend.js
//
// Given a targ repo, recommend 5 repos
// (based on the most starred repos by contributors to the target repo)


require('dotenv').config();
var request = require('request');
var fs = require('fs');
var path = require('path');


function recommendRepos(repoOwner, repoName) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
    }
  };

  const allStarredRepos = {};

  // Request information from a given repo and return JSON object of contributors

  request(options, function(err, res, body) {
    let contributors = JSON.parse(body);
    if (contributors.message) {
      throw new Error(contributors.message);
    }

    // Loop over the contributors to the repo and access their starred repos
    for (let contributor in contributors) {

      let user = contributors[contributor];
      let login = user.login;
      let starredURL = user.starred_url;
      options.url = `https://api.github.com/users/${login}/starred`;

      request(options, function(err, res, body) {
        let starredRepos = JSON.parse(body);

        // Loop over each contributors starred repos and add the repos to an object with
        // each key being the repo full name and the value being number of appearances.

        for (let entry in starredRepos) {
          let repoName = starredRepos[entry].full_name;

          if (allStarredRepos[repoName] === undefined) {
            allStarredRepos[repoName] = 1;
          } else {
            allStarredRepos[repoName] += 1;
          }
        }
      });
    }
  });






}

recommendRepos("asdfjdsaklfda", "asfdjsafds");


// let contributors = getRepoContributors("lighthouse-labs", "laser_shark");

// function getStarredRepos(contributors) {

//   for (let contributor in contributors) {

//     let username = contributors[contributor].login;
//     console.log(username);

//     const options = {
//       url: `https://api.github.com/users/${username}/starred`,
//       headers : {
//         'User-Agent': 'request',
//         'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
//       }
//     };

//   }

// }


