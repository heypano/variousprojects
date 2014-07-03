/**
 *  Combination Class
 *  --------
 *  Structured combination given an array 
 *  
 *  @param (Optional) rawArray an Array
 */

/*
 * Constructor
 */
function Combination(rawArray){
	this.combo = new Array();
	if(rawArray){
		// do whatever
	}
}

/**
 * add - Adds an entry to the combo
 * 
 * @param amount - the amount of weights required
 * @param value - the weight of the unit
 * e.g. combo.add(3,45); adds 3 45 pound 
 */
Combination.prototype.add = function(amount,value){
	this.combo.push({amount: amount, value: value});
}