var orm = require("orm");
const spiderweb = require('spiderweb-client');


module.exports.connect = function(callback) {
  const config = spiderweb.getConfig();
  orm.connect(config.geodudeDb, function (err, db) {
    if (err) throw err;

    var Map = db.define("maps", {
      id: {type: 'serial', key: true},
      width     : Number,
      height    : Number
    }, {
      autoFetch: true
    });

    var Territory = db.define("territories", {
      id: {type: 'serial', key: true},
      svgString     : {type: 'text', size: 1000}
    });


    Territory.hasOne('map', Map, {reverse: 'territories'});
    // add the table to the database
    db.sync(function(err) {
      if (err) throw err;

      module.exports.Map = Map;
      module.exports.Territory = Territory;

      callback(null, db)
    });
  });

};
