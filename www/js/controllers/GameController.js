angular.module('ionicApp')

.controller("GameController", function($scope, $sessionStorage, $ionicPopover, $state, $filter) {
	// Hook session storage to the scope
	$scope.$storage = $sessionStorage;

	$scope.start = function(id) {
		console.log("Start game");
	}

	$scope.reset = function(id) {
		console.log("Reset game");
		$scope.$storage.scoreLocal = 0;
		$scope.$storage.scoreVisitor = 0;
		//$state.go('app.queue.show');
	}

	$scope.end = function() {
		console.log("End game");
		$scope.$storage.scoreLocal = 0;
		$scope.$storage.scoreVisitor = 0;
		$scope.$storage.queue = [];
	}

	$scope.start();
})