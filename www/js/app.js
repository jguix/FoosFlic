// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// @See https://github.com/gsklee/ngStorage
angular.module('ionicApp', ['ionic', 'ngStorage', 'ngFlic'])

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
                controller: 'QueueController'
            }
        }
    })
    .state('app.queue.checkin', {
        url: "/ckeckin",
        views: {
            'tab-queue-content': {
                templateUrl: "templates/tab-queue-checkin.html",
                controller: 'QueueController'
            }
        }
    })
    .state('app.queue.checkout', {
        url: "/ckeckout",
        views: {
            'tab-queue-content': {
                templateUrl: "templates/tab-queue-checkout.html",
                controller: 'QueueController'
            }
        }
    })
    .state('app.stats', {
        url: "/stats",
        views: {
            'tab-stats': {
                templateUrl: "templates/tab-stats.html",
                controller: 'GameController'
            }
        }
    })
    .state('app.controllers', {
        url: "/controllers",
        views: {
            'tab-controllers': {
                templateUrl: "templates/tab-controllers.html",
                controller: 'FlicController'
            }
        }
    })

    $urlRouterProvider.otherwise("/app/queue/show");

})
