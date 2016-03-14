
Accounts.validateNewUser(function (user) {  
  // Ensure user name is long enough
  console.log("made it to validate new user!");
  console.log(user);
  console.log(user.password);
  //var userEmail = user.email[0];
  //console.log(userEmail);
  console.log(user.profile.email);
  return true;
});

  Accounts.validateNewUser(function(user) {
  if (/@pitt\.edu$/.test(user.profile.email.toLowerCase())) {
    return true;
  } else {
    throw new Meteor.Error(403, "Email domain not allowed.");
  }
});


  Accounts.validateNewUser(function (user) {
  if (user.profile.firstname.length >= 3)
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});
