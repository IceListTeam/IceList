Listings = new Mongo.Collection('Listings');
Meteor.methods({

  addEvent: function (desc , category , numPeople , time , privacy , location , status ) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

	  Listings.insert({
      desc: desc,
      category: category,
      attend: numPeople,
      time: time,
      privacy: privacy,
      locat: locat,
      stat: stat,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
	
	console.log(desc , category , numPeople , time , privacy , location , status)
	return Listings.find({desc: desc})[0];
  },
  
  addListing: function (desc , category , price , quantity , privacy , location , status ) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

	Listings.insert({
      desc: desc,
	  category: category,
	  price: price,
	  time: time,
	  quantity: quantity,
	  location: location,
	  status: status,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

  },

  deleteItem: function (taskId) {

    Listings.remove(taskId);

  },

  editEvent: function (taskId) {

    Tasks.update(taskId, { $set: { checked: setChecked} });

  }

});