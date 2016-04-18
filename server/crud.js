Meteor.methods({

  addEvent: function (postName , longDesc , category , numPeople , time , privacy , location) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

	  Listings.insert({
      name: postName,
      desc: longDesc,
      category: category,
      attend: new Array(),
      maxAttend: parseInt(numPeople),
      time: time,
      privacy: privacy,
      location: location,
      stat: "Active",
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().emails[0].address
    });
    
    return Listings.findOne({name: postName});
  },

  updatePicture: function(userid , photourl) {
    Meteor.users.update({_id: userid} , {$set: {"profile.picture": photourl}});
  },  
  
  addAttendee: function(attendid , eventid) {
    //check if userid (attendid) is already in the attend array
    if( Listings.findOne({ _id: eventid , attend: attendid}) )
    {
      throw new Meteor.Error("Already exists");
    }
    else if( Listings.findOne({ _id: eventid })["maxAttend"] <= Listings.findOne({ _id: eventid })["attend"].length)
    {
      throw new Meteor.Error("Event is already full.");
    }
    else
    {
      Listings.update({_id: eventid} , {$push: {attend: attendid}});
    }
  },

  removeAttendee: function(attendid , eventid) {
    //check if userid (attendid) is already in the attend array
    if( Listings.findOne({ _id: eventid , attend: attendid}) == null )
    {
      throw new Meteor.Error("Cannot remove, was not added");
    }
    else
    {
      Listings.update({_id: eventid} , {$pull: {attend: attendid}});
    }
  },
  
  addListing: function (postName , longDesc , category , price , quantity , location) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Listings.insert({
      name: postName,
      desc: longDesc,
      category: category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      location: location,
      status: "Unsold",
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().emails[0].address
      });

    return Listings.findOne({name: postName});
  },

  deletePost: function (postid) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    
    
    var i = Listings.findOne({_id : postid});
    
    if(!i) { throw new Meteor.Error("incorrect-id"); }
    
    if(i.owner != Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    Listings.remove( {_id: postid} );

    return true;
  },

  updatePost: function (postid , cat , params) {
  
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    
    
    var i = Listings.findOne({_id : postid});
    
    if(i.owner != Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    if(cat=="Listing") {
      Listings.update( {_id: postid} , { $set: { name: params.name , desc: params.desc , price: parseFloat(params.price) , quantity: parseInt(params.quantity) } });
    }
    if(cat=="Event") {
      Listings.update( {_id: postid} , { $set: { name: params.name , desc: params.desc , location: params.location , privacy: params.privacy , maxAttend: parseInt(params.maxAttend)} });
    }
    
    return true;
  },
  
  addMessage: function(sendTo,message){
   // get the name of sender;
   userData = Meteor.users.findOne({_id:Meteor.userId()}).profile;
   lastFullName = userData.firstname + " " + userData.lastname;
   newMessageID =  Messages.insert({ personA:sendTo, personB:Meteor.userId(),recentMessage:message,recentSender:Meteor.userId(), recentSenderName:lastFullName ,date:new Date()});   
   MessagesDetails.insert({senderName:lastFullName, messageId:newMessageID, sender:Meteor.userId(), receiver:sendTo, detailText:message, sendDate: new Date(), readDate: null});
 
  },
  
  replyMessage: function(mID,receiverid,message){
    userData = Meteor.users.findOne({_id:Meteor.userId()}).profile;
   lastFullName = userData.firstname + " " + userData.lastname;
   Messages.update({_id:mID},{$set: {recentMessage:message,recentSender:Meteor.userId(),date:new Date(),recentSenderName:lastFullName} });
   MessagesDetails.insert({
	 senderName:lastFullName,
     messageId:mID,
     sender:Meteor.userId(),
     receiver:receiverid,
     detailText:message, 
     sendDate: new Date(),
     readDate: null
   });
  }
  
});