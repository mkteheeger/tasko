
const express = require("express");
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");
//const methodOverride = require("method-override"); // might not need

const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// <<<<<<< HEAD
// Override with POST having ?_method=DELETE
//app.use(methodOverride("_method")); // might not use

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes - not set up yet =============================================================

require("./routes/html-routes.js")(app);
// require("./routes/post-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
