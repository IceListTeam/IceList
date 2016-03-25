
Meteor.startup(function() {
  // Create new function to check for a verified email
  var loginAttemptVerifier = function(parameters) {
    if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
    
      // return true if verified email, false otherwise.
      var found = _.find(
        parameters.user.emails, 
        function(thisEmail) { return thisEmail.verified }
      );

      if (!found) {
        throw new Meteor.Error("verifyerror", 'mustverify');
        return false;
      }
      return found && parameters.allowed;
      
    } else {
      console.log("user has no registered emails.");
      return false;
    }
  }
  // Pass it to the Accounts login verifier to add to list of checking functions.
  Accounts.validateLoginAttempt(loginAttemptVerifier);
});
