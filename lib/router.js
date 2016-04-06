// router.js
// Settings for Iron Router and path routing

// IronRouter Configuration 
var ERRORS_KEY = 'signinErrors';

Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    if( Meteor.user() ) // Don't wait on the subscriptions if we won't be using them.
    {
      return [
        Meteor.subscribe("messagesDetails"),
        Meteor.subscribe("messages"),
        Meteor.subscribe("directory"),
        Meteor.subscribe("Listings"),
        Meteor.subscribe("userData")
      ];
    }
  }
});

var IR_BeforeHooks = {
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          console.log(pause);
          Session.set(ERRORS_KEY, {'notloggedin': "You must log in before accessing this page."});
          this.render('signin');
        }
        else
        {
          this.next();
        }
    }
}

// Prevent access to any pages by users that are not logged in except those listed below
Router.onBeforeAction(IR_BeforeHooks.isLoggedIn, {except: ['signin' , 'home' , 'thankyou' , 'resetpassword' , 'verify-email' , 'join' , 'forgotPassword']});

dataReadyHold = null;
if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

// -- 

// Controller Definitions 

AccountController = RouteController.extend({
  verifyEmail: function () {
    Accounts.verifyEmail(this.params.token, function () {
    Router.render('main');
    });
  }
}); 

// --

// Route Definitions

Router.route('home', {
  path: '/',
  action: function() {
  if(Meteor.user()) //user is logged in
  {
    Router.go('main');
  }
  else
    Router.go('signin');
  }
});

Router.route('thankyou', {
  path: '/thankyou/:_id',
  data: function (){
    _id  = this.params._id;
    templateData = {
      desc : _id
    };
    return templateData;
  }
});

Router.route('resetpassword', {
  path: '/resetpassword/:_id',
  data: function (){
    _id  = this.params._id;
    templateData = {
      token : _id
    };
    return templateData;
  }
});

Router.route('verifyEmail', {
  controller: 'AccountController',
  path:'verify-email/:token',
  action: 'verifyEmail'
});

Router.route('enrollAccount', {
  controller: 'AccountController',
  path: '/enroll-account/:token'
});

Router.route('newMessageList');

Router.route('updatepicture');

Router.route('newlisting');

Router.route('upload');

Router.route('join');

Router.route('signin');

Router.route('forgotPassword');

Router.route('update');

Router.route('newPost');

Router.route('posts');

Router.route('messageNew', {
  path: '/messages/new/add',
  data: function (){
    templateData = {
      _id :  null,
      _new : true,
      userId : Meteor.userId,   
      userss : Meteor.users.find({})
    };
    return templateData;
  }
});

Router.route('messageView', {
  path: '/messages/:_id',
  data: function (){
    _id  = this.params._id;
    templateData = {
      _id : _id,
      messageDetails : MessagesDetails.find({messageId:_id}),
      userId : Meteor.userId
    };
    return templateData;
  }
});

Router.route('messages', {
  path: '/messages/',
  data: function (){
    templateData = {
      _id : null,
      userId : Meteor.userId,
      messageListss : Messages.find()
    };
    return templateData;
  }
});

Router.route('main', {
  path: '/main/',
  data: function (){
    console.log( this.params );
    if(this.params.query.i == "event") {
      templateData = {
        showListings : Listings.find({ category: "Event" }).fetch(),
        currentCategory : "event"
      };
    }
    else if(this.params.query.i == "sale") {
      templateData = {
        showListings : Listings.find({ category: "Listing" }).fetch(),
        currentCategory : "sale"
      };    
    }
    else
    {
      templateData = {
        showListings : Listings.find({}).fetch(),
        currentCategory : "all"
      };
    }
    return templateData;
  }
});

Router.route('myPosts', {
  path: '/myPosts/',
  data: function (){
    templateData = {
      showMyListings : Listings.find({"category":"Listing"}).fetch(),
      showMyEvents   : Listings.find({"category":"Event"}).fetch()
    };
    return templateData;
  }
});

Router.route('mylistings', {
  path: '/mylistings/',
  data: function (){
    templateData = {
      showMyListings : Listings.find({"category":"Listing"}).fetch()
    };
    console.log(templateData.showMyListings);
    return templateData;
  }
});
