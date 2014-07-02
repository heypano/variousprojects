
var filePath = process.argv[2];
var fs = require('fs');
var buf = fs.readFileSync(filePath);
var numLines = buf.toString().split("\n").length -1;
console.log(numLines);

