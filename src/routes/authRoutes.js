const express = require("express");
const routes = express.Router();
const passport = require("passport");
const limiter = require("../config/rateLimiter")

routes.post("/login", [limiter, passport.authenticate("local", {
    successRedirect: "contact",
    failureRedirect: "contact",
    failureFlash: true
})], function(req, res){
});

routes.get("/google", limiter, passport.authenticate('google', {
    scope: ['openid', 'email', 'profile']
}))

routes.get("/api/auth/google/callback", passport.authenticate('google'), (req, res) => {
    res.redirect('/')
})

routes.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = routes;