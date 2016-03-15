Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('todos', function(listId) {
  check(listId, String);

  return Todos.find({listId: listId});
});


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

Meteor.publish('images', function(limit) {
  check(limit, Number);

  return Images.find({}, {
    limit: limit
  });
});


