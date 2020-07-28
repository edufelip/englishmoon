const express = require("express");
const routes = express.Router();
const log = require('../config/islogged')

routes.get("/info", log.isLoggedIn, (req, res) => {
    res.render("profileOne");
});
routes.get("/password", log.isLoggedIn, (req, res) => {
    res.render("profilePassword");
});
routes.get("/courses", log.isLoggedIn, (req, res) => {
    res.json("page unavailable yet")
});

module.exports = routes;