'use strict';

angular.module('frontApp')
  .controller('IndexProductoController', function ($scope, $location, toastr, ProductoResource, $timeout) {
    var vm = this;
    $scope.currentPage = 1;
    $scope.pageSize =6;
    $scope.menuTemplate = {
      url: 'views/menuAdmin.html'
    };
    $scope.productos = ProductoResource.query();

    $scope.removeProducto = function (id) {
        ProductoResource.delete({ id: id});
        toastr.success("Producto eliminada", "Mensaje");
        $timeout(function () {
            $location.path("/producto/");
        }, 500);
    };

  })
  .controller('CrearProductoController', function ($scope, $location, toastr, ProductoResource, $timeout, Upload, CategoriaResource, MarcaResource) {
      $scope.boton = 'Crear';
      $scope.titulo = 'Crear Producto';
      $scope.producto = {};
      $scope.categorias = CategoriaResource.query();
      $scope.marcas = MarcaResource.query();
      console.log($scope.producto.nombreCategoria);
      $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'http://localhost:8000/producto',
        data: {nombreProducto: $scope.producto.nombreProducto, precio:$scope.producto.precio, cantidad:$scope.producto.cantidad,
          impuesto: $scope.producto.impuesto, descripcion: $scope.producto.descripcion, idCategoria: $scope.producto.idCategoria,
          idMarca: $scope.producto.idMarca, file: file},
      });

      toastr.success("Producto creada correctamente", "Mensaje");
      $timeout(function () {
          $location.path("/producto");
      }, 1000);
    };






      $scope.saveProducto = function () {
        ProductoResource.save($scope.Producto);
        toastr.success("Producto creada correctamente", "Mensaje");
        $timeout(function () {
            $location.path("/producto");
        }, 1000);
      };

  })
  .controller('ActualizarProductoCtrl', function ($scope, ProductoResource, toastr, $location, $routeParams,Upload, $timeout,CategoriaResource, MarcaResource) {
      $scope.producto = ProductoResource.get({
        id: $routeParams.id
      });
      $scope.boton = "Actualizar";
      $scope.titulo = "Actualizar";
      $scope.categorias = CategoriaResource.query();
      $scope.marcas = MarcaResource.query();
      var url= 'http://localhost:8000/producto/' + $routeParams.id;
      $scope.uploadPic = function(file) {
      if (!file) {
        ProductoResource.update({id:$scope.producto.idProducto }, $scope.producto);
        toastr.success("Producto actualizada", "Mensaje");
        $timeout(function () {
            $location.path("/producto");
        }, 1000);
      }
      else {
        file.upload = Upload.upload({
          url: url,
          data: {nombreProducto: $scope.Producto.nombreProducto, file: file},
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
        toastr.success("Producto actualizada", "Mensaje");
        $timeout(function () {
            $location.path("/producto");
        }, 1000);
      }

    };









  });
