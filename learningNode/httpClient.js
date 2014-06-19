var http = require('http');

function httpGetCallback(response){
	function dataProcessor(data){
		console.log(data.toString());
	}
	response.on("data",dataProcessor);
	response.on("error",console.error);
}

http.get(process.argv[2],httpGetCallback);