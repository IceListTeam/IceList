Template.updatepicture.helpers({
  userImage: function () {
    return Meteor.users.findOne({_id: Meteor.userId()})["profile"]["picture"];
  }
});

Template.updatepicture.events({
  'change .uploadFile': function(event, template) {
    event.preventDefault();

    var metaContext = { context: "profile" };
    var upload1 = new Slingshot.Upload("myImageUploads",metaContext);
    var timeStamp = Math.floor(Date.now());                 
    upload1.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
      if (error) {
        console.error('Error uploading');
        alert(error);
      }
      else{
        template.$("[id=imgloc]").html("<img class=\"ui small circular image\" src=\""+downloadUrl+"\" style=\"height: 100px; width: 100px;\" />");
        Meteor.call("updatePicture",Meteor.userId(),downloadUrl);
      }
    });
    uploader.set(upload1);
  }
});