Template.newMessageList.helpers({
  hasConversations: function() {
    return "positive";
  },
  
  allConversations: function() {
    return T;
  },
  
  msgName: function (id) {
    list = T;
    uObj = null;
    list.forEach( function(i) {
      if(i){
        if(i._id === id) {
          uObj = i;
        }
      }
    });
    if(uObj) {
      //// returns just the userID of newest sender need handler to get user name from ID
      return uObj.recentSenderName;
    } else {
      return null;
    }
  },
  
  msgAvatar: function (id) {
    list = T;
    uObj = null;
    list.forEach( function(i,index) {
      if(i){
        if(i._id === id) {
          uObj = i;
        }
      }
    });
    if(uObj) {
      // we will need a new handler to get user avater from recentSender user ID
      //return uObj.avatar;
        return "http://previews.123rf.com/images/kurhan/kurhan1111/kurhan111100105/11182717-Business-woman--Stock-Photo-lawyer.jpg";
     } else {
    
      return null;
    }
  },
  
  msgDate: function (id) {
    list = T;
    uObj = null;
    list.forEach( function(i,index) {
      if(i){
        if(i._id === id) {
          uObj = i;
        }
      }
    });
    if(uObj) {
      return dateHelper(uObj.date) + ' ago';
    } else {
      return null;
    }
  },
  
  msgPreview: function (id) {
    list = T;
    uObj = null;
    list.forEach( function(i,index) {
      if(i){
        if(i._id === id) {
          uObj = i;
        }
      }
    });
    if(uObj) {
      return uObj.recentMessage;
    } else {
      return null;
    }
  }
    
  
});

  function dateHelper(date) {
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
  }