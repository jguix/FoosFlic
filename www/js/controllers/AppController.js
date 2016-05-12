angular.module('ionicApp')

.controller('AppController', function($scope, $sessionStorage, $http) {
	// Hook session storage to the scope and load default data
	$http.get('json/defaults.json').success(function (data) {
		$scope.$storage = $sessionStorage.$default(data);
	});

})
