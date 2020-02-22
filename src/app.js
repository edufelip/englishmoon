const express       = require ("express");
const app           = express();
const bodyParser    = require("body-parser");
const sanitizer     = require("express-sanitizer");
const LocalStrategy = require('passport-local').Strategy
const session       = require('express-session');
const flash         = require('connect-flash')
const bcrypt        = require('bcrypt');
const passport      = require('passport');
require('./config/auth')(passport)
require('./database/');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(sanitizer());
app.use(flash());

app.use(session({
    secret: 'johnson',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes");
app.use(routes);

app.listen(3000, (err) => {
    if(!err) {
        console.log("the server has started");
    } else {
        console.log("the server hasn't been started due to a problem")
    }
});