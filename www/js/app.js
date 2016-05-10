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
    .state('app.queue', {
      url: "/queue",
      abstract: true,
      views: {
        'tab-queue': {
          templateUrl: "templates/tab-queue.html"
        }
      }
    })
    .state('app.queue.show', {
      url: "/show",
      views: {
        'tab-queue-content': {
          templateUrl: "templates/tab-queue-show.html",
          controller: 'MenuController'
        }
      }
    })
    .state('app.queue.add', {
      url: "/add",
      views: {
        'tab-queue-content': {
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

    $urlRouterProvider.otherwise("/app/queue/show");

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
      $state.go('app.queue.show')
    }

  })

  .directive("scoreboard", function() {
    return {
      restrict : "E",
      templateUrl : "templates/scoreboard.html"
    }
  })