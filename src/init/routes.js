'use strict';
const mapController = require('../app/controllers/mapController');

module.exports.setupRoutes = function(server) {
  server.route([
    {method: 'POST',  path: '/map/create', config: mapController.create},
    {method: 'GET',  path: '/map/{id}', config: mapController.get}
  ]);
};
