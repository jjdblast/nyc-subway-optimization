var express = require('express');
var QueryHandler = require('./queries');

var router = express.Router();

router.post('/api/cluster', function(req, res, next) {
  console.log('POST request to ' + req.url + ' Station: ' + req.body.id);
  console.log(req.body)
  QueryHandler.get_cluster(req.body.lat, req.body.lng, 10, function(rows) {
  	res.json({cluster: rows, raster: 10});
  });
});

router.post('/api/clusterFiltered', function(req, res, next) {
  console.log('POST request to ' + req.url);
  console.log(req.body);
  var result = QueryHandler.get_cluster();
  res.json();
});

module.exports = router;
