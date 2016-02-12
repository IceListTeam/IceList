
Meteor.startup(function () {
process.env.MAIL_URL = 'smtp://icelistMail:Password1@smtp.sendgrid.net:587';

Accounts.emailTemplates.from = 'icelist@pitt.edu';
Accounts.emailTemplates.siteName = 'icelist.meteor.com';

//subject line of email
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for IceList';
  };

  //-- Email text
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };

 // 3.  Send email when account is created

  Accounts.config({
    sendVerificationEmail: true
  });

  //for forgot password email   
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
     url = url.replace('#/', '')
     return " To reset your password, simply click the link below:\n\n"
       + url;
  };





});

