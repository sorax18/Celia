'use strict';

angular.module('frontApp')
  .controller('CrearCtrl', function ($scope, UsuarioResource, toastr, $location) {
    $scope.usuario = {};
    $scope.boton = "Registrar";
    $scope.titulo = "Crear";
    $scope.actualiza = false;
    $scope.saveUser = function () {
        //

        if ($scope.usuario.password !== "" && $scope.usuario.confirmPass !== "" ) {
            if ($scope.usuario.password !== $scope.usuario.confirmPass ) {
                toastr.error('Las contraseñas no son iguales', 'Mensaje');
            }
            else {
                UsuarioResource.save($scope.usuario);
                toastr.success("Usuario creado correctamente", "Mensaje");
                $location.path("/usuario");
            }
        }
    };
  })
  .controller('UsuarioCtrl', function ($scope, UsuarioResource, toastr, $location) {
    var vm = this;
    vm.menuTemplate = {
      url: 'views/menuAdmin.html'
    };
    $scope.currentPage = 1;
    $scope.pageSize =6;
    $scope.Usuarios = UsuarioResource.query();
    $scope.removeUser = function (id) {
        UsuarioResource.delete({ id: id});
        toastr.success("Usuario eliminado", "Mensaje");
        $location.path("/usuario");
    };
  })
  .controller('ActualizarCtrl', function ($scope, UsuarioResource, toastr, $location, $routeParams) {
      $scope.usuario = UsuarioResource.get({
        id: $routeParams.id
      });
      $scope.boton = "Actualizar";
      $scope.titulo = "Actualizar";
      $scope.actualiza = true;
      $scope.saveUser =function functionName() {
        UsuarioResource.update({id:$scope.usuario.idUsuario }, $scope.usuario);
        toastr.success("Usuario actualizado", "Mensaje");
        $location.path("/usuario");
      }
  });
