Template.newPost.events({
	'submit' : function(event, template)
	{
		event.preventDefault();
    var name = template.$('[name=name]').val();
		var desc = template.$('[name=desc]').val();
		var category = template.$('[name=category]').val();
		var attend = template.$('[name=attend]').val();
		var time = template.$('[name=time]').val();
		var privacy = template.$('[name=privacy]').val();
		var locat = template.$('[name=loc]').val();
    var imgurls = template.$('[id=imageurls]').val();
    
    var images = imgurls.split("|");
    images.pop();

		Meteor.call('addEvent', name , desc , category, attend, time, privacy, locat , images);
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