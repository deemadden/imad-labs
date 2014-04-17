var app = angular.module('scavProject', ['ngResource', 'ngRoute'])
  .factory('Scavs', function ($resource) {
    return $resource('http://10.0.1.6:3000/scavhn/v1/api/scavs/:name');
  })
  .config(function ($routeProvider) {
    console.log('Angular Module Configured.');
    $routeProvider
      .when('/', {controller: 'ScavCtrl', templateUrl: 'templates/scavList.html'})
      .when('/detail/:scavName', {controller: 'ScavDetailCtrl', templateUrl: 'templates/scavDetail.html'})
      .otherwise({redirectTo: '/'})
    ;
  });

app.controller('ScavCtrl', ['$scope', 'Scavs', function ($scope, Scavs) {
    $scope.scavs = Scavs.query();
  }])
  .controller('ScavDetailCtrl', function ($scope, $routeParams, Scavs, $q) {

    var d = $q.defer();
    var result = Scavs.query({}, function () {
      d.resolve(result);
    });

    $q.all([d.promise]).then(function (data) {
      $scope.scav = $.grep(data[0], function (e) {
        return e.name == $routeParams.scavName;
      })[0];
    });

    $scope.scavDetail = Scavs.get({name: $routeParams.scavName});

  })
  .directive('scavItem', function () {
    return{
      restrict: 'E',
      template: '<div class="scav-item"><div ng-click="toggleShowHint()">{{ item.itemName }}</div><div class="scav-hint" ng-hide="!showHint">: {{ item.hint }}</div></div>',
      replace: true,
      scope: { item: '=siItem'},
      controller: function ($scope) {
        $scope.toggleShowHint = function () {
          $scope.showHint = !$scope.showHint;
        }
      }
    };
  });

function GreetingsCtrl($scope) {
  $scope.$watch('yourName', function (newVal, oldVal) {
    if (!newVal || newVal === oldVal) {
      return;
    }

    if (newVal === 'IceMan') {
      $scope.specialMessage = 'The IceMan Cometh!!!';
    } else {
      $scope.specialMessage = '';
    }
  });
}