angular.module('ionicApp')

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