// dependicies requires

var bodyParser = require("body-parser");
var express = require("express");

// assign PORT number and app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// app path
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// server lisetnner 
app.listen(PORT, function() {
    console.log('this is port ' + PORT);

});
