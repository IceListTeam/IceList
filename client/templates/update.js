var ERRORS_KEY = 'updateErrors';


Template.update.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.update.onRendered(function() {
	this.$('.datetimepicker').datetimepicker();
});

Template.update.helpers({
  userHelp: function(varn) {
	return Meteor.user().profile[varn];
  },
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.update.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var firstName = template.$('[name=FirstName]').val();
    var lastName = template.$('[name=LastName]').val();
    var birthday = template.$('[name=Birthday]').val();
    var major = template.$('[name=Major]').val();
    var gradDate = template.$('[name=GradDate]').val();
    var phone = template.$('[name=Phone]').val();
    var oldPass = template.$('[name=password]').val();
    var newPass = template.$('[name=confirm]').val();

    var errors = {};
    var user;



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

    if (oldPass !== "" && newPass !== "")
    {
      Accounts.changePassword(oldPass, newPass); 
    }

	  Meteor.users.update( { _id: Meteor.user()._id }, { $set: { "profile.firstname": firstName, "profile.lastname": lastName, "profile.name": firstName + lastName, "profile.birthday": birthday, "profile.major": major, "profile.gradDate": gradDate, "profile.phone": phone, "profile.email": email }});
      Router.go('home');
	}
});