var express = require('express')
  , Spart 	= require('./lib/spartacus')
  , app     = express()
  , http = require('http')
  , PORT 	= process.argv[2] || 3000
  , sock 	= require('sockjs').createServer()
  , server = http.createServer(app)
;

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.logger('dev'));
	app.use(express.static( __dirname + '/public'));
});

sock.on('connection', function(conn){
    var spart = new Spart();
    spart.socket.on('data', function(message) {
        conn.write(message.toString());
    });
    spart.connect('10.5.98.3', '4000', 'connectfour');
	conn.on('data', function(message){
        spart.move(parseInt(message));
	});
	conn.on('close', function(){});
});

sock.installHandlers(server, {prefix:'/tunnel'});

app.get('/', function(req,res){
	res.render('index');
});

server.listen(PORT, '0.0.0.0');
console.log('Listening on port '+PORT);
