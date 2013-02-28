var express = require('express')
  , spart 	= require('./lib/spartacus')
  , app     = express()
  , PORT 	= process.argv[2] || 3000
  , sock 	= require('sockjs').createServer()
;

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.logger('dev'));
	app.use(express.static( __dirname + '/public'));
});

sock.on('connection', function(conn){
	conn.on('data', function(message){
		conn.write(message);
	});
	conn.on('close', function(){});
});

sock.installHandlers(app, {prefix:'/game'});

app.get('/', function(req,res){
	res.render('index');
});

app.listen(PORT);
console.log('Listening on port '+PORT);