const express = require("express");
const routes = express.Router();
const passport = require("passport");
const log = require('../config/islogged')
const secret = require("../config/data_credentials")
const PostController = require('../controllers/PostController');
const transporter = require('../config/mailer')
const jwt = require("jsonwebtoken")
const request = require("request")

routes.get("/forgot_password", (req, res) => {
    res.render("forgotPass")
})

routes.get("/reset_password", (req, res) => {
    res.render("resetPass")
})

routes.post("/verify", (req, res) => {
    const ver = req.body.captcha
    if(ver === '' || ver === undefined || ver === null) return res.json({'status': false, 'msg': 'please select captcha'})
    const verifyUrl = 'https://google.com/recaptcha/api/siteverify?secret='+secret.captcha.key+'&response='+ver+'&remoteip='+req.connection.remoteAddress
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body)
        if(body.success !== undefined && !body.success) return res.json({'status': false, 'msg': 'failed verification'})
        console.log("chegou aqui")
        return res.json({'status': true, 'msg': 'captcha passed'})
    })
})

routes.post("/forgot_password", (req, res) => {
    const info = {
        user: "edu_felip@hotmail.com",
        pass: "123456"
    }
    const token = jwt.sign({info}, secret.jwt.secret, {expiresIn: 3600})
    const link = "http://localhost:3000/users/" + token
    const mail = {
        to: 'edu_felip@hotmail.com',
        from: 'eduardofelipi@gmail.com',
        subject: 'testando',
        template: 'registerEmail',
        context: {link}
    }
    transporter.sendMail(mail).then(console.log).catch(console.error)
    res.render("emailTemplates/registerEmail")
})

// routes.get("/:token_num", async (req, res) => {
    
// })

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
routes.post("/contact", (req, res) => {
    transporter.sendMail({
        from: secret.email.user,
        to: secret.email.user,
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

routes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
}), function(req, res){
});

routes.get("/google", passport.authenticate('google', {
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