T = [ { _id: "1" , name: "Bobert Joseph" , date: "2 days ago" , recentMessage: "Woah dude, that's messed up." , avatar: "http://previews.123rf.com/images/vgstudio/vgstudio1006/vgstudio100600037/7269033-Portrait-of-happy-smiling-man-isolated-on-white-Stock-Photo-man-men-face.jpg" },
      { _id: "2" , name: "Rachel Lagann" , date: "20 minutes ago" , recentMessage: "I have no idea what you mean." , avatar: "http://previews.123rf.com/images/kurhan/kurhan1111/kurhan111100105/11182717-Business-woman--Stock-Photo-lawyer.jpg" },
    ];

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
      return uObj.name;
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
      return uObj.avatar;
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