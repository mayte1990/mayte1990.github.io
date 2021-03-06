angular.module('starter.services', [])

.factory('PersonService', function($http){
  var BASE_URL = "http://api.randomuser.me/";
  var items = [];
 
  return {
    GetFeed: function(){
      return $http.get(BASE_URL+'?results=10').then(function(response){
        items = response.data.results;
        return items;
      });
    },
    GetNewUser: function(){
      return $http.get(BASE_URL).then(function(response){
        items = response.data.results;
        return items;
      });
    },
    MatchUser: function(rootItems,username){
      for(var i = 0,len = rootItems.length;i<len;i++){
        if(rootItems[i].user.username === username){
          return rootItems[i];
        }
      }
      return null;
    }
  }
})

.factory('ListService', function($http){
  var BASE_URL = "js/list.json";
  var items = [];
 
  return {
    GetList: function(){
      return $http.get(BASE_URL).then(function(response){
        items = response.data;
        return items;
      });
    },
    MatchList:function(itemId){
      for(var i = 0,len = items.length;i<len;i++){
        if(items[i].id == itemId){
          return items[i];
        }
      }
      return null;
    }
  }
})

.factory('TabService',function(){
  //tabs
  // var tabs = [{
  //   "title" : "WeChat",
  //   "icon" : "ion-chatbubbles",
  //   "url" : "#/tab/WeChat",
  //   "nav" : "WeChat-tab",
  //   "active" : "active"
  // },{
  //   "title" : "通讯录",
  //   "icon" : "ion-person-stalker",
  //   "url" : "#/tab/contact",
  //   "nav" : "contact-tab",
  //   "active" : ''
  // },{
  //   "title" : "发现",
  //   "icon" : "ion-flash-off",
  //   "url" : "#/tab/find",
  //   "nav" : "find-tab",
  //   "active" : ''
  // },{
  //   "title" : "设定",
  //   "icon" : "ion-person",
  //   "url" : "#/tab/set",
  //   "nav" : "set-tab",
  //   "active" : ''
  // }];
  return {
  //   GetTabs : function(){
  //     return tabs;
  //   }
    SelectTab : function(obj,tabs){
      var index = obj.$index;
      angular.forEach(tabs, function(obj) {
        if(obj["active"] == "active"){obj["active"]='';}
      });
      tabs[index].active = "active";
    }
  }
})

.filter('genderFilter',function(){
  return function(str){
    return str === "male"?"男":"女";
  };
})