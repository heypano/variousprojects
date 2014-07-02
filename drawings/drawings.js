


$(document).ready(function(){
	var center = new Point(300,300);
	var radius = 300;
	var numberOfPoints = 10;
	var points = compilePointsForCircle(center, radius, numberOfPoints);
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	
	$("#numPoints").keydown(function(e){
	    if (e.keyCode == 13) {
	    	//PANO here
	    	numberOfPoints = $("#numPoints").value();
	    	drawAllLines(context, points);
	    }
	});
	
});



function compilePointsForCircle(center, radius, numberOfPoints){
	var angleRangeMin = 0;
	var angleRangeMax = 2*Math.PI;
	var angleRangeTotal = angleRangeMax - angleRangeMin;
	var angleStep = angleRangeTotal/numberOfPoints; 
	var pointsArray = new Array();
	
	for(var i=0; i<numberOfPoints; i++){
		var angle = angleRangeMin+i*angleStep;
		var x = radius*Math.cos(angle) + center.x;
		var y = radius*Math.sin(angle) + center.y;
		var point = new Point(x,y);
		pointsArray.push(point);
	}
	
	return pointsArray;
}

function drawAllLines(context, points){
	while(points.length>0){
		var point = points.shift();
		drawLines(context, point, points);	
	}
}

// Draw a line from one point to multiple points
function drawLines(context, point, points){
	for (var i = 0; i < points.length; i++) {
		var newpoint = points[i];
		drawLine(context, point, newpoint);
	}
}


function Point(x, y){
	this.x = x;
	this.y = y;
}

function drawLine(context, point1, point2){
	if((!(point1 instanceof Point)) || (!(point2 instanceof Point))){
		alert("point1 and point2 need to be instances of Point");
		return;
	}
	context.lineWidth = 1;
	context.moveTo(point1.x,point1.y);
	context.lineTo(point2.x,point2.y);
	context.webkitImageSmoothingEnabled = true;
	context.stroke();
	console.log("Drawing line ("+point1.x+", "+point1.y+") to ("+point2.x+", "+point2.y+").");
}