var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

var port = 8000;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

require('./config/mongoose.js'); //requires bring_it db
require("./config/routes.js")(app);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function(){
  console.log("Node app is running on port" + port);
});