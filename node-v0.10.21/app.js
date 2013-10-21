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


//TODO Implement "X is typing..." (send is not typing a)when hit enter b)when 2 inactive seconds
//TODO Implement sound with on/off
//TODO Implement data storage on the server (logs)
//TODO Implement timestamp
//TODO Implement Keep and display active list of people in the chatroom
//TODO Implement no duplicate names
//TODO Implement sub-chatrooms
//TODO Implement checking if same person is sending same name (or only read first time name is sent)
//TODO Implement "X entered the chatroom" and "X entered the chatroom"
//TODO Implement error handling (server dies etc)
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
