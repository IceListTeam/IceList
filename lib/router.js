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
        Meteor.subscribe('publicLists'),
        Meteor.subscribe('privateLists'),
        Meteor.subscribe("messagesDetails"),
        Meteor.subscribe("messages"),
        Meteor.subscribe("directory")
        
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
  path: Meteor.absoluteUrl + 'verify-email/:token',
  action: 'verifyEmail'
});

Router.route('enrollAccount', {
  controller: 'AccountController',
  path: '/enroll-account/:token'
});

//Router.route('newMessageList');

Router.route('updatepicture');

Router.route('upload');

Router.route('join');

Router.route('signin');

Router.route('forgotPassword');

Router.route('update');

Router.route('newPost');

Router.route('posts');

Router.route('/messages/new/add', {
  path: '/messages/new/add',
  template: 'messages',
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

Router.route('/messages/:_id', {
  path: '/messages/:_id',
  template: 'messages',
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

Router.route('/messages', {
  path: '/messages',
  template: 'newMessageList',
  data: function (){
	  	  T = [ { _id: "1" , name: "Ted Bundy" , date: "2 days ago" , recentMessage: "Woah dude, that's messed up." , avatar: "http://previews.123rf.com/images/vgstudio/vgstudio1006/vgstudio100600037/7269033-Portrait-of-happy-smiling-man-isolated-on-white-Stock-Photo-man-men-face.jpg" },
      { _id: "2" , name: "Rachel Lagann" , date: "20 minutes ago" , recentMessage: "I have no idea what you mean." , avatar: "http://previews.123rf.com/images/kurhan/kurhan1111/kurhan111100105/11182717-Business-woman--Stock-Photo-lawyer.jpg" },
    ];
	T= Messages.find({},{sort: { date: -1 } });
    templateData = {
      _id : null,
      userId : Meteor.userId,
      messageListss : Messages.find(),
    };
    return templateData;
  }
});

Router.route('main', {
  path: '/main/',
  data: function (){
    templateData = {
      showListings : Listings.find()
    };
    return templateData;
  }
});

