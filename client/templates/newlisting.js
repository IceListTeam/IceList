//new-listing.js

Template.newlisting.events({
	'submit' : function(event, template)
	{
		event.preventDefault();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		var locat = template.$('[name=loc]').val();
		var status = template.$('[name=stat]').val();
		var price = template.$('[name=price]').val();
	    var quantity = template.$('[name=quantity]').val();
	    var privacy = template.$('[name=privacy]').val();

		console.log(desc , category , price , quantity , privacy , location , status );

		Meteor.call('addListing', desc , category , price , quantity , privacy , locat , status );
	}
});
