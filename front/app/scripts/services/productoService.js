'use strict';

angular.module('frontApp')
  .factory('ProductoResource', function ($resource) {
      return $resource('http://localhost:8000/producto/:id', {
			id: "@id"
		}, {
			update: {
				method: "PUT",
			}
		});
	});
