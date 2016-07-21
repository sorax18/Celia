'use strict';

angular.module('frontApp')
  .controller('CrearCtrl', function ($scope, UsuarioResource, toastr, $location,$timeout, Upload) {
    $scope.usuario = {};
    $scope.boton = "Registrar";
    $scope.titulo = "Crear";
    $scope.actualiza = false;

    $scope.uploadPic = function(file) {

      if ($scope.usuario.password !== $scope.usuario.confirmPass ) {
          toastr.error('Las contraseñas no son iguales', 'Mensaje');
      }
      else {
          if (!file) {
            UsuarioResource.save($scope.usuario);
            toastr.success("Usuario creado correctamente", "Mensaje");
                    $timeout(function () {
                        $location.path("/usuario");
                    }, 1000);

          }
          else {
            file.upload = Upload.upload({
              url: 'http://localhost:8000/registro',
              data: {idUsuario: $scope.usuario.idUsuario, nombre1:$scope.usuario.nombre1 ,
                nombre2:$scope.usuario.nombre2, apellido1: $scope.usuario.apellido1, apellido2:$scope.usuario.apellido2,
                telefono: $scope.usuario.telefono, zip: $scope.usuario.zip, correo: $scope.usuario.correo,
                password:  $scope.usuario.password, direccion:$scope.usuario.direccion, file: file},
            });
            file.upload.then(function (response) {
              $timeout(function () {
                file.result = response.data;
              });
            }, function (response) {
              if (response.status > 0){
                  $scope.errorMsg = response.status + ': ' + response.data;
              }

            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
    toastr.success("Usuario creado correctamente", "Mensaje");
            $timeout(function () {
                $location.path("/usuario");
            }, 1000);
          }



      }

    };


  })
  .controller('UsuarioCtrl', function ($scope, UsuarioResource, toastr, $location,$timeout) {
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
        $timeout(function () {
            $location.path("/usuario/");
        }, 1000);
    };
  })
  .controller('ActualizarCtrl', function ($scope, UsuarioResource, toastr, $location, $routeParams,$timeout, Upload) {
      $scope.usuario = UsuarioResource.get({
        id: $routeParams.id
      });
      $scope.boton = "Actualizar";
      $scope.titulo = "Actualizar";
      $scope.actualiza = true;
      var url= 'http://localhost:8000/registro/' + $routeParams.id;
      $scope.uploadPic = function(file) {

        if ($scope.usuario.password !== $scope.usuario.confirmPass ) {
            toastr.error('Las contraseñas no son iguales', 'Mensaje');
        }
        else {
            if (!file) {
              UsuarioResource.update({id:$scope.usuario.idUsuario }, $scope.usuario);
              toastr.success("Usuario creado correctamente", "Mensaje");
                      $timeout(function () {
                          $location.path("/usuario");
                      }, 1000);

            }
            else {
              file.upload = Upload.upload({
                method: 'PUT',
                url: url,
                data: {idUsuario: $scope.usuario.idUsuario, nombre1:$scope.usuario.nombre1 ,
                  nombre2:$scope.usuario.nombre2, apellido1: $scope.usuario.apellido1, apellido2:$scope.usuario.apellido2,
                  telefono: $scope.usuario.telefono, zip: $scope.usuario.zip, correo: $scope.usuario.correo,
                  password:  $scope.usuario.password, direccion:$scope.usuario.direccion, file: file},
              });
              file.upload.then(function (response) {
                $timeout(function () {
                  file.result = response.data;
                });
              }, function (response) {
                if (response.status > 0){
                  $scope.errorMsg = response.status + ': ' + response.data;
                }

              }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
      toastr.success("Usuario creado correctamente", "Mensaje");
      console.log(file);
              $timeout(function () {
                  $location.path("/usuario");
              }, 1000);
            }



        }

      };








  });
