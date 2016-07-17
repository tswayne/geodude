'use strict';

const Hapi = require('hapi');
const init = require('./src/init');
const spiderweb = require('spiderweb-client');


const server = new Hapi.Server();
spiderweb.setupConfig(function(err, config) {
  if (err) {
    throw err;
  }

  server.connection({
    host: config.geodude.host,
    port: config.geodude.port
  });
  init.bootstrap(server, function () {
    // Start the server
    server.start((err) => {

      if (err) {
        throw err;
      }

      console.log('Server running at:', server.info.uri);
    });
  });
});
