// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
/*模板*/
.directive('header', function () {
  return { 
    restrict: 'AE', 
    templateUrl: function (elem, attr) {
        return "templates/head_footer/"+attr.value + ".html";  //当然这里我们可以直接指定路径，同时在模板中可以包含表达式
    }
  };
})

.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
  //tabs 固定底部
  $ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');

  //导航栏route
  $urlRouterProvider.otherwise("/tab/WeChat");

  $stateProvider
  .state("tab",{
    url : "/tab",
    abstract: true,
    views:{
      'home':{
        templateUrl : "templates/tab.html"
      }
    }
  })
  .state("tab.WeChat",{
    url: '/WeChat',
    views: {
      'WeChat-tab': {
        templateUrl: 'templates/WeChat/WeChat.html',
        controller: 'WeChatController'
      }
    }
  })
  .state("chat",{
    url: '/tab/chat/:username',
    views: {
      'home': {
        templateUrl: 'templates/WeChat/chat.html',
        controller: 'chatController'
      }
    }
  })
  .state("tab.contact",{
    url: '/contact',
    views: {
      'contact-tab': {
        templateUrl: 'templates/Contact/contact.html',
        controller: 'contactController'
      }
    }
  })
  .state("tab.find",{
    url: '/find',
    views: {
      'find-tab': {
        templateUrl: 'templates/Find/find.html',
        controller: 'findController'
      }
    }
  })
  .state("tab.set",{
    url: '/set',
    views: {
      'set-tab': {
        templateUrl: 'templates/Set/set.html',
        controller: 'setController'
      }
    }
  })
  .state("voice",{
    url: '/voice/:itemId',
    templateUrl : "templates/voice_detail.html",
    controller : "VoiceDetailController"
  })
})
