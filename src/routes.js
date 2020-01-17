const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("home");
});
routes.get("/articles", (req, res) => {
    res.render("home");
});
routes.get("/courses", (req, res) => {
    res.render("home");
});
routes.get("/contact", (req, res) => {
    res.render("home");
});
routes.get("/*", (req, res) => {
    return res.json({pagina: 'indisponivel'});
})

module.exports = routes;