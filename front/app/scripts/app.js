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
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'toastr'
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
  });


//acceso de acuerdo con login
