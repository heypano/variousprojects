var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8080);
function handler(req, res) {
	fs.readFile(__dirname + req.url, function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading '+req.url);
		}
		
		res.writeHead(200);
		res.end(data);
	});
}

var cachedMessages = new Array();


io.sockets.on('connection', function(socket) {

	// Send things that were last said
	socket.emit('cached',cachedMessages);
	socket.on('message', function(data) {
		var name = data.name;
		var message = data.message;
		
		// Save 10 Messages
		if(cachedMessages.length >= 10)cachedMessages.shift();
		cachedMessages.push(data);
		
		// Send the message to everyone else
		socket.broadcast.emit('message', {
			"name" : name,
			"message" : message
		});
		// Send the message back to the person
		socket.emit('message', {
			"name" : name,
			"message" : message
		});
	});
});
