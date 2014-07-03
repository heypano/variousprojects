/**
 *  Combinations Class
 *  --------
 *  Contains all combinations for a specific target weight, given a barbell weight and the possible weight denominations
 *  
 *  @param targetWeight The target weight 
 *  @param barbellWeight The weight of the barbell 
 *  @param (Optional) denominations An array of the possible denominations = will default to [45, 25, 15, 10, 5, 2.5]
 */

var standardDenominations = [45, 25, 15, 10, 5, 2.5];

/*
 * Constructor
 */
function Combinations(targetWeight, barbellWeight, denominations){
	// Make sure the weights are numbers
	this.targetWeight = +(targetWeight);
	this.barbellWeight = +(barbellWeight);
	
	if(denominations){
		this.denominations = denominations;
	}else{
		this.denominations = standardDenominations;
	}
	
	this.initialize();
}

/*
 * initialize - setup and calculate all combinations
 */

Combinations.prototype.initialize = function(){
	// Make sure the denominations are numbers
	this.denominations = this.denominations.map(function(x){return +(x)});
	
	// Sort denominations (descending)
	this.denominations.sort(function(a,b){return b-a});
	
	// Round total weight excluding the barbell to the nearest multiple of 5 (or - if not using standard denominations - the nearest multiple of twice the minimum denomination)
	var roundFactor = 2 * this.denominations[this.denominations.length-1];
	
	// Weight on either side of the barbell
	this.sideWeight = roundFactor*(Math.floor((this.targetWeight - this.barbellWeight)/roundFactor))/2; 
	
	// Actual total weight after rounding
	this.actualWeight = 2 * this.sideWeight + this.barbellWeight;
	
	// Initialize array
	this.combos = new Array();
	
	// Calculate all combinations
	this.calculateCombos();
}

/*
 * calculateCombos - calculate all combinations
 */
Combinations.prototype.calculateCombos = function(){
	this.calculateCombosInternal(this.sideWeight, 0, new Combination(this.actualWeight), null)
}


Combinations.prototype.calculateCombosInternal = function (left, i, comb, add){
	  // Converted python algorithm from http://stackoverflow.com/questions/9329446/how-to-do-for-each-over-an-array-in-javascript
	  if(add != null){
		  comb.push(add);
	  }
	  if((left == 0) || (this.denominations.length == i+1)){
		  if((this.denominations.length == i+1) && left>0){
			  comb.push({amount: left/this.denominations[i], value: this.denominations[i]});
			  i++;
		  }
		  while (i < this.denominations.length){
			  comb.push({amount: 0, value: this.denominations[i]});
			  i++;
		  }
		  this.combos.push(comb); //Save the combination
		  return;
	  }
	  var cur = this.denominations[i];
	  for (var x = 0; x < (Math.floor(left/cur) + 1) ; x++){
		  this.calculateCombosInternal(left - x*cur, i+1, comb.slice(0), {amount: x, value: cur});
	  }
	  return;
}

// Add sort function

//Priorities for filter:

// Primarily: Least total number of things (combo class should return that)
// Highest weight takes priority