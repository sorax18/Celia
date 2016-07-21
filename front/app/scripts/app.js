'use strict';

/**
 * @ngdoc overview
 * @name frontApp
 * @description
 * # frontApp
 *
 * Main module of the application.
 */
angular
  .module('frontApp', [
    'authService',
    'ui.bootstrap',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'toastr',
    'ngFileUpload'
  ])
  .config(function ($routeProvider, $authProvider) {
    $authProvider.loginUrl = 'http://localhost:8000/auth_login';
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
      })
      .when('/registrar',{
        templateUrl: 'views/registrar.html',
        controller: 'RegistrarCtrl',
        controllerAs: 'registrar'
      })
      .when('/usuario',{
        templateUrl: 'views/usuario.html',
        controller: 'UsuarioCtrl',
        controllerAs: 'usuario'
      })
      .when('/usuario/crear',{
        templateUrl: 'views/crearUser.html',
        controller: 'CrearCtrl',
        controllerAs: 'crea'
      })
      .when('/usuario/actualizar/:id',{
        templateUrl: 'views/crearUser.html',
        controller: 'ActualizarCtrl',
        controllerAs: 'actualizar'
      })
      .when('/categoria',{
        templateUrl: 'views/categorias.html',
        controller: 'IndexCategoriaController',
        controllerAs: 'categoria'
      })
      .when('/categoria/crear',{
        templateUrl: 'views/crearCategoria.html',
        controller: 'CrearCategoriaController',
        controllerAs: 'CrearCategoria'
      })
      .when('/categoria/actualizar/:id',{
        templateUrl: 'views/crearCategoria.html',
        controller: 'ActualizarCategoriaCtrl',
        controllerAs: 'CategoriaActualizar'
      })
      .when('/marca',{
        templateUrl: 'views/marca.html',
        controller: 'IndexmarcaController',
        controllerAs: 'marca'
      })
      .when('/marca/crear',{
        templateUrl: 'views/crearMarca.html',
        controller: 'CrearmarcaController',
        controllerAs: 'Crearmarca'
      })
      .when('/marca/actualizar/:id',{
        templateUrl: 'views/crearMarca.html',
        controller: 'ActualizarmarcaCtrl',
        controllerAs: 'marcaActualizar'
      })
      .when('/producto',{
        templateUrl: 'views/producto.html',
        controller: 'IndexProductoController',
        controllerAs: 'producto'
      })
      .when('/producto/crear',{
        templateUrl: 'views/crearProducto.html',
        controller: 'CrearProductoController',
        controllerAs: 'crearProducto'
      })
      .when('/producto/actualizar/:id',{
        templateUrl: 'views/crearProducto.html',
        controller: 'ActualizarProductoCtrl',
        controllerAs: 'productoActualizar'
      })
      .when('/departamentos',{
        templateUrl: 'views/departamentos.html',
        controller: 'IndexDepartamento',
        controllerAs: 'departamento'
      })
      .when('/departamentos/:id',{
        templateUrl: 'views/departamento.html',
        controller: 'BuscarDepartamento',
        controllerAs: 'Bdepartamento'
      })
      .when('/departamentos/:ed/:id',{
        templateUrl: 'views/verProducto.html',
        controller: 'Productofinal',
        controllerAs: 'Pfinal'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, authUser, toastr){
      var rutasPrivada = ['/about'];

      $rootScope.$on('$routeChangeStart',function () {
        //compara las dos rutas la actual y las privadas si son iguales devolver al login
        if (($.inArray($location.path(), rutasPrivada) !== -1) && !authUser.isLoggedIn()) {
          toastr.error('Debe iniciar sesion para continuar', 'Mensaje');
          $location.path('/login');
        }
      });
  })
.filter('startFrom',function () {
    return function (data, start) {
      return data.slice(start);
    };
  });


//acceso de acuerdo con login
