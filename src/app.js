const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const sanitizer = require("express-sanitizer");

require('./database/');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(sanitizer());
app.use(routes);
 

app.listen(3000, () => {
    console.log("the server has started");
});