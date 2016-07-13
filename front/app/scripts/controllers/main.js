'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('MainCtrl', function (authUser,sessionControl) {
    var vm = this;
    if (authUser.isLoggedIn()) {
      if (!sessionControl.get('administrador')) {

        vm.menuTemplate = {
          url: 'views/menulog.html'

        };
      }


    }
    else {
      vm.menuTemplate = {
        url: 'views/menu.html'
      };
    }
    vm.footerTemplate = {
      url:'views/footer.html'
    };

  });
