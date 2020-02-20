const express       = require ("express");
const app           = express();
const bodyParser    = require("body-parser");
const sanitizer     = require("express-sanitizer");
const passport      = require('passport');
const LocalStrategy = require('passport-local')
const session       = require('express-session');

const routes = require("./routes");
const User = require("./models/User")

require('./database/');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(sanitizer());
app.use(routes);

app.use(session({
    secret: 'johnson',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.))
passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    })
})

app.listen(3000, (err) => {
    if(!err) {
        console.log("the server has started");
    } else {
        console.log("the server hasn't been started due to a problem")
    }
});