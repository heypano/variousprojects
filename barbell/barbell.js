 
 /*
 	Used python algorithm from http://stackoverflow.com/questions/9329446/how-to-do-for-each-over-an-array-in-javascript
 */
 
  var maxAmount = 1; // Maximum amount of the same weight on each side, i.e. not more than 2 x 2.5s on each side
  var maxWeight = 500; // Maximum weight allowed
  var maxCombos = 5;  //How many combos do you want to show
  var denominations = [45, 25, 15, 10, 5, 2.5];

  $(document).ready(function(){
	  $("#weight").attr("placeholder","weight in lbs (max. "+maxWeight+")");
      $("#weight").keyup(refreshHandler);
      $("input[name=barbell]:radio").change(refreshHandler);
      //TODO maybe wait a bit before running and cancel if more is typed
  });

  
  
  function refreshHandler(){
	  var weight = +(jQuery('#weight').val());
	  var barbellWeight = +($('input[name=barbell]:checked').val());
	  
	  if(!isInt(weight)){
		  $("#weight").addClass("invalid");
		  $("#weight").attr("title","Please enter an integer");
		  $("#result").html("Target weight needs to be an integer");
		  return false;
	  }
	  else if(weight > maxWeight){
		  $("#weight").addClass("invalid");
		  $("#weight").attr("title","Please enter a weight less than "+500+" pounds");
		  $("#result").html("Target weight is cannot be over 500 pounds");
		  return false;
	  }
	  else if(weight <= barbellWeight){
		  $("#weight").removeClass("invalid");
		  if(jQuery('#weight').val().length > 0){
			  $("#result").html("Target weight is too low");
			  $("#weight").attr("title","Please enter a weight that's higher than the barbell weight");
		  }
		  return false;
	  }
	  else{
		  $("#weight").removeClass("invalid");
		  $("#weight").attr("title",null);
	  }
	  
	  
	  if(weight % 5 == 0) weight += 0.01; // To show 2 separate weights
	  var weight1 = 5*(Math.floor(weight/5));
	  var weight2 = 5*(Math.ceil(weight/5));
	  var output = "";
	  output += "<strong>On each side (Rounded down: "+weight1+")</strong>";
	  weight1 = (weight1 - barbellWeight)/2; // on each side
	  output += "<br>";
	  var weight1Combos = calculateDivision(weight1);
	  output += comboString(weight1Combos);
	  output += "<br>";
	  output += "<strong>On each side (Rounded up: "+weight2+")</strong>";
	  weight2 = (weight2 - barbellWeight)/2; // on each side
	  output += "<br>";
	  var weight2Combos = calculateDivision(weight2);
	  output += comboString(weight2Combos);
	  output += "<br>";
	  $("#result").html(output);
  }
  
  function comboString(combos){
	  var output = new String();
	  var count = 0;
	  for(var i = combos.length-1; i >= 0; i--){
		  var combo = combos[i];
		  var string = combToString(combo);
		  if(string == "")continue;
		  output += string+"<br>";
		  count ++;
		  if(count == maxCombos)break;
	  }
	  return output;
  }
  
  function calculateDivision(weight){
	  var combos = new Array();
	  combinations(weight, 0, [], null, combos);
	  return combos;
  }
  
  
  function combinations(left, i, comb, add, combos){
	  if(add != null){
		  comb.push(add);
	  }
	  if((left == 0) || (denominations.length == i+1)){
		  if((denominations.length == i+1) && left>0){
			  comb.push({amount: left/denominations[i], value: denominations[i]});
			  i++;
		  }
		  while (i < denominations.length){
			  comb.push({amount: 0, value: denominations[i]});
			  i++;
		  }
		  combos.push(comb); //Save the combination
		  return 1;
	  }
	  var cur = denominations[i];
	  for (var x = 0; x < (Math.floor(left/cur) + 1) ; x++){
		  combinations(left - x*cur, i+1, comb.slice(0), {amount: x, value: cur}, combos);
	  }
	  return;
  }
  
  function filterCombos(combos){
	  
  }
  
  // For 1 combination
  function combToString(comb){
	  var string = "";
	  for(var i = 0; i < comb.length ; i++){
		  var obj = comb[i];
		  if (obj.amount > maxAmount && obj.value < denominations[1]  ) return ""; // ignore combinations with large amounts unless they're close to max weight
		  if (obj.amount > 0) string += obj.amount+" x "+obj.value+", ";
	  }
	  string = string.substring(0, string.length - 2); // delete last comma
	  return string;
  }
  
  function isInt(n) {
	   return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
	}