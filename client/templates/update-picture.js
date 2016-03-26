Template.upload-image.helpers({
  userimage: function () {
    var i = users.find({ $query: {'_id': Meteor.userId} }); // Where Images is an FS.Collection instance
    if(i["profile.image"])
    {
      return i;
    }
    else
    {
      return null;
    }
  }
});

Template.myForm.events({
  'change .myFileInput': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.update(files[i], function (err, fileObj) {
        if (err){
           // handle error
        } else {
           // handle success depending what you need to do
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "/cfs/files/images/" + fileObj._id
          };
          Meteor.users.update(userId, {$set: imagesURL});
        }
      });
    }
  }
});