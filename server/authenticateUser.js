
Accounts.validateNewUser(function (user) {  
  // Ensure user name is long enough
  console.log("made it to validate new user!");
  console.log(user);
  console.log(user.password);
  //var userEmail = user.email[0];
  //console.log(userEmail);
  console.log(user.profile.email);

/*
  Accounts.validateNewUser(function(user) {
  if (/@pitt\.edu$/.test(user.profile.email.toLowerCase())) {
  	console.log("looks good!");
    return true;
  } else {
    throw new Meteor.Error(403, "Email domain not allowed.");
  }
});
*/

  Accounts.validateNewUser(function (user) {
<<<<<<< HEAD
  if (user.profile.firstname.length >= 3)
=======
  if (user.username && user.username.length >= 3)
>>>>>>> parent of 162510e... added verify email function
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});

  Accounts.validateNewUser(function (user) {
    var passwordTest = new RegExp("(?=.{6,}).*", "g");
  if (passwordTest.test(user.password) == false) 
  {
     throw new Meteor.Error(403, 'Your password is too weak!');
  }
   return true;
});
  
  /*
  Email.send({
	from: "from@mailinator.com",
	to: user.profile.email,
	subject: "Subject",
	text: "Here is some text"
	});
*/

   
});