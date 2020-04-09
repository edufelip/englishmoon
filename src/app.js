const express        = require ("express");
const app            = express();
const bodyParser     = require("body-parser");
const sanitizer      = require("express-sanitizer");
const session        = require('express-session');
const flash          = require('connect-flash')
const passport       = require('passport');
const methodOverride = require("method-override");
const transporter    = require("./config/mailer");
const hbs            = require("nodemailer-express-handlebars");
require('dotenv').config()

require('./config/auth')(passport)
require('./database/');

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.ejs',
        partialsDir: 'views/partials',
        layoutsDir: 'views/emailTemplates',
        defaultLayout: ''
    },
    viewPath: 'views/emailTemplates',
    extName: '.ejs'
}))


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(sanitizer());
app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash('error');
    res.locals.imgMessage = req.flash('imgError')
    res.locals.dltPass = req.flash('dltError')
    next();
})

const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(routes);
app.use(authRoutes);
app.use("/profile", profileRoutes);
app.use("/users", userRoutes);

app.listen(3000, (err) => {
    if(!err) {
        console.log("the server has started");
    } else {
        console.log("the server hasn't been started due to a problem")
    }
});