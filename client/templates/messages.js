Template.messages.events({
    'click .send_message': function(event,template){
        sendTo=template.$('[name=adduser]:checked').val();
    message=template.$('[name=newTextArea]').val();
    //alert("Send To:"+sendTo+" Message:"+message+"From: "+Meteor.userId());
    messagesID = Messages.insert({
      personA:sendTo,
      personB:Meteor.userId()     
    });
    
    MessagesDetails.insert({
      messageId:messagesID,
      sender:Meteor.userId(),
      receiver:sendTo,
      detailText:message, 
      sendDate: new Date(),
      readDate: null
    });
    
    Router.go('messages');
    },
      'click .send_reply': function(event,template){       
    message=template.$('[name=replyTextArea]').val();
    senderid=Meteor.userId();
    receiverid=template.$('[name=receiver]').val();
      
    
    MessagesDetails.insert({
      messageId:_id,
      sender:Meteor.userId(),
      receiver:receiverid,
      detailText:message, 
      sendDate: new Date(),
      readDate: null
    });
    
    
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