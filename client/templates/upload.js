
Template.upload.events({'change .uploadFile': function(event, template) {

  event.preventDefault();

  var upload1 = new Slingshot.Upload("myImageUploads");
  var timeStamp = Math.floor(Date.now());                 
  upload1.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
    if (error) {
      console.error('Error uploading');
      alert(error);
    }
    else{
      template.$("[id=imgloc]").html( template.$("[id=imgloc]").html() + "<img src=\""+downloadUrl+"\" height=\"100px\">");
      template.$("[id=imageurls]").val( template.$("[id=imageurls]").val() + downloadUrl + "|");
    }
  });
  uploader.set(upload1);
  }
});

Template.upload.helpers({

    isUploading: function () {
        return Boolean(uploader.get());
    },

    progress: function () {
    var upload2 = uploader.get();
    if (upload2)
    return Math.round(upload2.progress() * 100);
    }

});