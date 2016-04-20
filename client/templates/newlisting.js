//newlisting.js

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
    var imgurls = template.$('[id=imageurls]').val();
    
    var images = imgurls.split("|");
    images.pop();

		Meteor.call('addListing', name , desc , category , price , quantity , locat , images);
    Router.go("main");
	},

  'change .uploadFile': function(event, template) {

    event.preventDefault();

    var upload1 = new Slingshot.Upload("myImageUploads");
    var timeStamp = Math.floor(Date.now());                 
    upload1.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
      if (error) {
        console.error('Error uploading');
        alert(error);
      }
      else{
        template.$("[id=imgloc]").html( template.$("[id=imgloc]").html() + "<img src=\""+downloadUrl+"\" height=\"100px\" style=\"float: left; padding-left: 5px;\">");
        template.$("[id=imageurls]").val( template.$("[id=imageurls]").val() + downloadUrl + "|");
      }
    });
  }
});
