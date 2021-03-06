// auth-join.js
//  Account Creation page

var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  
  dayHelper: function() {
    dayList = [];
    for( i = 1 ; i <31 ; i++ )
    {
      dayList.push(i);
    }
    return dayList;
  },
  
  monthHelper: function() {
    monthList = [{no: 1 , name: "January"} , {no: 2 , name: "February"} , {no: 3 , name: "March"} , {no: 4 , name: "April"} , {no: 5 , name: "May"} , {no: 6 , name: "June"} , {no: 7 , name: "July"} , {no: 8 , name: "August"} , {no: 9 , name: "September"} , {no: 10 , name: "October"} , {no: 11 , name: "November"} , {no: 12 , name: "December"}];
	return monthList;
  },
  
  yearHelper: function(maxdate) {
    yearList = [];
    for( i = maxdate ; i >= 1990 ; i-- )
    {
      yearList.push(i);
    }
    return yearList;
  },

  files: function(){
    return S3.collection.fin();
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var firstName = template.$('[name=FirstName]').val();
    var lastName = template.$('[name=LastName]').val();
    var major = template.$('[name=Major]').val();
    var birthday = template.$('[name=birthmonth]').val() + "/" + template.$('[name=birthday]').val() + "/" + template.$('[name=birthyear]').val();
    var gradDate = template.$('[name=gradmonth]').val() + template.$('[name=gradday]').val() + template.$('[name=gradyear]').val();
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
       errors.password_len = 'Password must be at least 8 characters long.';

    }

    //test password complexity (this ensures new users passwords contain an uppercase, lowercase, and number)
    var hasUpperCase = /[A-Z]/.test(confPass);
    console.log(hasUpperCase);
    var hasLowerCase = /[a-z]/.test(confPass);
    console.log(hasLowerCase);
    var hasNumbers = /\d/.test(confPass);
    console.log(hasNumbers);
    if(hasUpperCase + hasLowerCase + hasNumbers < 3)
      errors.password_strength = 'Password must contain at least 8 characters, contain a number, uppercase letter, and lowercase letter';


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
      email: email,
      picture: "https://s3.amazonaws.com/icelistphotobucket/Images/defaultprofile.jpg"
    }

    // Create a new user
    Accounts.createUser({ name: firstName + lastName , password: inPass , email: email, profile: user}, function(error) {
      // Callback function 
      if (error.reason == 'mustverify') {
        Router.go('/thankyou/new-user');
        return true;
      }      
      // If there's an error
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      
      // Go to the New User page
      Router.go('/thankyou/new-user');
    });
  }
});
