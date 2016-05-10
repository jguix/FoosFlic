angular.module('ionicApp')

.controller("HomeController", function($scope, $sessionStorage) {
    // Hook session storage to the scope
    $scope.$storage = $sessionStorage;
})