// thankyou.js

Template.thankyou.helpers({

  tokenSubtitle: function(key) {
    switch(key) {
      case "new-user":
        return Spacebars.SafeString("Your account has been registered.");
        break;
      case "reset-password":
        return Spacebars.SafeString("Password change successful.");
        break;
      default:
        return Spacebars.SafeString("Error page.");
        break;    
    }
  },
  
  tokenText: function(key) {
    switch(key) {
      case "new-user":
        return Spacebars.SafeString("Thank you for registering. A verification email has been sent to you.<br>You must verify your email by clicking the link in the verification email before you can log in.");
        break;
        
      case "reset-password":
        return Spacebars.SafeString("Your password has been reset, and you may now log in with the new password. Thank you for using the password reset system.");
        break;
        
      default:
        return Spacebars.SafeString("Thank you for being a part of IceList. We really appreciate you being here, but it appears that an error took you here on accident. Let us know and we'll fix it ASAP!");
        break;
    
    }
  }
  
});