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

.controller('ContactController', function($scope) {})

.controller('ContentController',function($scope,ListService){
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

