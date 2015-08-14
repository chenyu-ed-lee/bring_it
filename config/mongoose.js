var mongoose = require('mongoose');
var fs = require('fs');

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/bring_it';


mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
// connect to the database
// mongoose.connect('mongodb://localhost/picnic_list');
// loads all of the model files
var models_path = __dirname + '/../server/models';
// for each file in the path
fs.readdirSync(models_path).forEach(function(file){
  // check if it is a js file and then require it (load it)
  if(file.indexOf('.js')>0){
    require(models_path + '/' + file);
  }
})

