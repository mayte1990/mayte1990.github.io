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

.config(function($stateProvider,$urlRouterProvider){
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
        templateUrl: 'templates/contact.html',
        controller: 'ContactController'
      }
    }
  })
  .state("tab.set",{
    url: '/set',
    views: {
      'set-tab': {
        templateUrl: 'templates/set.html',
        controller: 'SetController'
      }
    }
  })
  .state("voice",{
    url: '/voice/:itemId',
    templateUrl : "templates/voice_detail.html",
    controller : "VoiceDetailController"
  })
})
