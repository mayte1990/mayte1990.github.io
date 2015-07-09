angular.module('starter.controllers', [])

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

  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

})

.controller('chatController', function($scope,$rootScope,$stateParams,PersonService){
  $scope.user = PersonService.MatchUser($rootScope.items,$stateParams.username);
})

.controller('contactController', function($scope) {
  $scope.headList = [{
    "icon" : "ion-person-add",
    "text" : "朋友推荐讯息",
    "bgColor" : {"background-color":"orange"},
    "url" : ""
  },{
    "icon" : "ion-person-stalker",
    "text" : "聊天室",
    "bgColor" : {"background-color":"green"},
    "url" : ""
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

})

.controller('findController', function($scope) {})

.controller('setController', function($scope,PersonService) {
  PersonService.GetNewUser().then(function(items){
    $scope.user = items[0];
  });
})

.controller('contentController',function($scope,ListService){
  $scope.backHome = function(){
    location.href = "#/index";
  }
  ListService.GetList().then(function(items){
    $scope.items = items;
  });;

  $scope.showDeleteButtons = function(){
    if($scope.shouldShowDelete==false)$scope.shouldShowDelete = true;
    else $scope.shouldShowDelete = false;
  }
})

.controller('VoiceDetailController',function($scope,$stateParams,ListService){
  $scope.item = ListService.MatchList($stateParams.itemId);
});

