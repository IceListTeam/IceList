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
        email:true
      },
      password: {
        required: true,
        minlength: 8
      }
    },
    messages: {
      email: {
        required: "Please enter your email address."
        email: "Please enter a valid email address."
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

    Accounts.createUser({
      email: email,
      firstname: firstName,
      lastname: lastName,
      birthday: birthday,
      major: major,
      gradDate: gradDate,
      phone: phone,
      password: password
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('home');
    });
  }
});
