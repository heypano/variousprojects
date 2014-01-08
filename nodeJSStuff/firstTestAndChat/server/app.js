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


/**
 * 
 * 
 * 
 * 
 *  CHATROOM
 * 
 * 
 * 
 * 
 */
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
//TODO let users pick color

//var clients = new Object();
//var cachedMessages = new Array();



io.sockets.on('connection', function(socket) {
	// Make the person object
	var person = new Util.Person('anonymous',socket);
	
	// Add person to the list
	Util.personList.add(person);
	
	// Broadcast list of clients
	Util.personList.broadcast(person); // (this broadcast was caused by this person)
	
	// Send things that were last said
	Util.cachedMessages.send(person);
	
	
	socket.on('message', function(data) {
		var message = new Util.Message(person, "message", data);
		
		// Broadcast message
		message.send(true);
		
		// Add message to cache
		Util.cachedMessages.add(message);
	});
	
	socket.on('name', function(data){
		var namedPerson = Util.personList.list[socket.id];
		
		namedPerson.name = data.name;
		person = namedPerson
		
		Util.personList.broadcast(person);
	});
	
	socket.on('typing', function(isTyping){
		var person = Util.personList.list[socket.id];
		
		person.isTyping = isTyping;
		
		Util.personList.broadcast(person);
	});
	
	socket.on('color', function(color){
		var person = Util.personList.list[socket.id];
		
		person.color = color;
		
		Util.personList.broadcast(person);
	});
	
	
	// When someone leaves
	socket.on('disconnect', function() {
		// Delete the person from the list
		Util.personList.remove(socket.id)
		
		// Send the updated list to the client
		Util.personList.broadcast(person);
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