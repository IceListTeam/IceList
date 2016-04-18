//var imageDetails = new Mongo.Collection('images');

Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 2 * 1024 * 1024,
});


Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.private.AWSAccessKeyId, 
  AWSSecretAccessKey: Meteor.settings.private.AWSSecretAccessKey, 
  bucket: Meteor.settings.private.bucket,
  acl: Meteor.settings.private.acl,
  region: Meteor.settings.private.region,

  authorize: function () {
    if (!this.userId) {
      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file,metaContext) {
    var currentUserId = Meteor.user().emails[0].address;
    if(metaContext.context=="profile")
    {
      return currentUserId + "/" + "profilepic" + file.name.substr(file.name.lastIndexOf("."));
    }
    return currentUserId + "/" + file.name;    
  }

});