const express = require("express");
const routes = express.Router();
const log = require('../config/islogged')
const UserController = require('../controllers/UserController');
const limiter = require('../config/rateLimiter')

routes.get("/info", log.isLoggedIn, (req, res) => {
    res.render("profileOne");
});
routes.get("/password", log.isLoggedIn, (req, res) => {
    res.render("profilePassword");
});
routes.post("/password", [limiter, log.isLoggedIn], UserController.changePassword);
routes.get("/courses", log.isLoggedIn, (req, res) => {
    res.json("page unavailable yet")
});

module.exports = routes;