//myPosts.js

Template.myPosts.events({
	'click .update' : function(event, template)
	{
		event.preventDefault();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		
		//get the id of the event and update it
		console.log(template.data.showMyEvents);

		//Meteor.call('addListing', desc , category , price , quantity , privacy , locat , status );
	},

	'click .delete' : function(event,template)
	{

		event.preventDefault();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();

		console.log("delete clicked!");
	   //get the id of the event and delete it
	}
});
