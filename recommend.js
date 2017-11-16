// recommend.js
//
// Given a targ repo, recommend 5 repos
// (based on the most starred repos by contributors to the target repo)


require('dotenv').config();
var request = require('request');
var fs = require('fs');
var path = require('path');


function getRepoContributors(repoOwner, repoName, callback) {
  // Given a repo name and repo owner.
  // Set repo name and owner into the options for an API request
  // for info on on the given repo's contributors
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
    }
  };
  request(options, function(err, res, body) {
    let namesOfContributors = [];
    // Put the results in the container as a JSON object
    //
    // Create object that holds info on all the repos contributors,
    // each item is another object holding info about the contributor.
    let repoContribInfo = JSON.parse(body);
    // Iterate over each item in the object
    for (let contribEntry in repoContribInfo) {
      let theEntry = repoContribInfo[contribEntry];
      // Put the login into the array of contributor names.
      namesOfContributors.push(theEntry.login);
    }
    // Return results as an array of logins as strings.
    callback(namesOfContributors);
  });
}




function getStarredRepos(users, callback) {

  let loopEndPoint = users.length;
  let loopCounter = 0;
  let namesOfStarredRepos = [];

// Given an array of github user names
  users.forEach(function(user) {
    // Make an API request
    const options = {
      url: `https://api.github.com/users/${user}/starred`,
      headers : {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
      }
    };
    request(options, function(err, res, body) {
      // Put the results in the container as a JSON object
      // Create object that holds info on all the repos contributors,
      // each item is another object holding info about the contributor.
      let repoListing = JSON.parse(body);
      // console.log(repoListing);
      // Iterate over each item in the object
      for (let starredRepo in repoListing) {
        let theEntry = repoListing[starredRepo];
        // Put the repo names into the array of all starred repos.
        namesOfStarredRepos.push(theEntry.full_name);
      }
      loopCounter += 1;

      // Return all of the user's starred repos
      // as an array of repo names as strings.

      if (loopCounter >= loopEndPoint) {
        makeLeaderBoard(namesOfStarredRepos);
      }
    });
  });
}

getRepoContributors("lighthouse-labs", "laser_shark", getStarredRepos);



function makeLeaderBoard(starredrepos) {

  let collectedRepos = {};
  starredrepos.forEach(function(repo) {
    if (collectedRepos[repo] === undefined) {
      collectedRepos[repo] = 1;
    } else {
      collectedRepos[repo] += 1;
    }
  });

  let collectedReposArr = Object.keys(collectedRepos).map(function(key) {
    return [key, collectedRepos[key]];
  });

  collectedReposArr.sort(function(a, b) {
    return b[1] - a[1]
  });

  for (let i = 0; i < 5; i++) {
    let stars = collectedReposArr[i][1];
    console.log(`[${stars} stars] ${collectedReposArr[i][0]}`);
  }

}






