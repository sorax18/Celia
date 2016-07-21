'use strict';

angular.module('frontApp')
  .factory('CarritoResource', function ($resource) {
      return $resource('http://localhost:8000/carrito/:id', {
			id: "@id"
		}, {
			update: {
				method: "PUT",
			}
		});
	});
