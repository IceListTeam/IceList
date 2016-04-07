Meteor.methods({

  addEvent: function (postName , longDesc , category , numPeople , time , privacy , location) {
  
    /*if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }*/
    console.log( "testing if it gets here");

	  Listings.insert({
      name: postName,
      desc: longDesc,
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
	
	return Listings.find({name: postName})[0];
  },

  
  addListing: function (postName , longDesc , category , price , quantity , privacy , location) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

	Listings.insert({
    name: postName,
    desc: longDesc,
	  category: category,
	  price: parseInt(price),
	  quantity: parseInt(quantity),
	  location: location,
	  status: "Unsold",
    createdAt: new Date(),
    owner: Meteor.userId(),
    username: Meteor.user().emails[0].address
    });

  return Listings.find({name: postName})[0];
  },

  deleteItem: function (taskId) {

    Listings.remove(taskId);

  },

  editEvent: function (taskId) {

    Tasks.update(taskId, { $set: { checked: setChecked} });

  }

});