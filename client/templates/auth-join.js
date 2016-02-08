var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});


/*
Template.join.onRendered(function() {
  $('.input-symbol').validate({


    rules: {
      email: {
        required:true,
      
      },
      password: {
        required: true,
   
      }
    },
    messages: {
      email: {
        required: "Please enter your email address."
       
      },
      password: {
        required: "Please enter your password"
      }
    }
  });
});
*/

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
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
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();

    var errors = {};
    var user;

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    user = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      birthday: birthday,
      major: major,
      gradDate: gradDate,
      phone: phone,
      password: password

    }

   //get error here in console "accounts.validateNewUser is not a fcn"
    Accounts.validateNewUser(function (user) {  
  // Ensure user name is long enough
  console.log("made it to validate new user!");
  if (user.password.length() < 5) {
    throw new Meteor.Error(403, 'Your username needs at least 5 characters');
  }

   var passwordTest = new RegExp("(?=.{6,}).*", "g");
  if (passwordTest.test(user.password) == false) {
    throw new Meteor.Error(403, 'Your password is too weak!');
  }

  return true;
});


    Accounts.createUser(user, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('home');
    });
  }
});
