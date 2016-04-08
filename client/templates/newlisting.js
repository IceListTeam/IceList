//new-listing.js

Template.newlisting.events({
	'submit' : function(event, template)
	{
		event.preventDefault();
    var name = template.$('[name=name]').val();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		var locat = template.$('[name=loc]').val();
		var price = template.$('[name=price]').val();
	  var quantity = template.$('[name=quantity]').val();

		Meteor.call('addListing', name , desc , category , price , quantity , locat);
    Router.go("main");
	}
});
