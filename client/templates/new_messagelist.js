
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
		// returns just the userID of newest sender need handler to get user name from ID
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
      return uObj.date;
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