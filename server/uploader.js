var imageDetails = new Mongo.Collection('images');

Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 2 * 1024 * 1024,
});

Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  AWSAccessKeyId: "AKIAJ7H3ZOLBBV5K4RSA ", 
  AWSSecretAccessKey: "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", 
  bucket: "icelistphotobucket",
  acl: "public-read",
  region: "us-east-1",

  authorize: function () {
    if (!this.userId) {
      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    var currentUserId = Meteor.user().emails[0].address;
    return currentUserId + "/" + file.name;
  }

});