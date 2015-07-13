angular.module('starter.controllers', [])

.controller('tabController',function($scope,$rootScope){
  $scope.tabs = [{
    "title" : "WeChat",
    "icon" : "ion-chatbubbles",
    "url" : "#/tab/WeChat",
    "nav" : "WeChat-tab",
    "active" : "active"
  },{
    "title" : "通讯录",
    "icon" : "ion-person-stalker",
    "url" : "#/tab/contact",
    "nav" : "contact-tab",
    "active" : ''
  },{
    "title" : "发现",
    "icon" : "ion-flash-off",
    "url" : "#/tab/find",
    "nav" : "find-tab",
    "active" : ''
  },{
    "title" : "设定",
    "icon" : "ion-person",
    "url" : "#/tab/set",
    "nav" : "set-tab",
    "active" : ''
  }];

  $rootScope.selectTab = function(index){
    var tabs = $scope.tabs;
    angular.forEach(tabs, function(obj) {
      if(obj["active"] == "active"){obj["active"]='';}
    });
    tabs[index].active = "active";
  }
  $rootScope.goSearch = function(){
    location.href='#/search'
  }
})

.controller('searchController',function($scope,$rootScope){
  $scope.goBack = function(){
    window.history.go(-1);
  }
})

.controller("WeChatController",function($scope,$rootScope,$http,$log,$ionicScrollDelegate,$ionicSideMenuDelegate,PersonService){
  //初始化第一个方法-记录10条
  PersonService.GetFeed().then(function(items){
    $scope.items = items;
    $rootScope.items = $scope.items;//赋值-全局items
  });
  //向上拉的方法
  $scope.doRefresh = function(){
     PersonService.GetNewUser().then(function(items){
       $scope.items = items.concat($scope.items);
       $rootScope.items = $scope.items;//赋值-全局items

       //Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
  //加载更多的方法
  $scope.loadMore = function() {
    PersonService.GetNewUser().then(function(items){
       $scope.items = [].concat($scope.items,items);
       $rootScope.items = $scope.items;//赋值-全局items

       //Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.infiniteScrollComplete');
     });
  };

  // $scope.$on('stateChangeSuccess', function() {
  //   $scope.loadMore();
  // });
  //返回顶部
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
  //滑动
  $scope.swipeLeft = function(obj){
    $rootScope.selectTab(1);
    location.href = "#/tab/contact";
  }

  $rootScope.addFlag = false;
  $rootScope.toggleAddFlag = function(){
    $rootScope.addFlag = $rootScope.addFlag === false?true:false;
  }

})

.controller('chatController', function($scope,$rootScope,$stateParams,PersonService){
  $scope.user = PersonService.MatchUser($rootScope.items,$stateParams.username);
})

.controller('contactController', function($scope,$rootScope) {
  $scope.headList = [{
    "icon" : "ion-person-add",
    "text" : "朋友推荐讯息",
    "bgColor" : {"background-color":"orange"},
    "url" : "#/contact/recommend_friend"
  },{
    "icon" : "ion-person-stalker",
    "text" : "聊天室",
    "bgColor" : {"background-color":"green"},
    "url" : "#/contact/chatroom"
  },{
    "icon" : "ion-ios-pricetag",
    "text" : "标签",
    "bgColor" : {"background-color":"blue"},
    "url" : ""
  },{
    "icon" : "ion-ios-person",
    "text" : "官方账号",
    "bgColor" : {"background-color":"purple"},
    "url" : ""
  }];
  //滑动
  $scope.swipeLeft = function(){
    $rootScope.selectTab(2);
    location.href = "#/tab/find";
  }
  $scope.swipeRight = function(){
    $rootScope.selectTab(0);
    location.href = "#/tab/WeChat";
  }

})

.controller('recommendFriendController',function($scope,$rootScope,PersonService){
  $scope.goBack = function(){
    window.history.go(-1);
  }
  $scope.goAddFriend = function(){
    location.href="#/contact/add_friend";
  }
  //初始化第一个方法-记录10条
  PersonService.GetFeed().then(function(items){
    $scope.items = items;
  });
})

.controller('addFrinedController',function($scope,$rootScope,PersonService){
  $scope.goBack = function(){
    window.history.go(-1);
  }
  //初始化
  PersonService.GetNewUser().then(function(item){
    $scope.user = item[0];
  });

  $scope.FriendList = [{
    "icon" : "ion-ionic",
    "text" : "朋友探测器",
    "subText" : "快速新增身边的人为朋友",
    "bgColor" : {"background-color":"blue"},
    "url" : ""
  },{
    "icon" : "ion-person-stalker",
    "text" : "加入私密群组",
    "subText" : "与身边的朋友进入同一个聊天室",
    "bgColor" : {"background-color":"green"},
    "url" : ""
  },{
    "icon" : "ion-qr-scanner",
    "text" : "扫描QR Code",
    "subText" : "扫描QR Code卡片",
    "bgColor" : {"background-color":"blue"},
    "url" : ""
  },{
    "icon" : "ion-ios-personadd",
    "text" : "QQ/LinkedIn/手机联络人",
    "subText" : "快速新增身边的人为朋友",
    "bgColor" : {"background-color":"orange"},
    "url" : ""
  },{
    "icon" : "ion-ios-people",
    "text" : "官方账号",
    "subText" : "获取更多的咨询和服务",
    "bgColor" : {"background-color":"blue"},
    "url" : ""
  }];

})

.controller('chatroomController',function($scope,PersonService){
  $scope.flag = true;
  $scope.toggleFlag = function(){
    $scope.flag = $scope.flag==false?true:false;
  };
  $scope.goBack = function(){
    window.history.go(-1);
  }
  $scope.goAddChatroom = function(){
    location.href = "#/contact/chatroom/new_chatroom";
  }
  //初始化第一个方法-记录10条
  PersonService.GetFeed().then(function(items){
    $scope.items = items;
  });
})

.controller('newChatroomController',function($scope,PersonService){
  $scope.goBack = function(){
    window.history.go(-1);
  }
  //初始化第一个方法-记录10条
  PersonService.GetFeed().then(function(items){
    $scope.items = items;
  });

  $scope.a = function(){
    var checkboxList = angular.element("input[nane='chat']");
    console.log(checkboxList);
  }
})

.controller('findController', function($scope,$rootScope) {
  //滑动
  $scope.swipeLeft = function(){
    $rootScope.selectTab(3);
    location.href = "#/tab/set";
  }
  $scope.swipeRight = function(){
    $rootScope.selectTab(1);
    location.href = "#/tab/contact";
  }

})

.controller('setController', function($scope,$rootScope,PersonService) {
  PersonService.GetNewUser().then(function(items){
    $scope.user = items[0];
  });
  //滑动
  $scope.swipeRight = function(){
    $rootScope.selectTab(2);
    location.href = "#/tab/find";
  }

})


