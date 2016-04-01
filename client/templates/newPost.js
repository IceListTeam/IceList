Template.newPost.events({
	'submit' : function(event, template)
	{
		event.preventDefault();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		var attend = template.$('[name=attend]').val();
		var time = template.$('[name=time]').val();
		var privacy = template.$('[name=privacy]').val();
		var locat = template.$('[name=loc]').val();
		var stat = template.$('[name=stat]').val();
		console.log(desc, category, attend, time, privacy, locat, stat);
		//Add more parameters
		//var result = Meteor.call('addEvent', desc, category, attend, time, privacy, locat, stat);
		//console.log(typeof result);
		Meteor.call('addEvent', desc, category, attend, time, privacy, locat, stat);
	}
});