'use strict';//iniciacion de angular
//no se va a inyectar nada por eso un array vacio
angular.module('authService', [])

//sesion
.factory('sessionControl',function () {
  return{
    get: function (key) {
        return sessionStorage.getItem(key);
    },
    set: function (key, value) {
      return sessionStorage.setItem(key,value);
    },
    unset: function (key) {
        return sessionStorage.removeItem(key);
    }
  };

})

  //autorizacion
  .factory('authUser', function ($auth, sessionControl, toastr, $location){
    var cache = function (correo, nombre1, apellido1, admin) {
        sessionControl.set('userIsLogin', true);
        sessionControl.set('correo', correo);
        sessionControl.set('nombre1', nombre1);
        sessionControl.set('apellido1', apellido1);
        sessionControl.set('admin', admin);

    };

    var unCacheSession = function () {
      sessionControl.unset('userIsLogin');
      sessionControl.unset('correo');
      sessionControl.unset('nombre1');
      sessionControl.unset('apellido1');
      sessionControl.unset('admin');
    };

    var login = function (loginForm) {
           $auth.login(loginForm).then(
               function (response) {
                   if(typeof response.data.user !== 'undefined'){
                     cache(response.data.user.correo, response.data.user.nombre1, response.data.user.apellido1, response.data.user.administrador);
                      if (response.data.user.administrador === 1) {
                        $location.path('/usuario');
                        toastr.success('Sesión iniciada con éxito', 'Mensaje');
                      }
                      else {
                        $location.path('/');
                        toastr.success('Sesión iniciada con éxito', 'Mensaje');
                      }
                   }
                   else {

                   }
               },
               function (error) {
                   unCacheSession();
                   if(error.data.error === 'invalid_credential') {
                       toastr.error('Usuario o contraseña incorrectos.', 'Error');
                   }
               }
           );
       };

    return {
      loginApi: function(loginForm){
        login(loginForm);
      },

      logout: function () {
        $auth.logout();
        unCacheSession();
        toastr.success('se finalizado sesion','Mensaje');
        $location.path('/login');
      },

      isLoggedIn: function () {
        return  sessionControl.get('userIsLogin') !== null;
      }
    };
  });
