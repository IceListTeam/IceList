Files = new Mongo.Collection('files');

Meteor.methods({
    'saveFile': function(buffer){
        Files.insert({data:buffer})         
    }   
});