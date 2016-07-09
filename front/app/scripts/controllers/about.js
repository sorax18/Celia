'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('AboutCtrl', function () {
    var vm = this;
    vm.menuTemplate = {
      url: 'views/menu.html'
    };
  });
