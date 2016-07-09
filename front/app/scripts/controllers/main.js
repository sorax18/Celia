'use strict';

/**
 * @ngdoc function
 * @name frontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontApp
 */
angular.module('frontApp')
  .controller('MainCtrl', function () {
    var vm = this;
    vm.menuTemplate = {
      url: 'views/menu.html'
    };
  });
