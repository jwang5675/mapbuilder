var mongoose = require('mongoose');
mongoose.createConnection('mongodb://heroku_2qbdph92:s7dh5sesuodh0nrvjtivjb91o6@ds115071.mlab.com:15071/heroku_2qbdph92');
var Schema = mongoose.Schema;

var mapSchema = new Schema({
  mapname: { type: String, required: true, unique: true },
  mapdata: { type: [], required: true }
});

mapSchema.statics.addMap = function (mapname, mapdata, cb) {
  var newMap = new this({ mapname: mapname, mapdata: mapdata});
  newMap.save(cb);
};

mapSchema.statics.rewriteMap = function (mapname, mapdata, cb) {
  this.findOne({ mapname: mapname }, function (err, map) {
    if (!map) cb('no map');
    else {
      map.mapdata = mapdata;
      map.save (function (err) {
        if (err) { 
          cb(err);
        }
      });
    }
  });
};

mapSchema.statics.getMap = function (mapname, cb) {
  this.findOne({mapname: mapname}, function (err, map) {
    if (err) {
      cb(err);
    }
    if (!map) { 
      cb('no map data' + mapname); 
    }
    if (map) {
      cb(null, map.mapdata);
    }
  });
};

module.exports = mongoose.model('Maps', mapSchema);