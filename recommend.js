// recommend.js
//
// Given a targ repo, recommend 5 repos
// (based on the most starred repos by contributors to the target repo)


require('dotenv').config();
var request = require('request');
var fs = require('fs');
var path = require('path');


function getRepoContributors(repoOwner, repoName) {
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
    console.log("Making GitHub API request.");
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
    return namesOfContributors;
  });
}


function getUsersStarredRepos(gitUserName) {
// Given a github username
// Make an API request
  const options = {
    url: `https://api.github.com/users/${gitUserName}/starred`,
    headers : {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
    }
  };
  request(options, function(err, res, body) {
    let namesOfStarredRepos = [];
    // Put the results in the container as a JSON object
    console.log("Making GitHub API request.");
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
    // Return all of the user's starred repos
    // as an array of repo names as strings.
    return namesOfStarredRepos;
  });
}

function addUpStarredRepos(arrayOfUserNames) {
// Sets up place to store the rankings
// Not sure what best form is yet.

  let repoLeaderBoard;

// Take in the array
// For each username in the array
  console.log("Starting to loop over array.");
  arrayOfUserNames.forEach(function(username) {
    let theUser = username;
    // getting hung up here because of asynchronous functions
    let usersRepoList = getUsersStarredRepos(theUser);
    set console.log(usersRepoList);

  });
  console.log("Finished looping over array.");
//
// Grab that username's starred repos
// Add thoes repos to the ranking

// Given a users starred repos
// Add those repos to a counter for the starting repo
// probably needs to be at larger scope
//
// Once you've added all the usersStarredRepos
//
//
// Return the fully loaded counter

}

addUpStarredRepos(["LaithAzer", "kvirani", "Sailias"]);

function getTopFiveStars(starredRepoCounter) {
// Given a counter that holds the names of repos
// and how many times each of those repos have been starred
//
// Review the counters and return the top five
//
//


}

// Print out some recommendations for repos to check out
//
//
// Look like this:
//
// [ 11 stars ] minimaxir / big-list-of-naughty-strings
// [  5 stars ] braidchat / braid
// [  3 stars ] husl-colors / husl
// [  2 stars ] matiassingers / awesome-readme
// [  1 stars ] ajacksified / song-of-github
//
//






























// function recommendRepos(repoOwner, repoName, cb) {
//   const options = {
//     url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
//     headers : {
//       'User-Agent': 'request',
//       'Authorization': 'token ' + process.env.GITHUB_API_TOKEN
//     }
//   };


//   // Request information from a given repo and return JSON object of contributors

//   request(options, function(err, res, body) {

//     let allStarredRepos = {};

//     let contributors = JSON.parse(body);

//     if (contributors.message) {
//       throw new Error(contributors.message);
//     }

//     // Counter to make sure we're at the end of our iterations.

//     let iterationCounter = 0;

//     let contributorsNumber = contributors.length;

//     for (let i = 0; i <= contributors.length; i++) {

//         // Loop over the contributors to the repo and access their starred repos
//         for (let contributor in contributors) {

//           let user = contributors[contributor];
//           let login = user.login;
//           let starredURL = user.starred_url;
//           options.url = `https://api.github.com/users/${login}/starred`;

//           request(options, function(err, res, body) {
//             console.log("In the request");
//             let starredRepos = JSON.parse(body);

//             // Loop over each contributors starred repos and add the repos to an object with
//             // each key being the repo full name and the value being number of appearances.
//             //
//             //
//             // This part is NOT working correctly. We're looping too many times

//             for (let entry in starredRepos) {
//               let repoName = starredRepos[entry].full_name;


//               if (allStarredRepos[repoName] === undefined) {
//                 allStarredRepos[repoName] = 1;
//               } else {
//                 allStarredRepos[repoName] += 1;
//               }
//             }

//             if (i === contributors.length) {
//               console.log("We're calling the callback.");
//               cb(allStarredRepos);

//             }

//           });
//         }

//     }



//   });

//   // Take the fully filled allStarredRepos object and iterate over it to pull top 5
// }

// // fucntion dumbTest()

// recommendRepos("lighthouse-labs", "jungle-rails", function(result) {
//   // console.log("Test");
//   console.log(result);
//   for (let repo in result) {
//     console.log(repo);
//   }
// });




