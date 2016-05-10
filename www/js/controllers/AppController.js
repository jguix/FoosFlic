angular.module('ionicApp')

.controller('AppController', function($scope, $sessionStorage, $http) {
//$ionicSideMenuDelegate.toggleLeft();
// Hook session storage to the scope
//$scope.$storage = $sessionStorage;

// Load default data
$http.get('json/defaults.json').success(function (data) {
	$scope.$storage = $sessionStorage.$default(data);
});

})
