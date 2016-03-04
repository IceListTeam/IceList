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
    return [
      Meteor.subscribe('publicLists'),
      Meteor.subscribe('privateLists'),
	   Meteor.subscribe("messagesDetails"),
	  Meteor.subscribe("messages"),
	  Meteor.subscribe("directory")
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.route('resetPassword', {
            controller: 'AccountController',
             path: '/reset-password/:token',
             action: 'resetPassword'
         });
 Router.route('verifyEmail', {
             controller: 'AccountController',
             path: '/verify-email/:token',
             action: 'verifyEmail'
         });
 Router.route('enrollAccount', {
 	controller: 'AccountController',
 	path: '/enroll-account/:token',
 	action: 'resetPassword'
 });
 
 AccountController = RouteController.extend({
         resetPassword: function () {
             // NOTE: prompt below is very crude, but demonstrates the solution
             Accounts.resetPassword(this.params.token, prompt('enter new password'), function () {
                 Router.go('/');
             });
         },
         verifyEmail: function () {
             
             Accounts.verifyEmail(this.params.token, function () {
                 Router.render('main');
             });
         }
     }); 

Router.route('join');
Router.route('signin');
Router.route('forgotPassword');
Router.route('ResetPassword');
Router.route('ThanksForRegistering');
Router.route('update');
Router.route('newPost');
<<<<<<< HEAD

Router.route('messages', {
  path: '/messages/new/add',
  data: function (){
    templateData = {
      _id: null,
	  _new:true,
	  userId:Meteor.userId,	  
	  userss:Meteor.users.find({})
    };
    return templateData;
  }
});

Router.route('messages', {
  path: '/messages/:_id',
  data: function (){
    _id  = this.params._id;
    templateData = {
      _id: _id,
	  messageDetails:MessagesDetails.find({messageId:_id}),
	 userId:Meteor.userId
    };
    return templateData;
  }
});

Router.route('messages', {
  path: '/messages/',
  data: function (){
    templateData = {
      _id: null,
	  userId:Meteor.userId,
	  messageListss:Messages.find()
    };
	
    return templateData;
  }
});

Router.route('main');
Router.route('upload');
/*
Router.route('listsShow', {
  path: '/lists/:_id',
  // subscribe to todos before the page is rendered but don't wait on the
  // subscription, we'll just render the items as they arrive
  onBeforeAction: function () {
    this.todosHandle = Meteor.subscribe('todos', this.params._id);

    if (this.ready()) {
      // Handle for launch screen defined in app-body.js
      dataReadyHold.release();
    }
  },
  data: function () {
    return Lists.findOne(this.params._id);
  },
  action: function () {
    this.render();
  }
});
*/


/* I don't think we want our users to go directly to list view... see below
Router.route('home', {
  path: '/',
  action: function() {
    Router.go('listsShow', Lists.findOne());
  }
});
*/

Router.route('home', {
  path: '/',
  action: function() {
	if(Meteor.user()) //user is logged in
	{
		Router.go('main');
	}
	else
    Router.go('signin', Lists.findOne());
  }
});
