var express = require("express");
var handlebars = require('express-handlebars');
var ss = require('serve-static');
var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* ROUTES */

// public
app.use(ss(__dirname + '/public'));


// homepage
app.get('/', function (req, res) {
    res.render('home');
});










app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});