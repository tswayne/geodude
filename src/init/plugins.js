'use strict';

module.exports.registerPlugins = function(server, callback) {
  server.ext('onRequest', function(request, reply) {
    if (request.headers.from && request.headers['request-id']) {
      const requestId = request.headers['request-id'];
      console.log('Request ' + requestId +': from ' + request.headers.from + ' - ' + request.url.path);
    }
    return reply.continue();
  });

  callback(null);
};
