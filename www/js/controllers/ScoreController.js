angular.module('ionicApp')

.controller("ScoreController", function($scope, $sessionStorage) {
    // Hook session storage to the scope
    $scope.$storage = $sessionStorage;
})