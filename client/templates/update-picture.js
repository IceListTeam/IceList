Template.updatepicture.helpers({
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
    return Images.find( { "_id" : "YBtQ8Wb4YDHRJjHTd" });
  }
});

Template.updatepicture.events({
  'dropped #dropzone': function(e) {
      FS.Utility.eachFile(e, function(file) {
        var newFile = new FS.File(file);
        
        Images.insert(newFile, function (error, fileObj) {
          if (error) {
            console.log("error in upload");
          } else {
            Meteor.users.update( { _id: Meteor.user()._id }, { $set: { "profile.picture": fileObj._id }});
            Router.go('updatepicture');
          }
      });
    });
  }
});