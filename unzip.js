// for file


var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('./public/home.html.gz')
   // .pipe(fs.createReadStream('./public/index.html'))
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('./public/home.html','utf-8'));
  
console.log("File Compressed.");


// for folder
const zl = require("zip-lib");

const zip = new zl.Zip();
zip.addFolder("./public");
zip.archive("target.zip").then(function () {
    console.log("done");
}, function (err) {
    console.log(err);
});

const unzip = new zl.Unzip({
    // Called before an item is extracted.
    onEntry: function (event) {
        console.log(event.entryCount, event.entryName);
    }
})
unzip.extract("./public/target.zip", "./public/unzip").then(function () {
    console.log("done");
}, function (err) {
    console.log(err);
});
