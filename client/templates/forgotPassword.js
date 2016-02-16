var ERRORS_KEY = 'forgotPasswordErrors';

Template.forgotPassword.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});


Template.forgotPassword.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});


Template.forgotPassword.events({
'submit': function(event, template) {
	
	event.preventDefault();
    var email = template.$('[name=email]').val();
	
	
       if (/@pitt\.edu$/.test(email.toLowerCase())) 
	  {
		//return true;
		domainTest = true;
	  } 
	  else 
	  {
		 alert("Email domain not supported, must be a pitt.edu domain");
       // throw new Meteor.Error(403, "Email domain not allowed.");
	    
      }

    


	  
    var errors = {};
	
	if (! email) {
      errors.email = 'Email is required';
    }
	
	
	var options = {};
	options.email = email;

	//send an email to the user
	Accounts.forgotPassword(options, function(error){  
	  if (error) { 
		console.log(error);
	  }else{
		alert('Check your mailbox!');
	  } 
	});

	if (Accounts._resetPasswordToken) {
       Session.set('resetPassword', Accounts._resetPasswordToken);
    }
	


  }
});