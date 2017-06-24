// app.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var apiKey = require('./data/apiKey.js');
var key = apiKey.key;

// configuration ===========================================
// set our port
var port = process.env.PORT || 8080;

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

var homeURL = 'http://api.brewerydb.com/v2/';
// routes ==================================================
app.get('/beer/:beerId', function (req, res) {
  var beerId = req.params.beerId;
  var URL = homeURL + 'beer/' + beerId + '/?key=' + key;
  http.get(URL, function (response) {
    res.set('format', 'json');
    response.pipe(res);
  });
}); // configure our routes

app.listen(port);
console.log('Magic happens on port ' + port);
