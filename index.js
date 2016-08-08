var express = require("express");
var handlebars = require('express-handlebars');
var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* ROUTES */

// homepage
app.get('/', function (req, res) {
    res.render('home');
});

// public
app.use('/public', express.static(__dirname + '/public'));







app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});