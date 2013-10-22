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
				"data" : this.content
			   };
		
	/* To the person that sent it */
	socket.emit(this.type, data);
	/* To everyone else */
	socket.broadcast.emit(this.type, data);
}

/**
 * The list of clients to start with;
 */

function ClientList(list){
	this.list = list;
}

ClientList.prototype.addClient = function(client){
	

}

ClientList.prototype.removeClient = function(client){
	
}

ClientList.prototype.broadcast = function(client){
	
}

ClientList.prototype.getListCount = function(){
	return Object.keys(this.list).length;
} 

/*
 * Objects
 */
var clientList = new ClientList(new Object());

/*
 * Functions
 */

function connectionInit(socket){
	//TODO
}

function connectionEnd(socket){
	//TODO
}



/*
 * Exports
 */

module.exports.Person = Person;
module.exports.Message = Message;
