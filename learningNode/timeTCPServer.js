var args = process.argv.slice(2);
var port = args[0];
var net = require('net');
var strftime = require('strftime');
var server = net.createServer(function (socket) {
	var date = new Date();
	var formattedDate = strftime("%Y-%m-%d %H:%M\n",date); 
	//socket.write(formattedDate);
	socket.end(formattedDate);
})
server.listen(port);