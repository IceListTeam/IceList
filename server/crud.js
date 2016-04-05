Meteor.methods({

  addEvent: function (desc , category , numPeople , time , privacy , location , status ) {
  
    /*if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }*/

	  Listings.insert({
      desc: desc,
      category: category,
      attend: numPeople,
      time: time,
      privacy: privacy,
      locat: location,
      stat: status,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().emails[0].address
    });
	
	console.log(desc , category , numPeople , time , privacy , location , status);
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
      username: Meteor.user().emails[0].address
    });

  },

  deleteItem: function (taskId) {

    Listings.remove(taskId);

  },

  editEvent: function (taskId) {

    Tasks.update(taskId, { $set: { checked: setChecked} });

  },
  
  addMessage: function(sendTo,message){
	  // get the name of sender;
	  userData = Meteor.users.findOne({_id:Meteor.userId()}).profile;
	  lastFullName = userData.firstname + " " + userData.lastname;
	  newMessageID =  Messages.insert({ personA:sendTo, personB:Meteor.userId(),recentMessage:message,recentSender:Meteor.userId(), recentSenderName:lastFullName ,date:new Date()});	  
	  MessagesDetails.insert({messageId:newMessageID, sender:Meteor.userId(), receiver:sendTo, detailText:message, sendDate: new Date(), readDate: null});
	
  },
  replyMessage: function(mID,receiverid,message){
	   userData = Meteor.users.findOne({_id:Meteor.userId()}).profile;
	  lastFullName = userData.firstname + " " + userData.lastname;
	  Messages.update({_id:mID},{$set: {recentMessage:message,recentSender:Meteor.userId(),date:new Date(),recentSenderName:lastFullName} });
		MessagesDetails.insert({
			messageId:mID,
			sender:Meteor.userId(),
			receiver:receiverid,
			detailText:message, 
			sendDate: new Date(),
			readDate: null
		});
  }

});