Template.forgotPassword.events({
'submit .btn-primary': function(event, template) {
	console.log('hey in forgotPassword client');

	event.preventDefault();
    var email = template.$('[name=email]').val();

    console.log(email);

	//Accounts.forgotPassword

	//call method on server called Accounts.sendResetPasswordEmail(userId, [email])


  }
});