  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  // @See https://github.com/gsklee/ngStorage
  angular.module('ionicApp', ['ionic', 'ngStorage'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home' :{
          templateUrl: "templates/home.html",
          controller : "HomeController"
        }
      }
    })
    .state('tabs.queue', {
      url: "/queue",
      views: {
        'tab-queue': {
          templateUrl: "templates/tab-queue.html",
          controller: 'MenuController'
        }
      }
    })
    .state('tabs.stats', {
      url: "/stats",
      views: {
        'tab-stats': {
          templateUrl: "templates/tab-stats.html",
          controller: 'MenuController'
        }
      }
    })

    $urlRouterProvider.otherwise("/tab/queue");

  })


  .controller('AppController', function($scope, $sessionStorage, $http) {
    //$ionicSideMenuDelegate.toggleLeft();
    // Hook session storage to the scope
    //$scope.$storage = $sessionStorage;

    // Load default data
    $http.get('json/defaults.json').success(function (data) {
      //console.log("data = " + JSON.stringify(data));
      $scope.$storage = $sessionStorage.$default(data);
    });

  })

  .controller("HomeController", function($scope, $sessionStorage) {
    // Hook session storage to the scope
    $scope.$storage = $sessionStorage;
    /*$scope.$storage = $sessionStorage.$default({
      scoreLocal: 0,
      scoreVisitor: 0,
      queue : [],
      players : [
      {
        id : 0,
        name : "Modesto"
      },
      {
        id : 1,
        name : "Cristina"
      },
      {
        id : 2,
        name : "Alex"
      },
      {
        id : 3,
        name : "Gabi"
      },
      {
        id : 4,
        name : "Mari Carmen"
      },
      {
        id : 5,
        name : "Maria Luisa"
      },
      {
        id : 6,
        name : "Elliot"
      },
      {
        id : 7,
        name : "Enrique"
      },
      {
        id : 8,
        name : "Miguel"
      },
      {
        id : 9,
        name : "Lucía"
      },
      {
        id : 10,
        name : "Mari Cruz"
      },
      {
        id : 11,
        name : "Juangui"
      },
      {
        id : 12,
        name : "Damia"
      },
      {
        id : 13,
        name : "Invitado 1"
      },
      {
        id : 14,
        name : "Invitado 2"
      },
      {
        id : 15,
        name : "Invitado 3"
      },
      {
        id : 16,
        name : "Invitado 4"
      }
      ]
    });*/
})

  .controller("MenuController", function($scope, $sessionStorage, $ionicPopover) {
    // Hook session storage to the scope
    $scope.$storage = $sessionStorage;

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.selectPlayer = function(id) {
      //$storage.selectedPlayer = id;
      console.log("Selected player: " + id);
      $scope.$storage.queue.push($scope.$storage.players[id]);
      $scope.popover.hide();
    }

  })

  .directive("playersQueue", function() {
    return {
      restrict : "E",
      templateUrl : "templates/players-queue.html"
    }
  })

  .directive("playersStats", function() {
    return {
      restrict : "E",
      templateUrl : "templates/players-stats.html"
    }
  })

  .directive("scoreboard", function() {
    return {
      restrict : "E",
      templateUrl : "templates/scoreboard.html"
    }
  })