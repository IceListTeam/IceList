 var uploader = new ReactiveVar(); 
 var imageDetails = new Mongo.Collection('images'); 
var currentUserId = Meteor.userId(); 

Template.upload.events({'change .uploadFile': function(event, template) {

             event.preventDefault();

             var upload1 = new Slingshot.Upload("myImageUploads");
             var timeStamp = Math.floor(Date.now());                 
         upload1.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
             uploader.set();
             if (error) {
               console.error('Error uploading');
               alert (error);
             }
             else{
               console.log("Success!");
               console.log('uploaded file available here: '+downloadUrl);
               imageDetails.insert({
                   imageurl: downloadUrl,
                   time: timeStamp,
                   uploadedBy: currentUserId
               });
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
    },

    url: function () {

    return imageDetails.findOne({uploadedBy: currentUserId},{sort:{ time : -1 } });

    },

});