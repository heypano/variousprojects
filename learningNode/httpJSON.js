var args = process.argv.slice(2);
var port = Number(args[0]);
var http = require('http');
var urlParser = require('url');

var server = http.createServer(function (req, res) {
	if(req.method == "GET"){
		var urlParts = urlParser.parse(req.url,true);
		var path = urlParts.pathname;
		var query = urlParts.query;
		var isoDate = query.iso;
		var date = new Date(isoDate);
		var responseObject;
		
		if(path == "/api/parsetime"){
			var dateJSON = new Object();
			dateJSON.hour = date.getHours();
			dateJSON.minute = date.getMinutes();
			dateJSON.second = date.getSeconds();
			responseObject = dateJSON;
		}else if(path == "/api/unixtime"){
			var unixTimeJSON = new Object();
			unixTimeJSON.unixtime = date.valueOf();
			responseObject = unixTimeJSON;
		}
		
		if(responseObject){
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(responseObject));
		}else{
	        res.writeHead(404);
	        res.end();
		}
		
	}
})
server.listen(port);