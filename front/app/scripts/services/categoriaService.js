'use strict';

angular.module('frontApp')
  .factory('CategoriaResource', function ($resource) {
      return $resource('http://localhost:8000/categoria/:id', {
			id: "@id"
		}, {
			update: {
				method: "PUT",
			}
		});
	});
