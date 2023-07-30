// for file


var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('./public/home.html')
   // .pipe(fs.createReadStream('./public/index.html'))
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('./public/home.html.gz'));
  
console.log("File Compressed.");


// for folder
const zl = require("zip-lib");

const zip = new zl.Zip();
zip.addFolder("./public");
zip.archive("./public/target.zip").then(function () {
    console.log("done");
}, function (err) {
    console.log(err);
});