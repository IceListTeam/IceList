//new-listing.js
 var uploader = new ReactiveVar(); 
 //var imageDetails = new Mongo.Collection('images'); //may not need this since its declared in upload.js
var currentUserId = Meteor.userId(); 

Template.newlisting.events({
	'submit' : function(event, template)
	{
		event.preventDefault();
    var name = template.$('[name=name]').val();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		var locat = template.$('[name=loc]').val();
		var price = template.$('[name=price]').val();
	  var quantity = template.$('[name=quantity]').val();

		Meteor.call('addListing', name , desc , category , price , quantity , locat);
    Router.go("main");
	},

	'click #uploadImage' : function(event, template){
    console.log('uplodaimage clicked!');
    event.preventDefault();

<<<<<<< HEAD
    var upload1 = new Slingshot.Upload("myImageUploads");
    var timeStamp = Math.floor(Date.now());                 
    upload1.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
    uploader.set();
    if (error) {
      console.error('Error uploading');
      alert (error);
    }
    else 
    {
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
=======
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
	
>>>>>>> d7bad6aab9e8e3506eee2358d113c15a6980ddc9
});
