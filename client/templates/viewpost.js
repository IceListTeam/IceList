//viewpost.js
Template.viewpost.onCreated(function() {
  $('.ui.modal').modal({context:'#wrapper'})
  ;
  $('img').popup();
});


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
  
  countHelper: function(attend) {
    return attend.length;
  },
  
  iconHelper: function(cate) {
    return cate=="Event" ? "calendar outline" : "dollar";
  },
  
  ownPost: function(owner) {
    return Meteor.userId() == owner; 
  },
  
  userImage: function (owner) {
    return Meteor.users.findOne({_id: owner})["profile"]["picture"];
  },
  
  dateHelper: function(postdate) {
    return moment(postdate).format("ddd, MMMM Do YYYY, h:mm a");
  },
  
  is: function(cat,typ) {
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
  },
  
  userAttend: function(postid) {
    if( Listings.findOne({ _id: postid , attend: Meteor.userId() }) )
    {
        return true;
    }
    else 
    {
      return false;
    }
  },
  
  showPrivate: function(postid,privacy) {
    if(privacy=="Private") 
    {
      if( Listings.findOne({ _id: postid , attend: Meteor.userId() }) )
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      return false;
    }
  }
});

Template.viewpost.events({

  'click .deletecomment': function(event, template){
    event.preventDefault();
    
    var commnum = event.target.firstElementChild.value;
    Meteor.call("delComment" , commnum , Meteor.userId() , template.data.thisPost._id);
  },
  
  'click .unsubbutton': function(event, template){
    event.preventDefault();
    
    var cata = template.data.thisPost.category;
    
    if(cata=="Event")
    {
      Meteor.call("removeAttendee" , Meteor.userId() , template.data.thisPost._id);
    }
  },

  'click .subbutton': function(event, template){
    event.preventDefault();
    
    var cata = template.data.thisPost.category;
    
    if(cata=="Event")
    {
      Meteor.call("addAttendee" , Meteor.userId() , template.data.thisPost._id);
    }
  },
  
  'click #editbutton': function(event, template) {
    $('#editprompt').modal({context:'#wrapper'}).modal('toggle');
  },
  'click #deletebutton': function(event, template) {
    $('#deleteprompt').modal({context:'#wrapper'}).modal('toggle');
  },
  'click #declinedelete': function(event, template) {
    $('#deleteprompt').modal("hide dimmer").modal("hide");
  },
  'click #acceptdelete': function(event, template) {
    $('#deleteprompt').modal("hide dimmer").modal("hide");
    
    Meteor.call("deletePost" , template.data.thisPost._id );
    Router.go("main");
  },  
  'click #declineedit': function(event, template) {
    $('#editprompt').modal("hide dimmer").modal("hide");
  },
  'submit #acceptedit': function(event, template) {
    $('#deleteprompt').modal("hide dimmer").modal("hide");
    
		event.preventDefault();
    var name = template.$('[name=name]').val();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
    var locat = null;
    var privacy = null;
    var maxAttend = null;
    var price = null;
	  var quantity = null;  
    
    if(category=="Listing") {
      price = template.$('[name=price]').val();
      quantity = template.$('[name=quantity]').val();
    }
    
    if(category=="Event") {
      locat = template.$('[name=location]').val();
      privacy = template.$('[name=privacy]').val();
      maxAttend = template.$('[name=maxAttend]').val();
    }
    
    var data = { name: name , desc: desc , location: locat , privacy: privacy , maxAttend: maxAttend , price: price , quantity: quantity };
    
    Meteor.call("updatePost" , template.data.thisPost._id , category , data );
  },
  
  'submit #commentform': function(event, template) {
		event.preventDefault();
    
    var txt = template.$('[name=commenttext]').val();
    
    Meteor.call("addComment" , txt , Meteor.userId() , template.data.thisPost._id );
    
    template.$('[name=commenttext]').val("");
  }
});