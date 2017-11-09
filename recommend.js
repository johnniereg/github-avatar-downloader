// recommend.js
//
// Given a targ repo, recommend 5 repos
// (based on the most starred repos by contributors to the target repo)


require('dotenv').config();
var request = require('request');
var fs = require('fs');
var path = require('path');


function recommendSomeRepos(repoOwner, repoName) {



  function getRepoContributors(repoOwner, repoName) {
  // Given a repo name and repo owner,
  // Make an API request
  // Grab the github username(s) of contributors to given rep

  // Return results as an array

  }

  function getUsersStarredRepos(gitUserName) {
  // Given a github username
  // Make an API request
  // Grab the full names of repos they user has starred
  //
  // Return results as an array

  }

  function addUpStarredRepos(usersStarredRepos) {
  // Given a users starred repos
  // Add those repos to a counter for the starting repo
  // probably needs to be at larger scope
  //
  // Once you've added all the usersStarredRepos
  // Return the fully loaded counter


  }

  function getTopFiveStars(starredRepoCounter) {
  // Given a counter that holds the names of repos
  // and how many times each of those repos have been starred
  //
  // Review the counters and return the top five
  //
  //


  }



}


// Add full names of repos to something
// Use it to track number of stars each repo has
























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




