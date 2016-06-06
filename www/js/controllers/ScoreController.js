angular.module('ionicApp')

.controller("ScoreController", function($scope, $rootScope, $sessionStorage) {
    // Hook session storage to the scope
    $scope.$storage = $sessionStorage;
    var cancelState;

    $scope.localGoal = function() {
    	// Save state just in case someone press the cancel button
    	saveState();
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
    		localWon();
    		// Reset scores
    		resetScores();
    	}
    }

    $scope.visitorGoal = function() {
    	// Save state just in case someone press the cancel button
    	saveState();
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
    		visitorWon();
    		// Reset scores
    		resetScores();
    	}
    }

    $scope.cancel = function() {
    	console.log("Cancelar");
    	// Restore last state
    	restoreState();
    }

    var localWon = function() {
    	// Take players 3 and 4 and push them to the end
		var team = $scope.$storage.queue.splice(2, 2);
		$scope.$storage.queue.push(team[0]);
		$scope.$storage.queue.push(team[1]);
    }

    var visitorWon = function() {
    	// Rotate the queue 2 positions
    	$scope.$storage.queue.push($scope.$storage.queue.shift());
    	$scope.$storage.queue.push($scope.$storage.queue.shift());
    	// Take players 3 and 4 and put them on number 1 and 2
    	var team = $scope.$storage.queue.splice(2, 2);
    	$scope.$storage.queue.unshift(team[1]);
    	$scope.$storage.queue.unshift(team[0]);
    }

    var resetScores = function () {
		$scope.$storage.scoreLocal = 0;
		$scope.$storage.scoreVisitor = 0;
    }

    var saveState = function() {
    	$scope.$storage.backup = {};
    	$scope.$storage.backup.scoreLocal = $scope.$storage.scoreLocal;
    	$scope.$storage.backup.scoreVisitor = $scope.$storage.scoreVisitor;
    	$scope.$storage.backup.queue = angular.copy($scope.$storage.queue);
    	$scope.$storage.backup.players = angular.copy($scope.$storage.players);
    }

    var restoreState = function() {
    	$scope.$storage.scoreLocal = $scope.$storage.backup.scoreLocal;
    	$scope.$storage.scoreVisitor = $scope.$storage.backup.scoreVisitor;
    	$scope.$storage.queue = angular.copy($scope.$storage.backup.queue);
    	$scope.$storage.players = angular.copy($scope.$storage.backup.players);
    }

    $rootScope.$on('$cordovaFlic:flicButtonClick', function (event, data) {
    	if (data.color === 'green') {
    		$scope.localGoal();
    	} else {
    		$scope.visitorGoal();
    	}
    });

})