const express = require("express");
const passport = require("passport");
const flash = require('connect-flash')
const routes = express.Router();

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/register')
}
function isNotLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    } else {
        return next();
    }
}

routes.get("/", PostController.list);

routes.get("/articles", PostController.listAll);

routes.get("/articles/:post_name/:post_id", PostController.listPost);

routes.get("/books", (req, res) => {
    res.render("underConstruction");
});

routes.get("/courses", (req, res) => {
    res.render("underConstruction");
});

routes.get("/contact", (req, res) => {
    res.render("contact");
});

routes.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile");
});

routes.get("/register", isNotLoggedIn, (req, res) => {
    res.render("register");
});

routes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
}), function(req, res){
});

routes.get("/google", passport.authenticate('google', {
    scope: ['profile']
}))
// routes.post("/login", (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if(err) {
//             return next(err)
//         }
//         if(!user){
//             res.render("/", {message: req.flash('erro')})
//             return
//         }
//     })
// })

routes.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/posts', PostController.index);
routes.post('/users/:user_id/posts', PostController.store);

module.exports = routes;