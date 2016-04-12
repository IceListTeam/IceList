Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    //this.ready();
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

//////
Meteor.publish('events', function(_id) {
  if (_id)
  {
    //check(listId, String);
    console.log("subscribe to " + _id);
  return Events.find({_id: _id});
  //find({ name: "David" }).fetch();
  }
  else
  {
    console.log("unsubscribe from " + _id);
    return this.stop();
  }
  });
/////////

