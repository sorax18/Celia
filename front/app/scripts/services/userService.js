'use strict';

angular.module('frontApp')
  .factory('UsuarioResource', function ($resource) {
      return $resource('http://localhost:8000/registro/:id', {
			id: "@id"
		}, {
			update: {
				method: "PUT",
			}
		});
	});
