'use strict';

angular.module('frontApp')
  .factory('MarcaResource', function ($resource) {
      return $resource('http://localhost:8000/marca/:id', {
			id: "@id"
		}, {
			update: {
				method: "PUT",
			}
		});
	});
