angular.module('ionicApp')

.controller("GameController", function($scope, $sessionStorage, $ionicPopover, $state, $filter) {
	// Hook session storage to the scope
	$scope.$storage = $sessionStorage;

	$scope.start = function(id) {
		console.log("Start game");
	}

	$scope.reset = function(id) {
		console.log("Reset game");
		// Filter array removing selected player
		//$scope.$storage.queue = $filter('filter')($scope.$storage.queue, {id: "!" + id});
		//$state.go('app.queue.show');
	}

	$scope.end = function() {
		console.log("End game");
	}

	$scope.start();
})