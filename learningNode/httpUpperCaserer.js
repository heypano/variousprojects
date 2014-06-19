var args = process.argv.slice(2);
var port = Number(args[0]);
var filePath = args[1];
var http = require('http');
var map = require('through2-map');
var server = http.createServer(function (req, res) {
	if(req.method == "POST"){
		req.pipe(map(function (chunk) {
	      return chunk.toString().toUpperCase();
	    })).pipe(res)
	}else{
		return res.end('send me a POST\n');
	}
})
server.listen(port);