Meteor.methods({
    'sendLogMessage': function(){
        console.log("Hello world");
    },

    'changeMyPassword' : function(userId, password){
    	console.log("resetting password...");
    	//console.log(Meteor.user()._id)
       Accounts.setPassword(userId, password);

    }

});