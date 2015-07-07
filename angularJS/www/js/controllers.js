angular.module('starter.controllers', [])

.controller("WeChatController",function($scope,$http,$log,$ionicScrollDelegate,$ionicSideMenuDelegate,PersonService){
  //初始化第一个方法-记录10条
  PersonService.GetFeed().then(function(items){
    $scope.items = items;
  });
  //向上拉的方法
  $scope.doRefresh = function(){
     PersonService.GetNewUser().then(function(items){
       $scope.items = items.concat($scope.items);

       //Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
  //加载更多的方法
  $scope.loadMore = function() {
    PersonService.GetNewUser().then(function(items){
       $scope.items = [].concat($scope.items,items);

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

.controller('chatController',function($scope,$stateParams,PersonService){
  console.log($stateParams.username);
  $scope.user = PersonService.MatchUser($stateParams.username);
  console.log($scope.user);
})

.controller('HomeDetailController',function($scope,$stateParams,PersonService){
  $scope.user = PersonService.MatchUser($stateParams.username);

  $scope.moveItem = function(item, fromIndex, toIndex) {
    //把该项移动到数组中
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
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

