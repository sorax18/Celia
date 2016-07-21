'use strict';

angular.module('frontApp')
.controller('IndexDepartamento', function ($scope, $location, toastr, CategoriaResource, $timeout, ProductoResource, authUser,sessionControl) {
$scope.departamentos = CategoriaResource.query();
var vm = this;
if (authUser.isLoggedIn()) {
  if (!sessionControl.get('administrador')) {

    vm.menuTemplate = {
      url: 'views/menuDepaLog.html'

    };
  }


}
else {
  vm.menuTemplate = {
    url: 'views/menuDepa.html'
  };
}



})
.controller("BuscarDepartamento", function (DepartamentoResource, $scope, $routeParams,CategoriaResource,authUser,sessionControl) {
  $scope.currentPage = 1;
  $scope.pageSize =6;
$scope.departamentos = CategoriaResource.query();
$scope.productos = DepartamentoResource.query({
  id: $routeParams.id
});

console.log($scope.productos);




var vm = this;
if (authUser.isLoggedIn()) {
  if (!sessionControl.get('administrador')) {

    vm.menuTemplate = {
      url: 'views/menuDepaLog.html'

    };
  }


}
else {
  vm.menuTemplate = {
    url: 'views/menuDepa.html'
  };
}
})
.controller('Productofinal', function ( $scope, $routeParams,DepartamentoResource,authUser,sessionControl,  ProductoResource,$location,toastr) {
  var vm = this;
    $scope.factura ={};
  if (authUser.isLoggedIn()) {
    if (!sessionControl.get('administrador')) {

      vm.menuTemplate = {
        url: 'views/menuDepaLog.html'

      };
    }


  }
  else {
    vm.menuTemplate = {
      url: 'views/menuDepa.html'
    };
  }

  $scope.productos = ProductoResource.query({
    id: $routeParams.id
  });

$scope.AgregarCarro = function (producto) {
  if(!sessionControl.get('admin')){
    toastr.warning('Debe iniciar sesion para agregar items al carrito','Mensaje');
    $location.path('/login');
  }
  else {
    $scope.factura.idProducto = producto;
    $scope.factura.idUsuario = sessionControl.get('idUsuario');
    DepartamentoResource.save($scope.factura);

  }

};

});
