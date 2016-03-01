var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.onRendered(function() {
	this.$('.datetimepicker').datetimepicker();
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  yearHelper: function() {
		yearList = [];
		for( i = 2016 ; i >= 1990 ; i-- )
		{
			yearList.push(i);
		}
		return yearList;
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var firstName = template.$('[name=FirstName]').val();
    var lastName = template.$('[name=LastName]').val();
    var birthday = template.$('[name=Birthday]').val();
    var major = template.$('[name=Major]').val();
    var gradDate = template.$('[name=GradDate]').val();
    var phone = template.$('[name=Phone]').val();
    var inPass = template.$('[name=password]').val();
    var confPass = template.$('[name=confirm]').val();

    var errors = {};
    var user;

    if (! email) {
      errors.email = 'Email required';
    }

    if (! inPass) {
      errors.password = 'Password required';
    }

    if (confPass !== inPass) {
      errors.confirm = 'Please confirm your password';
    }

    
    if( confPass.length < 8 )
    {
       errors.confirm = 'Password must be at least 8 characters long.';

    }

   //test password complexity (this ensures new users passwords contain an uppercase, lowercase, and number)
   var hasUpperCase = /[A-Z]/.test(confPass);
   console.log(hasUpperCase);
   var hasLowerCase = /[a-z]/.test(confPass);
   console.log(hasLowerCase);
   var hasNumbers = /\d/.test(confPass);
   console.log(hasNumbers);
   if(hasUpperCase + hasLowerCase + hasNumbers < 3)
      errors.confirm = 'Password must contain at least 8 characters, contain a number, uppercase letter, and lowercase letter';


    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    user = {
      firstname: firstName,
      lastname: lastName,
      birthday: birthday,
      major: major,
      gradDate: gradDate,
      phone: phone,
      email:email
    }


    Accounts.createUser({ name: firstName + lastName , password: inPass , email: email, profile: user}, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('home');
    });
  }
});
