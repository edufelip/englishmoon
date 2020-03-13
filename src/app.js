const express       = require ("express");
const app           = express();
const bodyParser    = require("body-parser");
const sanitizer     = require("express-sanitizer");
const LocalStrategy = require('passport-local').Strategy
const session       = require('express-session');
const flash         = require('connect-flash')
const bcrypt        = require('bcrypt');
const passport      = require('passport');
const sessionSecret = require('./config/credentials')
const methodOverride = require("method-override")

require('./config/auth')(passport)
require('./database/');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(sanitizer());
app.use(methodOverride("_method"))

app.use(session({
    secret: sessionSecret.session.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash('error');
    next();
})

const routes = require("./routes");
app.use(routes);

app.listen(3000, (err) => {
    if(!err) {
        console.log("the server has started");
    } else {
        console.log("the server hasn't been started due to a problem")
    }
});