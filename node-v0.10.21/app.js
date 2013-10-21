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




io.sockets.on('connection', function(socket) {
	/*socket.emit('news', {
		hello : 'world'
	});*/
	
	socket.on('message', function(data) {
		var name = data.name;
		var message = data.message;
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
