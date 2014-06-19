var actualArgs = process.argv.slice(2);
var sum = actualArgs.reduce(function(sum,num){return sum + Number(num)},0);
console.log(sum);
