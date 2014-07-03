 
 /*
 	Used python algorithm from http://stackoverflow.com/questions/9329446/how-to-do-for-each-over-an-array-in-javascript
 */
 
  var maxAmount = 1; // Maximum amount of the same weight on each side, i.e. not more than 2 x 2.5s on each side
  var maxWeight = 500; // Maximum weight allowed
  var maxCombos = 1;  //How many combos do you want to show
  var denominations = [45, 25, 15, 10, 5, 2.5];

  $(document).ready(function(){
	  $("#weight").attr("placeholder","weight(s) in lbs (max. "+maxWeight+")");
      $("#weight").keyup(refreshHandler);
      $("input[name=barbell]:radio").change(refreshHandler);
      //TODO maybe wait a bit before running and cancel if more is typed
  });

  
  function refreshHandler(){
	  // Get User Input and HTML escape
	  var weightString = $('<div/>').text(jQuery('#weight').val().trim()).html();
	  var weights = weightString.split(/[, ]/);
	  var barbellWeight = +($('input[name=barbell]:checked').val());
	  //console.log("refreshHandler ",weightString,weights,barbellWeight);
	  var output;
	  // Empty old results
	  $("#result table tbody").html("");
	  
	  if(weightString.length == 0){
		  output = emptyRow();
	  }
	  
	  for (var i = 0 ; i < weights.length ; i++){
		  var weightString = weights[i];
		  if(weightString == "") continue;
		  
		  var weight = +(weightString); // Make sure it's a number
		  if(!isInt(weight)){
			  $("#weight").addClass("invalid");
			  $("#weight").attr("title","Please enter an integer");
			  output += invalidRow(weightString, "Target weight needs to be an integer");
		  }
		  else if(weight > maxWeight){
			  $("#weight").addClass("invalid");
			  $("#weight").attr("title","Please enter a weight less than 500 pounds");
			  output += invalidRow(weightString, "Target weight is cannot be over 500 pounds");
		  }
		  else if(weight < barbellWeight){
			  $("#weight").addClass("invalid");
			  $("#weight").attr("title","Please enter a weight that's higher than the barbell weight");
			  output += invalidRow(weightString, "Target weight cannot be less than the barbell weight");
		  }
		  else{
			  $("#weight").removeClass("invalid");
			  $("#weight").attr("title",null);
			  output += calculate(weight, barbellWeight);
		  }
	  }
	  
	  $("#result table tbody").html(output);
  }
  
  
  function calculate(weight, barbellWeight){
	  
	  // Calculate weight on each side
	  var weightPart = weight - barbellWeight;
	  
	  // Make sure weight is divisible by 5
	  if(weightPart % 5 != 0) weightPart = 5*(Math.floor(weightPart/5));
	  var printedWeight = weightPart + barbellWeight;
	  
	  weightPart = weightPart/2; // on each side
	  
	  // Find the combinations
	  var combos = calculateDivision(weightPart);
	  
	  //TODO filter the combinations -- no non-integers / no lots of small things 
	  filterCombos(combos)
	  
	  // Get HTML for the combos
	  var output = comboString(combos, printedWeight);
	  return output;
  }
  
  
  function comboString(combos, weight){
	  var output = new String();
	  var count = 0;
	  for(var i = combos.length-1; i >= 0; i--){
		  var combo = combos[i];
		  var string = combToString(combo, weight);
		  if(string == "")continue;
		  output += string;
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
  // TODO add row number here for alternating
  // FIX issue with 33
  function combToString(comb, targetWeight){
	  var string = "<tr>";
	  string += "<td>"+targetWeight+" lbs</td>";
	  
	  for(var i = 0; i < comb.length ; i++){
		  var obj = comb[i];
		  if (obj.amount > maxAmount && obj.value < denominations[1]  ) return ""; // ignore combinations with large amounts unless they're close to max weight
		  string += "<td>"+obj.amount+"</td>";
	  }
	  string += "</tr>";
	  return string;
  }
  
  
  function emptyRow(){
	  var emptyRowText;
	  emptyRowText = '<tr><td colspan = "7"> No Weight(s) Entered </td></tr>';
	  return emptyRowText;
  }
  
  function invalidRow(weightString, text){
	  var invalidRowText;
	  invalidRowText = '<tr><td>'+weightString+' lbs</td><td colspan = "6">'+text+'</td></tr>';
	  return invalidRowText;
  }
  
  function isInt(n) {
	   return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
	}
  
  
  