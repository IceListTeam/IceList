Template.messages.events({
    'click .send_message': function(event,template){
     sendTo=template.$('[name=adduser]:checked').val();
   message=template.$('[name=newTextArea]').val();

   Meteor.call('addMessage', sendTo,message);    


   Router.go('messages');

    },
    'click .send_reply': function(event,template){    
  message=template.$('[name=replyTextArea]').val();
  template.$('[name=replyTextArea]').val("");
   senderid=Meteor.userId();
   receiverid = (this.otherPerson.personA==senderid?this.otherPerson.personB:this.otherPerson.personA);
  
   Meteor.call('replyMessage', _id,receiverid,message);  
    }
});



Template.messages.helpers({
  equals: function (a,b) {
    return a === b;
  },
   otherPerson: function (a,b) {
    if(a == b){
    return true;
  }else {
    return false;
  }
  },
  msgAvatar:function(){
	  return "http://previews.123rf.com/images/kurhan/kurhan1111/kurhan111100105/11182717-Business-woman--Stock-Photo-lawyer.jpg";
  },
  dateHelper:function(date) {
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
});