'use strict';

angular.module('frontApp')
  .controller('RegistrarCtrl', function ($scope, UsuarioResource, toastr, $location) {

      $scope.usuario = {};
      $scope.saveUser = function () {
          //

          if ($scope.usuario.password !== "" && $scope.usuario.confirmPass !== "" ) {
              if ($scope.usuario.password !== $scope.usuario.confirmPass ) {
                  toastr.error('Las contraseñas no son iguales', 'Mensaje');
              }
              else {
                  UsuarioResource.save($scope.usuario);
                  toastr.success("Usuario creado correctamente", "Mensaje");
                  $location.path("/login");
              }
          }
      };

  });
