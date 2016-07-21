'use strict';

angular.module('frontApp')
  .controller('IndexmarcaController', function ($scope, $location, toastr, MarcaResource, $timeout) {
    $scope.currentPage = 1;
    $scope.pageSize =6;
    var vm = this;
    $scope.menuTemplate = {
      url: 'views/menuAdmin.html'
    };
    $scope.Marcas = MarcaResource.query();
    $scope.removemarca = function (id) {
        MarcaResource.delete({ id: id});
        toastr.success("Marca eliminada", "Mensaje");
        $timeout(function () {
            $location.path("/marca/");
        },1000);
    };

  })
  .controller('CrearmarcaController', function ($scope, $location, toastr, MarcaResource, $timeout, Upload) {
      $scope.boton = 'Crear';
      $scope.titulo = 'Crear Marca';
      $scope.marca = {};

      $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'http://localhost:8000/marca',
        data: {nombreMarca: $scope.marca.nombreMarca, file: file},
      });

      toastr.success("marca actualizada", "Mensaje");
      $timeout(function () {
          $location.path("/marca");
      }, 1000);
    };





  })
  .controller('ActualizarmarcaCtrl', function ($scope, MarcaResource, toastr, $location, $routeParams, $timeout, Upload) {
      $scope.marca = MarcaResource.get({
        id: $routeParams.id
      });
      $scope.boton = "Actualizar";
      $scope.titulo = "Actualizar";
      var url= 'http://localhost:8000/marca/' + $routeParams.id;
      $scope.uploadPic = function(file) {
      if (!file) {
        MarcaResource.update({id:$scope.marca.idMarca }, $scope.marca);
        toastr.success("marca actualizada", "Mensaje");
        $timeout(function () {
            $location.path("/marca");
        }, 1000);
      }
      else {
        file.upload = Upload.upload({
          url: url,
          data: {nombreMarca: $scope.marca.nombreMarca, file: file},
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
        toastr.success("marca actualizada", "Mensaje");
        $timeout(function () {
            $location.path("/marca");
        }, 1000);
      }

    };




  });
