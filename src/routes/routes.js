const express = require("express");
const routes = express.Router();
const log = require('../config/islogged')
const PostController = require('../Controllers/PostController');
const UserController = require('../Controllers/UserController')
const transporter = require('../config/mailer')
const limiter = require('../config/rateLimiter')
require('dotenv').config()

routes.get("/forgot_password", (req, res) => {
    res.render("forgotPass")
})

routes.post("/forgot_password", limiter, UserController.verifyEmailAndCaptcha)

routes.get("/reset_password", UserController.resetPass)
routes.put("/reset_password", UserController.newPass)


routes.get("/teste", (req, res) => {
    res.render("resetPass")
})

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
routes.post("/contact", limiter, (req, res) => {
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: req.body.email,
        subject: req.body.name + " - Contact",
        text: req.body.msg
    }).then( info => {
        req.flash("error", "Sua mensagem foi enviada com sucesso")
        return res.redirect("/contact")
    }).catch( err => {
        return res.json(err)
    })
})

routes.get("/register", log.isNotLoggedIn, (req, res) => {
    res.render("register");
});

module.exports = routes;