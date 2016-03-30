// testing.js
// Creates some test users if they dont exist already
Meteor.startup(function () {
  if( !Accounts.findUserByEmail("testuser@test.test") )
  {
    var user1 = {
      firstname: "Test",
      lastname: "User",
      birthday: "01/01/2016",
      major: "Quality Assurance",
      gradDate: "01/01/2017",
      phone: "555-555-5555",
      email: "testuser@test.test"
    }

    Meteor.users.insert({
      "createdAt" : "2016-03-24T15:39:45.674Z", 
      "services" : { "password" : { "bcrypt" : "$2a$10$FXRXxovDQg/D/xIKQrBPG.y7HmBzrUoWKdCHcHGckhEgExX7rfO4G" } },
      "emails" : [ { "address" : "testuser@test.test", "verified" : true } ],
      "profile" : { "firstname" : "test", "lastname" : "user", "phone" : "555 555 5555", "email" : "testuser@test.test" } 
    });
    
    console.log("Added test user 1");
  }
  
  if( !Accounts.findUserByEmail("testuser2@test.test") )
  {
    var user1 = {
      firstname: "Test",
      lastname: "User2",
      birthday: "01/01/2016",
      major: "Quality Assurance",
      gradDate: "01/01/2017",
      phone: "555-555-5555",
      email: "testuser2@test.test"
    }

    Meteor.users.insert({
      "createdAt" : "2016-03-20T15:39:45.674Z", 
      "services" : { "password" : { "bcrypt" : "$2a$10$FXRXxovDQg/D/xIKQrBPG.y7HmBzrUoWKdCHcHGckhEgExX7rfO4G" } },
      "emails" : [ { "address" : "testuser2@test.test", "verified" : true } ],
      "profile" : { "firstname" : "test", "lastname" : "user2", "phone" : "555 555 5555", "email" : "testuser2@test.test" } 
    });
    
    console.log("Added test user 2");
  }
});
