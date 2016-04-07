Template.newPost.events({
	'submit' : function(event, template)
	{
		event.preventDefault();
    var name = template.$('[name=name]').val();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		var attend = template.$('[name=attend]').val();
		var time = template.$('[name=time]').val();
		var privacy = template.$('[name=privacy]').val();
		var locat = template.$('[name=loc]').val();
    	console.log('hello');
		//Add more parameters
		//var result = Meteor.call('addEvent', desc, category, attend, time, privacy, locat, stat);
		//console.log(typeof result);
		Meteor.call('addEvent', name , desc , category, attend, time, privacy, locat);
	}
});