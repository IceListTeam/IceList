// authenticateUser.js
// Handles user account authentication.


// User validation function. Returns true if user account is correct,
// else throws an error describing the problem.
Accounts.validateNewUser(function (user) {  
  // Test for pitt.edu domain
  if( !(/@pitt\.edu$/.test(user.profile.email.toLowerCase())) ) {
    throw new Meteor.Error(403, "Email domain not allowed.");
  }
  
  return true;
});
