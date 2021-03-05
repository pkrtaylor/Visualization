const wordNumbers = require("words-to-numbers");


function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    let headers=["symboling", "normalized-losses", "make", "fuel-type", "aspiration", "num-of-doors", "body-style", 
    "drive-wheels", "engine-location", "wheel-base", "length", "width", "height", "curb-weight", "engine-type", "num-of-cylinders",
    "engine-size", "fuel-system", "bore", "stroke", "compression-ratio", "horsepower", "peak-rpm", "city-mpg", "highway-mpg", "price"
    ];
    let validHeaders=["make", "fuel-type", "body-style", "curb-weight", "num-of-cylinders", "engine-size", "horsepower", "city-mpg",
     "highway-mpg", "price"];
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            if(headers[j] == "num-of-cylinders"){
                obj[headers[j]] = wordNumbers.wordsToNumbers(currentline[j]);
            }
            else{
                obj[headers[j]] = currentline[j];
            }
        }
  
        result.push(obj);
  
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  


function readAndParseData(){
// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  // Read the file and print its contents.
  var fs = require('fs')
    , filename = process.argv[2];
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    let result = csvJSON(data);
    fs.writeFile("data/edata.json", result, function(err, result) {
        if(err) console.log('error', err);
    });
    

  });
}

function main(){
    readAndParseData();
}

main();
  