Meteor.publish('messages', function(listId) {
	if (this.userId) {
		return Messages.find({ $or: [ { personA: this.userId }, { personB: this.userId } ] } );
	}else{
		
		return null;
	}
});

Meteor.publish('messagesDetails', function() {
		return MessagesDetails.find({});
});

Meteor.publish("directory", function () {
return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish('Images', function() {
  return Images.find({});
});

Meteor.publish('Listings', function() {
  return Listings.find({});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({},
        {fields: {"profile":1,"_id":1}});
});

