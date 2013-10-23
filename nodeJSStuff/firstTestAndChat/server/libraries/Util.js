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
	console.log("==== new Person");
	this.name = name;
	this.socket = socket;
	this.uid = this.socket.id;
	this.color;
	this.lastActive = new Date().getTime();
	this.isTyping = false;
	this.numMessagesSent = 0;
}

/**
 * Sends a message
 * @param message The message content
 */
Person.prototype.sendMessage = function(content){
	console.log("==== Person.sendMessage");
	var message = new Message(this,"message",content);
	message.send(true);
}

/**
 * Broadcasts the list of clients
 */
Person.prototype.broadcastList = function(content){
	console.log("==== Person.broadcastList");
	var message = new Message(this,"clientList",content);
	message.send(true);
}

/**
 * Message class to represent each message sent in the chatroom
 * @param sender The person sending the message (of class Person)
 * @param type The type of message ("message", "heartbeat")
 * @param content The message content
 * @returns a person
 */
function Message(sender,type,content) {
	console.log("==== New Message");
	this.sender = sender;
	this.type = type;
	this.content = content;
	this.timestamp = new Date().getTime();
}

Message.prototype.send = function(broadcast){
	console.log("==== Message.send");
	var socket = this.sender.socket;
	/* Filter the data that's being sent */
	var data = {
				"name" : this.sender.name,
				"data" : this.content,
			   };
	console.log(data);
		
	/* To the person that sent it */
	socket.emit(this.type, data);
	/* To everyone else */
	if(broadcast){
		socket.broadcast.emit(this.type, data);
	}
}


/**
 * The list of clients to start with;
 */

function PersonList(){
	console.log("==== New PersonList");
	this.list = new Object();new Message()
}

PersonList.prototype.add = function(person){
	console.log("==== PersonList.add");
	this.list[person.uid] = person;
}

PersonList.prototype.remove = function(uid){
	console.log("==== PersonList.remove");
	delete this.list[uid];
}

PersonList.prototype.broadcast = function(person){
	console.log("==== PersonList.broadcast");
	person.broadcastList(this.getNameList());
}

PersonList.prototype.getNameList = function(){
	console.log("==== PersonList.getNameList");
	var unfilteredList = this.list;
	var filteredList = Object.keys(this.list).map(function(single){
		var person = unfilteredList[single];
		return {
			name: person.name?person.name:"anonymous", 
			isTyping: person.isTyping,
			color: person.color,
		};
		});
	console.log(filteredList)
	return filteredList;
}

PersonList.prototype.getListCount = function(){
	console.log("==== PersonList.getListCount");
	return Object.keys(this.list).length;
} 

/*
 * Objects
 */
var personList = new PersonList(new Object());
var cachedMessages = new Object();
cachedMessages.list = new Array();

/**
 * @param message: the message object
 */
cachedMessages.add = function(message){
	console.log("==== cachedMessages.add");
	// Save 10 Messages
	if(this.list.length >= 10)this.list.shift();
	this.list.push({name: message.sender.name, message: message.content});
}

cachedMessages.send = function(person){
	console.log("==== cachedMessages.send");
	var message = new Message(person,"cache",this.getFilteredList());
	console.log(message);
	message.send(false);
}

cachedMessages.getFilteredList = function(){
	console.log("==== cachedMessages.getFilteredList");
	var unfilteredList = this.list;
	var filteredList = this.list.map(function(single){
		return {message:single.message};
		});
	console.log(filteredList)
	return filteredList;
}
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
module.exports.personList = personList;
module.exports.cachedMessages = cachedMessages;
