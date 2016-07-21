'use strict';

angular.module('frontApp')
  .factory('DepartamentoResource', function ($resource) {
      return $resource('http://localhost:8000/departamento/:id', {
			id: "@id"
		}, {
			update: {
				method: "PUT",
			}
		});
	});
