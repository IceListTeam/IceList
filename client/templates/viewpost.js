//viewpost.js
Template.viewpost.helpers({
  nameHelper: function(uid) {
    var n = Meteor.users.findOne( {_id:uid} );  
    if(n) {
      return n.profile.firstname + " " + n.profile.lastname;
    }
    return "undefined";
  },
  colorHelper: function(cate) {
    return cate=="Event" ? "teal" : "blue";
  },
  iconHelper: function(cate) {
    return cate=="Event" ? "calendar outline" : "dollar";
  },
  
  ownPost: function(owner) {
    return Meteor.userId() == owner; 
  },
  
  userImage: function () {
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
  dateHelper: function(postdate) {
    return moment(postdate).format("ddd, MMMM Do YYYY, h:mm a");
  },
  catIs: function(cat,typ) {
    return cat == typ;
  },
  dateDiffHelper: function(date) {
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
  }
});

Template.viewpost.events({
  'click #editbutton': function(event, template) {
    console.log("Clicked edit");
  },
  'click #deletebutton': function(event, template) {
    console.log("Clicked delete");
    $('#deleteprompt').modal('show');
  }
});