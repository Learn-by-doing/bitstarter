var express = require('express');
var exphbr = require('express-handlebars');
var serveStatic = require('serve-static');
var app = express();

app.engine('html', exphbr({
	defaultLayout: 'main',
	extname: '.html'
}));

app.set('view engine', 'html');

app.use(serveStatic(__dirname + '/public'));

app.config = require('./config');
require('./controllers')(app);

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});