'use strict';

angular.module('frontApp')
    .controller('LoginCtrl', function(authUser){
        var vm = this;
        vm.loginForm = {
            correo: 'ale@gmai.com',
            password: '123'
        };

        vm.login = function () {
            authUser.loginApi(vm.loginForm);
        }


    });
