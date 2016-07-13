'use strict';

angular.module('frontApp')
  .controller('MenuCtrl', function (authUser, $location, $scope, sessionControl) {
    var vm = this;

    vm.isLogIn = authUser.isLoggedIn();

    $scope.$watch(function () {
      return authUser.isLoggedIn();
    },
    function (newValue) {
      if (typeof newValue !== 'undefined') {
        vm.isLogIn = authUser.isLoggedIn();
      }
    }
  );

    vm.user = {
      email: sessionControl.get('correo'),
      name : sessionControl.get('nombre1') + ' '+ sessionControl.get('apellido1'),
      avatar: sessionControl.get('nombre1')
      //aqui va el avatar
    };

    $scope.$watch(function(){
            return sessionControl.get('correo');
        }, function (newVal) {
            if (typeof newVal !== 'undefined') {
                vm.user.email = sessionControl.get('correo');
            }

        });


        $scope.$watch(function(){
            return sessionControl.get('nombre1') + ' '+ sessionControl.get('apellido1');
        }, function (newVal) {
            if (typeof newVal !== 'undefined') {
                vm.user.name = sessionControl.get('nombre1') + ' '+ sessionControl.get('apellido1');
            }

        });
    vm.logout = function () {
      authUser.logout();
    };

    vm.isActive = function (viewLocation) {
      return viewLocation  === $location.path();// si la direccion es igual devuelve true sino false
    };
  });
