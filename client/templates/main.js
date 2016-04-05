//main.js

Template.main.helpers({
  showListings: function() {
	return Listings.find();
  }
});