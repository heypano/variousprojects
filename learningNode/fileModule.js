var fs = require('fs');
var path = require('path');

function filterListByExtension(dirPath, extension, callback){
	var filter = function(err,list){
		if(err){
			return callback(err);
		}
		var filteredList = list.filter(function(element){return path.extname(element) == "."+extension});
		callback(null, filteredList);
	};
	
	fs.readdir(dirPath, filter);
}

module.exports = filterListByExtension;