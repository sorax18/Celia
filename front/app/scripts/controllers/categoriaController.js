'use strict';

angular.module('frontApp')
  .controller('IndexCategoriaController', function ($scope, $location, toastr, CategoriaResource, $timeout) {
    var vm = this;
    $scope.currentPage = 1;
    $scope.pageSize =6;
    $scope.menuTemplate = {
      url: 'views/menuAdmin.html'
    };
    $scope.Categorias = CategoriaResource.query();
    $scope.removeCategoria = function (id) {
        CategoriaResource.delete({ id: id});
        toastr.success("Categoria eliminada", "Mensaje");
        $timeout(function () {
            $location.path("/categoria/");
        }, 500);
    };

  })
  .controller('CrearCategoriaController', function ($scope, $location, toastr, CategoriaResource, $timeout, Upload) {
      $scope.boton = 'Crear';
      $scope.titulo = 'Crear Categoria';
      $scope.categoria = {};

      $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'http://localhost:8000/categoria',
        data: {nombreCategoria: $scope.categoria.nombreCategoria, file: file},
      });

      toastr.success("Categoria creada correctamente", "Mensaje");
      $timeout(function () {
          $location.path("/categoria");
      }, 1000);
    };






      $scope.saveCategoria = function () {
        CategoriaResource.save($scope.categoria);
        toastr.success("Categoria creada correctamente", "Mensaje");
        $timeout(function () {
            $location.path("/categoria");
        }, 1000);
      };

  })
  .controller('ActualizarCategoriaCtrl', function ($scope, CategoriaResource, toastr, $location, $routeParams, $timeout, Upload) {
    
      $scope.categoria = CategoriaResource.get({
        id: $routeParams.id
      });
      $scope.boton = "Actualizar";
      $scope.titulo = "Actualizar";

      var url= 'http://localhost:8000/categoria/' + $routeParams.id;
      $scope.uploadPic = function(file) {
      if (!file) {
        CategoriaResource.update({id:$scope.categoria.idCategoria }, $scope.categoria);
        toastr.success("Categoria actualizada", "Mensaje");
        $timeout(function () {
            $location.path("/categoria");
        }, 1000);
      }
      else {
        file.upload = Upload.upload({
          url: url,
          data: {nombreCategoria: $scope.categoria.nombreCategoria, file: file},
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
        toastr.success("Categoria actualizada", "Mensaje");
        $timeout(function () {
            $location.path("/categoria");
        }, 1000);
      }

    };



  });
