var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});



Template.join.onRendered(function() {
  $('.input-symbol').validate({
    rules: {
      password: {
        minlength: 6
      }
    },
    messages: {
      password: {
        minlength: "your password must be 6"
      }
    }
  });
});
/*
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
  'submit form': function(event, template) {
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


   // Accounts.config({ restrictCreationByEmailDomain: 'pitt.edu' });

    Accounts.createUser({ name: firstName + lastName , password: inPass , email: email, profile: user}, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('home');
    });

  }
});
