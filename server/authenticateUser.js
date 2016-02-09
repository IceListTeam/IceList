
Accounts.validateNewUser(function (user) {  
  // Ensure user name is long enough
  console.log("made it to validate new user!");
  console.log(user);
  //var userEmail = user.email[0];
  //console.log(userEmail);
  console.log(user.profile.email);

  /*
  Email.send({
	from: "from@mailinator.com",
	to: user.profile.email,
	subject: "Subject",
	text: "Here is some text"
	});
*/

   var passwordTest = new RegExp("(?=.{6,}).*", "g");
  if (passwordTest.test(user.password) == false) {
	throw new Meteor.Error(403, 'Your password is too weak!');
  }

  return true;
});