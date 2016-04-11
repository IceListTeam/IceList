// smtp.js
// Contains all handlers for Meteor mail services and SMTP authentication

Meteor.startup(function () {
  // URL for mailserver is found in Meteor settings.json file. 
  process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;

  // Set up email templates
  Accounts.emailTemplates.from = 'icelist@pitt.edu';
  Accounts.emailTemplates.siteName = 'icelist.meteor.com';

  // Turn on verification email
  Accounts.config({
    sendVerificationEmail: true
  });
  
  // Setup information for email-verification email
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for IceList';
  };
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };
  
  // -- 

  // Setup information for "Reset Password" email
  Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'Reset Your Password on IceList';
  };
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    url = url.replace('#/', '');
    url = url.replace('reset-password','resetpassword');
    return " To reset your password, simply click the link below:\n\n" + url;
  };
});

