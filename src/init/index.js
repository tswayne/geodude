const database = require('./database');
const plugins = require('./plugins');
const routes = require('./routes');

module.exports.bootstrap = function(server, callback) {
  plugins.registerPlugins(server, function (err) {
    if (err) {
      throw err;
    }
    database.connect(function(err, _db) {
      if (err) {
        throw err;
      }
      routes.setupRoutes(server);
      return callback();
    });
  });
};
