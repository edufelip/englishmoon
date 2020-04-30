const express = require("express");
const routes = express.Router();
const log = require('../config/islogged')
const PostController = require('../Controllers/PostController');
const UserController = require('../Controllers/UserController')
const transporter = require('../config/mailer')
const limiter = require('../config/rateLimiter')
require('dotenv').config()


routes.get("/", PostController.list);

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

routes.get("/newsletter", limiter, (req, res) => {
    // const email = req.body.email;
    return res.redirect("/")
})

routes.get("/register", log.isNotLoggedIn, (req, res) => {
    res.render("register");
});

routes.get('/:user_id/posts', PostController.index);
routes.post('/:user_id/posts', PostController.store);

routes.get("/forgot_password", (req, res) => {
    res.render("forgotPass")
})
routes.post("/forgot_password", limiter, UserController.verifyEmailAndCaptcha)
routes.get("/reset_password", UserController.resetPass)
routes.put("/reset_password", limiter, UserController.newPass)


module.exports = routes;