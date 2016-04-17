//main.js

Template.main.helpers({
  nameHelper: function(uid) {
    var n = Meteor.users.findOne( {_id:uid} );  
    if(n) {
      return n.profile.firstname + " " + n.profile.lastname;
    }
    return "undefined";
  },

  catHelper: function(cate) {
    return cate=="Event" ? "teal calendar outline" : "blue dollar";
  },
  
  dateHelper: function(date) {
    var L = new Date(date);
    var diff = Math.abs(Date.now() - L.getTime());
    var diffDays = Math.floor(diff / (1000 * 3600 * 24)); 
    diff = diff - (diffDays * (1000 * 3600 * 24));
    var diffHours = Math.floor(diff / (1000 * 3600)); 
    diff = diff - (diffHours * (1000 * 3600));
    var diffMinutes = Math.floor(diff / (1000 * 60)); 
    if(diffDays <= 0 && diffHours <= 0 && diffMinutes <= 0) {
      return "<1m"
    }
    return (diffDays > 0 ? diffDays + "d " : "") + (diffHours > 0 ? diffHours + "h " : "") + (diffMinutes > 0 ? diffMinutes + "m " : "");
  },
  
  whichActive: function(sort , n) {
    if( sort == n ) return "active";
    return "";
  },
  
  descHelper: function(cat , loc , pri) {
    if(cat=="Event") {
      return loc;
    } else {
      return "$" + pri;
    }
  },
  
  userImage: function (owner) {
    /*if( Meteor.user().profile["picture"] != null)
    {
      var img = Images.findOne( {"_id": Meteor.user().profile["picture"] } );
      if( img )
      {
        return img;
      }
      else
      {
        Meteor.users.update( { _id: Meteor.user()._id }, { $set: { "profile.picture": null }});
        return Images.findOne( { _id : "YBtQ8Wb4YDHRJjHTd" } );
      }
    }*/
    return "/img/default_pic.jpg";
  },
  
  sortActive: function(sort , curr) {
    if (sort==curr) {
      return "active";
    }
    else
    {
      return "";
    }
  }
});

Template.main.events({

  'click .subbutton': function(event, template){
    event.preventDefault();
    
    var cata = "";
    for( var i = 0 ; i < template.data.showListings.length ; i++)
    {
      if(template.data.showListings[i]._id==event.target.id)
      {
        cata = template.data.showListings[i].category;
      }
    }
    
    if(cata=="Event")
    {
      Meteor.call("addAttendee" , Meteor.userId() , event.target.id);
    }
    else
    {
      Router.go("/messages/new/");
    }

  }
})