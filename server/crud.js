Meteor.methods({

  addEvent: function (desc , category , numPeople , time , privacy , location) {
  
    /*if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }*/
    console.log( "testing if it gets here");

	  Listings.insert({
      desc: desc,
      category: category,
      attend: 0,
      maxAttend: parseInt(numPeople),
      time: time,
      privacy: privacy,
      location: location,
      stat: "Active",
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().emails[0].address
    });
	
	return Listings.find({desc: desc})[0];
  },

  
  addListing: function (desc , category , price , quantity , privacy , location) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

	Listings.insert({
    desc: desc,
	  category: category,
	  price: parseInt(price),
	  quantity: parseInt(quantity),
	  location: location,
	  status: "Unsold",
    createdAt: new Date(),
    owner: Meteor.userId(),
    username: Meteor.user().emails[0].address
    });

  return Listings.find({desc: desc})[0];
  },

  deleteItem: function (taskId) {

    Listings.remove(taskId);

  },

  editEvent: function (taskId) {

    Tasks.update(taskId, { $set: { checked: setChecked} });

  }

});