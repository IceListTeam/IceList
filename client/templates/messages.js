Template.messages.events({
    'click .send_message': function(event,template){
     sendTo=template.$('[name=adduser]:checked').val();
   message=template.$('[name=newTextArea]').val();

   Meteor.call('addMessage', sendTo,message);    


   Router.go('messages');

    },
    'click .send_reply': function(event,template){    
  message=template.$('[name=replyTextArea]').val();
   senderid=Meteor.userId();
   receiverid=template.$('[name=receiver]').val();

   Meteor.call('replyMessage', _id,receiverid,message);  
    }
});



Template.messages.helpers({
  equals: function (a,b) {
    return a === b;
  },
   otherPerson: function (a,b) {
    if(a === b){
    return '';
  }else {
    return 'danger';
  }
  }
});