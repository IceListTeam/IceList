var ERRORS_KEY = 'resetErrors';

Template.resetpassword.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.resetpassword.events({
  'submit': function(event, template) {
    event.preventDefault();
    var passToken = template.$('[name=token]').val();
    var inPass = template.$('[name=newPassword]').val();
    var confPass = template.$('[name=verPassword]').val();

    var errors = {};

    if (! inPass) {
      errors.password = 'Password required';
    }

    if (confPass !== inPass) {
      errors.confirm = 'Please confirm your password';
    }

    
    if( confPass.length < 8 )
    {
       errors.password_len = 'Password must be at least 8 characters long.';

    }

    //test password complexity (this ensures new users passwords contain an uppercase, lowercase, and number)
    var hasUpperCase = /[A-Z]/.test(confPass);
    var hasLowerCase = /[a-z]/.test(confPass);
    var hasNumbers = /\d/.test(confPass);
    if(hasUpperCase + hasLowerCase + hasNumbers < 3)
      errors.password_strength = 'Password must contain at least 8 characters, contain a number, uppercase letter, and lowercase letter';


    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    
    Accounts.resetPassword( passToken , inPass , function(error) {
      // Callback from resetPassword
      if (error) {
        console.log("having");
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      
      
    });
    console.log("a go at it");
    Router.go("/thankyou/reset-password/");
  }
});