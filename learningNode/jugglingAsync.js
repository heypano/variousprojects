var http = require('http');

var urls = process.argv.slice(2);
var remaining = urls.length;
var outputs = new Array();
var bl = require('bl');

function printResults(results){
	results.forEach(function(e,i){
		console.log(e.toString());
	})
}

function httpGet(element, i){
	http.get(element,function httpGetCallback(response){
		response.pipe(bl(function (err,data){
			if(err){
				return console.error(err);
			}
			outputs[i]= data;
			remaining--;
			if(remaining == 0){
				printResults(outputs);
			}
		}));
	});
}

urls.forEach(httpGet);
