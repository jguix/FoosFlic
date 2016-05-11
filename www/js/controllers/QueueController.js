angular.module('ionicApp')

.controller("QueueController", function($scope, $sessionStorage, $ionicPopover, $state, $filter) {
	// Hook session storage to the scope
	$scope.$storage = $sessionStorage;

	$scope.checkin = function(id) {
		console.log("Selected player: " + id);
		$scope.$storage.queue.push($scope.$storage.players[id]);
		$state.go('app.queue.show');
	}

	$scope.checkout = function(id) {
		console.log("Selected player: " + id);
		// Filter array removing selected player
		$scope.$storage.queue = $filter('filter')($scope.$storage.queue, {id: "!" + id});
		$state.go('app.queue.show');
	}

	$scope.notPlaying = function() {
		var list = $scope.$storage.players;

		var result = list.filter(function(item1) {
			for (var i in $scope.$storage.queue) {
		    	if (item1.id === $scope.$storage.queue[i].id) { return false; }
			};
			return true;
		});
		return result;
	}

})