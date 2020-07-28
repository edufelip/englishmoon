const express = require("express")
const routes = express.Router()
const jwt = require("jsonwebtoken")
const log = require('../config/islogged')
const PostsController = require('../Controllers/PostsController')
const UserController = require('../Controllers/UserController')
const ResetController = require('../Controllers/ResetController')
const transporter = require('../config/mailer')
const limiter = require('../config/rateLimiter')
require('dotenv').config()

routes.get("/", PostsController.index);

routes.get("/books", (req, res) => {
    res.render("underConstruction")
});
routes.get("/courses", (req, res) => {
    res.render("underConstruction")
});

routes.get("/contact", (req, res) => {
    res.render("contact")
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
    return res.redirect("/")
})

routes.get("/register", log.isNotLoggedIn, (req, res) => {
    res.render("register");
});

routes.get("/forgot_password", (req, res) => {
    res.render("forgotPass")
})

routes.get("/forgot_password", limiter, ResetController.index)

routes.get("/reset_password", (req, res) => {
    const token = req.query.cd
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) return res.status(400).send({error: 'Invalid Token'})
      return res.render("resetPass", {token: token})
    })
})

routes.put("/reset_password", limiter, UserController.update)

module.exports = routes;