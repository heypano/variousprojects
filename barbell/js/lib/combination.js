/**
 *  Combination Class
 *  --------
 *  Structured combination given an array 
 *  
 *  @param weight the weight calculated for this combo
 *  @param (Optional) rawArray an array of the combination items
 */

/*
 * Constructor
 */
function Combination(weight, rawArray){
	this.weight = weight;
	this.combo = new Array();
	if(rawArray){
		// do whatever
	}
}

 // Expects {amount: x, value: x} (numbers)
Combination.prototype.push = function(item){
	return this.combo.push(item);
}

Combination.prototype.slice = function(a,b,c,d){
	var newObject = $.extend({},this);
	newObject.combo = newObject.combo.slice(a,b,c,d);
	return newObject;
}

// TODO add row number here for alternating
Combination.prototype.render = function(){
	  var output = "<tr>";
	  output += "<td>"+this.weight+" lbs</td>";
	  
	  for(var i = 0; i < this.combo.length ; i++){
		  var obj = this.combo[i];
		  //if (obj.amount > maxAmount && obj.value < denominations[1]  ) return ""; // ignore combinations with large amounts unless they're close to max weight
		  output += "<td>"+obj.amount+"</td>";
	  }
	  output += "</tr>";
	  return output;
}