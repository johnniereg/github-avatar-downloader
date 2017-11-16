// recommend.js
//
// Given a targ repo, recommend 5 repos
// (based on the most starred repos by contributors to the target repo)


require('dotenv').config();
var request = require('request');
var fs = require('fs');
var path = require('path');

// Given an array containing repo names, add up how many times each appears
// and then print out the five repos with the most appearances (or stars).
function printTopFive(starredrepos) {
  // Where we will store the repos to be sorted.
  let collectedRepos = {};
  // Loop over inputted repos, create an object where keys are repo names
  // and values are the number of times the repo has been starred.
  starredrepos.forEach(function(repo) {
    if (collectedRepos[repo] === undefined) {
      collectedRepos[repo] = 1;
    } else {
      collectedRepos[repo] += 1;
    }
  });
  // Convert our object into an array where each entry is another array
  // containing a repo name and their number of stars.
  let collectedReposArr = Object.keys(collectedRepos).map(function(key) {
    return [key, collectedRepos[key]];
  });

  // Sort the array by number of stars to bring the highest ranked
  // repos to the front of the array.
  collectedReposArr.sort(function(a, b) {
    return b[1] - a[1]
  });

  // Loop over the sorted array and print off the top five.
  for (let i = 0; i < 5; i++) {
    let stars = collectedReposArr[i][1];
    console.log(`[${stars} stars] ${collectedReposArr[i][0]}`);
  }
}

// Given an array of github usernames, collect the names
// of all repos that those users have starred and pass them
// to the printTopFive function.
function getStarredRepos(users) {

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
        printTopFive(namesOfStarredRepos);
      }
    });
  });
}

// Takes in a repo owner and repo name. Finds the usernames of
// all the contributors and passes those names as an array to
// the getStarredRepos function.
function recommendRepos(repoOwner, repoName) {
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
    getStarredRepos(namesOfContributors);
  });
}

let repoOwner = process.argv[2];
let repoName = process.argv[3];


recommendRepos(repoOwner, repoName);




