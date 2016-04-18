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
  
  descHelper: function(cat , priv , loc , pri) {
    if(cat=="Event") {
      if(priv != "Private")
      {
        return loc;
      }
      else
      {
        return "<i class=\"tiny lock icon\"></i>Private";
      }
    } else {
      return "$" + pri;
    }
  },
  
  userImage: function (owner) {
    return Meteor.users.findOne({_id: owner})["profile"]["picture"];
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