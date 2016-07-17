'use strict';

const mapGenerator = require('map-gen');
const connection = require('../../init/database');
const async = require('async');

const serialize = function(mapDbObject) {
  const territories = mapDbObject.territories.map(function(territory) {
    return {id: territory.id, svgString: territory.svgString}
  });
  return {id: mapDbObject.id, territories: territories};
}

module.exports.create = {
  handler: function (request, reply) {
    var Map = connection.Map;
    var Territory = connection.Territory;
    var map = mapGenerator.generateMap({});
    var resp = {};
    Map.create({width: map.width, height: map.height}, function(err, mapDbObject) {
      if (err) {throw err;}
      resp = {id: mapDbObject.id, territories: []};

      async.each(map.regions, function(region, callback) {
        Territory.create({svgString: region.pathString, map_id: mapDbObject.id}, function(err, LocDbObj) {
          if (err) {callback(err);}
          resp.territories.push({id: LocDbObj.id, svgString: region.pathString});
          callback()
        })
      }, function(err) {
        if (err) {throw err;}
        return reply(resp);
      })
    });
  }
};

module.exports.get = {
  handler: function (request, reply) {
    var Map = connection.Map;
    Map.one({id: request.params.id}, function(err, mapDbObject) {
      return reply(serialize(mapDbObject))
    });
  }
};
