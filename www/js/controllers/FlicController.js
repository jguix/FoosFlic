angular.module('ionicApp')

.controller("FlicController", function($scope, $sessionStorage, $rootScope, $ionicPlatform, $timeout, $cordovaFlic) {
	// Hook session storage to the scope
	$scope.$storage = $sessionStorage;
  $scope.status = 'Esperando evento platform ready...';

	$ionicPlatform.ready(function() {

    var appId = "dbcce1f9-c4b9-41c1-89fb-2f36c8577706";
    var appSecret = "f17c4448-093b-4ba8-951a-bb40113b1900";
    var appName = "Table Football";

    $scope.status = 'Iniciando flic...';
    $scope.buttons = [];

    $scope.grabButton = function() {
      $scope.status = 'Obteniendo boton...';
      $cordovaFlic.grabButton().then(function(button) {
        $scope.status = 'Boton obtenido.';
        $scope.buttons.push(button);
      }, function(error) {
        $scope.status = 'GrabButton error: ' + error;
      });
    }

    $cordovaFlic.init(appId, appSecret, appName).then(function(result) {
      $scope.status = 'Flic init OK.\nObteniendo botones conocidos...';

        $cordovaFlic.getKnownButtons().then(function(buttons) {
          $scope.status = 'Obtenidos ' + (buttons.length > 0 ? buttons.length : '0') + ' botones.';
          buttons.forEach(function(button) {
            $scope.buttons.push(button);
          });
        }, function(error) {
          $scope.status = 'GetKnownButtons error: ' + error;
        });

    }, function(error) {
      $scope.status = 'Flic init error: ' + error;
    });

    $rootScope.$on('$cordovaFlic:flicButtonClick', function (event, data) {
      $scope.status = data.color + ' button received ' + data.type + ' event.';
    });

    $rootScope.$on('$cordovaFlic:flicButtonDblClick', function (event, data) {
      $scope.status = data.color + ' button received ' + data.type + ' event.';
    });

    $rootScope.$on('$cordovaFlic:flicButtonHold', function (event, data) {
      $scope.status = data.color + ' button received ' + data.type + ' event.';
    });

  }, false);


})