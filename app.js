// app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var apiKey = require('./data/keys.js');
var bdbKey = apiKey.bdbKey;
var googleKey = apiKey.googleKey;
var fetch = require('node-fetch');

// configuration ===========================================
// set our port
var port = process.env.PORT || 80;

// parse application/json
app.use(bodyParser.json());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

var homeURL = 'http://api.brewerydb.com/v2/';
// routes ==================================================
app.get('/brewery/:breweryId', function (req, res) {
  var breweryId = req.params.breweryId;
  var URL = homeURL + 'brewery/'+breweryId+'/?key=' + bdbKey;
  fetch(URL)
    .then((resp) => resp.json())
    .then(function(resp) {
      res.send(resp);
    })
    .catch((error) => {
      console.log(error);
 });
});

app.get('/brewery/:breweryId/beers', function (req, res) {
  var breweryId = req.params.breweryId;
  var URL = homeURL + 'brewery/'+breweryId+'/beers?key='+bdbKey;
  fetch(URL)
    .then((resp) => resp.json())
    .then(function(resp) {
      res.send(resp);
    })
    .catch((error) => {
      console.log(error);
 });
});

app.get('/findNearBeer/:lat/:lng', function (req, res) {
  var lat = req.params.lat;
  var lng = req.params.lng;
  var URL = homeURL + 'search/geo/point/?lat='+lat+'&lng='+lng+'&format=json&key='+bdbKey;
  fetch(URL)
    .then((resp) => resp.json())
    .then(function(resp) {
      res.send(resp);
    })
    .catch((error) => {
      console.log(error);
 });
});

app.get('/beer/:beerId', function (req, res) {
  var beerId = req.params.beerId;
  var URL = homeURL + 'beer/' + beerId + '/?key=' + bdbKey;
  fetch(URL)
    .then((resp) => resp.json())
    .then(function(resp) {
      res.send(resp);
    })
    .catch((error) => {
      console.log(error);
 });
});

app.listen(port);
console.log('Beer happens on port ' + port);
