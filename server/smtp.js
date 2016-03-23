
Meteor.startup(function () {
process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;

Accounts.emailTemplates.from = 'icelist@pitt.edu';
Accounts.emailTemplates.siteName = 'icelist.meteor.com';

//subject line of join email
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for IceList';
  };

  //Email text for join email
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };


   //for forgot password email
    Accounts.emailTemplates.resetPassword.subject = function(user) {
     return 'Reset Your Password on IceList';
   };

  Accounts.emailTemplates.resetPassword.text = function (user, url) {
     url = url.replace('#/', '')
     url = url.replace('reset-password','resetPassword')
     return " To reset your password, simply click the link below:\n\n"
       + url;
  };

  Accounts.config({
    sendVerificationEmail: true
  });




});

