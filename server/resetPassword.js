Meteor.methods({
    'sendLogMessage': function(){
        console.log("Hello world");
    },

    'changeMyPassword' : function(userId, password){
    	console.log("resetting password...");
       Accounts.setPassword(userId, password);

    }

});