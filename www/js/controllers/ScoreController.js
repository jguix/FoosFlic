angular.module('ionicApp')

.controller("ScoreController", function($scope, $sessionStorage) {
    // Hook session storage to the scope
    $scope.$storage = $sessionStorage;

    $scope.localGoal = function() {
    	// Update score
    	$scope.$storage.scoreLocal += 1;
    	// Update players' stats
		$scope.$storage.players[$scope.$storage.queue[0].id].goalsFor += 1;
		$scope.$storage.players[$scope.$storage.queue[1].id].goalsFor += 1;
		$scope.$storage.players[$scope.$storage.queue[2].id].goalsAgainst += 1;
		$scope.$storage.players[$scope.$storage.queue[3].id].goalsAgainst += 1;
		// Check if game is over for visitor
    	if ($scope.$storage.scoreLocal > 1) {
	    	// Update players' stats
			$scope.$storage.players[$scope.$storage.queue[0].id].won += 1;
			$scope.$storage.players[$scope.$storage.queue[1].id].won += 1;
			$scope.$storage.players[$scope.$storage.queue[2].id].lost += 1;
			$scope.$storage.players[$scope.$storage.queue[3].id].lost += 1;
    		// Shift queue 2 places from player with index 2
    		shiftQueue(2);
    		// Reset scores
    		resetScores();
    	}
    }

    $scope.visitorGoal = function() {
    	// Update score
    	$scope.$storage.scoreVisitor += 1;
    	// Update players' stats
		$scope.$storage.players[$scope.$storage.queue[0].id].goalsAgainst += 1;
		$scope.$storage.players[$scope.$storage.queue[1].id].goalsAgainst += 1;
		$scope.$storage.players[$scope.$storage.queue[2].id].goalsFor += 1;
		$scope.$storage.players[$scope.$storage.queue[3].id].goalsFor += 1;
		// Check if game is over for visitor
    	if ($scope.$storage.scoreVisitor > 1) {
	    	// Update players' stats
			$scope.$storage.players[$scope.$storage.queue[0].id].lost += 1;
			$scope.$storage.players[$scope.$storage.queue[1].id].lost += 1;
			$scope.$storage.players[$scope.$storage.queue[2].id].won += 1;
			$scope.$storage.players[$scope.$storage.queue[3].id].won += 1;
    		// Shift queue 2 places from player with index 2
    		shiftQueue(0);
    		// Reset scores
    		resetScores();
    	}
    }

    var shiftQueue = function(startIndex) {
		var id1 = $scope.$storage.queue[startIndex].id;
		var id2 = $scope.$storage.queue[startIndex + 1].id;
		$scope.$storage.queue.splice(startIndex, 2);
		$scope.$storage.queue.push($scope.$storage.players[id1]);
		$scope.$storage.queue.push($scope.$storage.players[id2]);
    }

    var resetScores = function () {
		$scope.$storage.scoreLocal = 0;
		$scope.$storage.scoreVisitor = 0;
    }

})