
var filePath = process.argv[2];
var extension = process.argv[3];
var fileModule = require('./fileModule');
var callback = function(err,list){
	list.forEach(function(element, index){
		console.log(element);
	});
}

fileModule(filePath, extension, callback);
