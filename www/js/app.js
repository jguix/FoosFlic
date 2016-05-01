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
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/app.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'home' :{
          templateUrl: "templates/home.html",
          controller : "HomeController"
        }
      }
    })
    .state('app.queue', {
      url: "/queue",
      views: {
        'tab-queue': {
          templateUrl: "templates/tab-queue.html",
          controller: 'MenuController'
        }
      }
    })
    .state('app.add', {
      url: "/add",
      views: {
        'tab-queue-add': {
          templateUrl: "templates/tab-queue-add.html",
          controller: 'MenuController'
        }
      }
    })
    .state('app.stats', {
      url: "/stats",
      views: {
        'tab-stats': {
          templateUrl: "templates/tab-stats.html",
          controller: 'MenuController'
        }
      }
    })

    $urlRouterProvider.otherwise("/app/queue");

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
  })

  .controller("MenuController", function($scope, $sessionStorage, $ionicPopover, $state) {
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

    $scope.addPlayer = function(id) {
      //$storage.selectedPlayer = id;
      console.log("Selected player: " + id);
      $scope.$storage.queue.push($scope.$storage.players[id]);
      $state.go('tabs.queue')
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