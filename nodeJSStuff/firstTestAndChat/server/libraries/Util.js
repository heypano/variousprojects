/*
 * Classes
 */

/**
 * Person class to represent the people connected to the chatroom
 * @param name The person's name
 * @param socket The socket Object
 * @returns a person
 */

function Person(name,socket){
	this.name = name;
	this.socket = socket;
	this.uid = this.socket.id;
	this.lastActive = new Date().getTime();
	this.numMessagesSent = 0;
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
function broadcastMessage(socket,data){
	var name = data.name;
	var message = data.message;
	// Send the message to everyone
	broadcastAll(socket,'message', {
		"name" : name,
		"message" : message
	});
}
/**
 * Sends a message
 * @param message The message content
 */
Person.prototype.sendMessage = function(content){
	var message = new Message(this,"message",content);
	message.send();
}

/**
 * Message class to represent each message sent in the chatroom
 * @param sender The person sending the message (of class Person)
 * @param type The type of message ("message", "heartbeat")
 * @param content The message content
 * @returns a person
 */
function Message(sender,type,content) {
	this.sender = sender;
	this.type = type;
	this.content = content;
	this.timestamp = new Date().getTime();
}

Message.prototype.send = function(){
	var socket = this.sender.socket;
	var data = {
				"name" : this.sender.name,
				"data" : this.content;
			   } 
		
	/* To the person that sent it */
	socket.emit(this.type, data);
	/* To everyone else */
	socket.broadcast.emit(this.type, data);
}

/*
 * Functions
 */



/*
 * Exports
 */

module.exports.Person = Person;
module.exports.Message = Message;
