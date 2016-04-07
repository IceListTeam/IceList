var ERRORS_KEY = 'updateErrors';


Template.update.onCreated(function() {
  Session.set(ERRORS_KEY, {});	
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
  },
  birthdayHelper: function() {
    var dayList = [];
    for( i = 1 ; i <31 ; i++ )
    {
      var j = { name: i , selected: "" };
      dayList.push(j);
    }
    var bm = Meteor.user().profile["birthday"];
    if(bm){
      var a = bm.split("/");
      dayList.forEach(function(i,index) { 
        if(i.name == a[1])
        {
          i.selected = "selected";
        }
      });
    }
    return dayList;
  },
  
  birthmonthHelper: function() {
    var monthList = [{no: 1 , name: "January"} , {no: 2 , name: "February"} , {no: 3 , name: "March"} , {no: 4 , name: "April"} , {no: 5 , name: "May"} , {no: 6 , name: "June"} , {no: 7 , name: "July"} , {no: 8 , name: "August"} , {no: 9 , name: "September"} , {no: 10 , name: "October"} , {no: 11 , name: "November"} , {no: 12 , name: "December"}];
    var bm = Meteor.user().profile["birthday"];
    if(bm){
      var a = bm.toString().split("/");
      monthList.forEach(function(i,index) { 
        if(i.no == a[0])
        {
          i.selected= "selected";
        }
      });
    }
    return monthList;
  },
  
  birthyearHelper: function(maxdate) {
    var yearList = [];
    for( i = maxdate ; i >= 1990 ; i-- )
    {
      var j = { name: i , selected: "" };
      yearList.push(j);
    }
    var bm = Meteor.user().profile["birthday"];
    if(bm){
      var a = bm.split("/");
      yearList.forEach(function(i) { 
        if(i.name == a[2])
        {
          i.selected = "selected";
        }
      });
    }
    return yearList;
  },
  
  graddayHelper: function() {
    var dayList = [];
    for( i = 1 ; i <31 ; i++ )
    {
      var j = { name: i , selected: "" };
      dayList.push(j);
    }
    var bm = Meteor.user().profile["gradDate"];
    if(bm){
      var a = bm.split("/");
      dayList.forEach(function(i,index) { 
        if(i.name == a[1])
        {
          i.selected = "selected";
        }
      });
    }
    return dayList;
  },
  
  gradmonthHelper: function() {
    var monthList = [{no: 1 , name: "January"} , {no: 2 , name: "February"} , {no: 3 , name: "March"} , {no: 4 , name: "April"} , {no: 5 , name: "May"} , {no: 6 , name: "June"} , {no: 7 , name: "July"} , {no: 8 , name: "August"} , {no: 9 , name: "September"} , {no: 10 , name: "October"} , {no: 11 , name: "November"} , {no: 12 , name: "December"}];
    var bm = Meteor.user().profile["gradDate"];
    if(bm){
      var a = bm.toString().split("/");
      monthList.forEach(function(i,index) { 
        if(i.no == a[0])
        {
          i.selected= "selected";
        }
      });
    }
    return monthList;
  },
  
  gradyearHelper: function(maxdate) {
    var yearList = [];
    for( i = maxdate ; i >= 1990 ; i-- )
    {
      var j = { name: i , selected: "" };
      yearList.push(j);
    }
    var bm = Meteor.user().profile["gradDate"];
    if(bm){
      var a = bm.split("/");
      yearList.forEach(function(i) { 
        if(i.name == a[2])
        {
          i.selected = "selected";
        }
      });
    }
    return yearList;
  },
});

Template.update.events({
	
  'submit': function(event, template) {
    event.preventDefault();
    var firstName = template.$('[name=FirstName]').val();
    var lastName = template.$('[name=LastName]').val();
    var birthday = template.$('[name=birthday]').val();
    var birthmonth = template.$('[name=birthmonth]').val();
    var birthyear = template.$('[name=birthyear]').val();
    var major = template.$('[name=Major]').val();
    var gradday = template.$('[name=gradday]').val();
    var gradmonth = template.$('[name=gradmonth]').val();
    var gradyear = template.$('[name=gradyear]').val();
    var phone = template.$('[name=Phone]').val();
    var oldPass = template.$('[name=password]').val();
    var newPass = template.$('[name=confirm]').val();
    
    var birth_comp = birthmonth + "/" + birthday + "/" + birthyear;
    var grad_comp = gradmonth + "/" + gradday + "/" + gradyear;

    var errors = {};
    var user;



    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    if (oldPass !== "" && newPass !== "")
    {
      Accounts.changePassword(oldPass, newPass); 
    }

	  Meteor.users.update( { _id: Meteor.user()._id }, { $set: { "profile.firstname": firstName, "profile.lastname": lastName, "profile.name": firstName + lastName, "profile.birthday": birth_comp, "profile.major": major, "profile.gradDate": grad_comp, "profile.phone": phone }});
    Router.go('/thankyou/account-change/');
	}
});