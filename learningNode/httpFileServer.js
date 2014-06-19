var args = process.argv.slice(2);
var port = Number(args[0]);
var filePath = args[1];
var http = require('http');
var fs = require('fs');
var fileStream = fs.createReadStream(filePath);
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })
  fileStream.pipe(res);
})
server.listen(port);