var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var clientprefix = "/../client";
var libraryprefix = "/libraries";

var Util = require(__dirname+libraryprefix+"/Util.js");

app.listen(8080);

function handler(req, res) {
	fs.readFile(__dirname+clientprefix+req.url, function(err, data) {
		if (err) {
			res.writeHead(500);
			console.log("ERROR: ");
			console.log(err);
			return res.end('Error loading '+clientprefix+req.url);
		}
		
		res.writeHead(200);
		res.end(data);
	});
}



//TODO Implement "X is typing..." (send is not typing a)when hit enter b)when 2 inactive seconds
//TODO Implement sound with on/off
//TODO Implement data storage on the server (logs)
//TODO Implement timestamp
//TODO Implement Keep and display active list of people in the chatroom
//TODO Send message on disconnect
//TODO Implement no duplicate names
//TODO Implement sub-chatrooms
//TODO Implement checking if same person is sending same name (or only read first time name is sent)
//TODO Implement "X entered the chatroom" and "X entered the chatroom"
//TODO Implement error handling (server dies etc)
var clients = new Object();
var cachedMessages = new Array();

io.sockets.on('connection', function(socket) {
	console.log("---------------------------------");
	console.log(typeof socket );

	// Add client to the list
	clients[socket.id] = {name: 'anonymous'};
	
	// Broadcast list of clients
	broadcastAll(socket,'clientList',clients);
	
	// Send things that were last said
	socket.emit('cached',cachedMessages);
	
	socket.on('message', function(data) {
		var name = data.name;
		
		// Save the client's name (and IP later?)
		clients[socket.id].name = name;
		
		// Broadcast list of clients
		broadcastAll(socket,'clientList',clients);
		
		// Broadcast message
		broadcastMessage(socket,data);
		
		// Save 10 Messages
		if(cachedMessages.length >= 10)cachedMessages.shift();
		cachedMessages.push(data);
		
	});
	
	// When someone leaves
	socket.on('disconnect', function() {
	   	delete clients[socket.id];
	   	broadcastAll(socket,'clientList',clients);
	});
	
});

function broadcastAll(socket,type,data){
	socket.broadcast.emit(type,data);
	socket.emit(type,data);
}

function broadcastMessage(socket,data){
	var name = data.name;
	var message = data.message;
	// Send the message to everyone
	broadcastAll(socket,'message', {
		"name" : name,
		"message" : message
	});
}


/*
 * Write to file
 */

/*
fs.writeFile(process.cwd()+"/tmp/panotest",require('util').inspect(socket), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
*/ 