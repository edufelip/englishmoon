let express = require ("express");
let app = express();
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/articles", (req, res) => {
    res.render("home");
});
app.get("/courses", (req, res) => {
    res.render("home");
});
app.get("/contact", (req, res) => {
    res.render("home");
});



app.listen(3000, () => {
    console.log("the server has started");
});