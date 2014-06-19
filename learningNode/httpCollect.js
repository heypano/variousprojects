var http = require('http');

function httpGetCallback1(response){
	var allData = "";
	function dataProcessor(data){
		allData += data.toString();
	}
	function dataEnd(data){
		console.log(allData.length);
		console.log(allData);
	}
	
	response.on("error",console.error);
	response.on("data",dataProcessor);
	response.on("end",dataEnd)
}

function httpGetCallback2(response){
	bl = require('bl');
	response.pipe(bl(function (err,data){
		if(err){
			return console.error(err);
		}
		console.log(data.toString().length);
		console.log(data.toString());
	}));
}


http.get(process.argv[2],httpGetCallback2);