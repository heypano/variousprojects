
var filePath = process.argv[2];
var fs = require('fs');
var buf = fs.readFile(filePath,function(err,data){
	if(!err){
		var numLines = data.toString().split("\n").length-1;
		console.log(numLines);
	}
});

