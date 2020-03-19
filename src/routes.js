const express = require("express");
const passport = require("passport");
const routes = express.Router();
const multer = require("multer")
const log = require('./config/islogged')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'){
            return cb(new Error("Arquivo deve ser .jpg, .png ou .jpeg"))
        }
        return cb(null, true)
    },
    limits: {
        fileSize: 1024 * 300
    }
}).single('img')

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

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

routes.get("/profile/info", (req, res) => {
    res.render("profileOne");
});
routes.get("/profile/password", (req, res) => {         // add isloged
    res.render("profilePassword");
});
routes.post("/profile/password", UserController.changePassword);   // add isloged
routes.get("/profile/courses", log.isLoggedIn, (req, res) => {
    res.render("userCourses");
});

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

routes.put('/users', UserController.edit);
routes.delete('/users', UserController.destroy);
routes.post('/users', UserController.store);
routes.post('/users/photo', (req, res) => {
    upload(req, res, function(err){
        if(err instanceof multer.MulterError) {
            if(err.message == 'File too large') {
                req.flash('imgError', 'Tamanho máximo 300Kb')
            } else {
                req.flash('imgError', err.message)
            }
            res.redirect("/profile/info")
        } else if (err) {
            req.flash('imgError', 'Imagem deve ser .jpeg, jpg ou .png')
            res.redirect("/profile/info")
        } else {
            console.log(req.file)
            // UserController.changePhoto(req, res);
        }
    })
});

routes.get('/users/:user_id/posts', PostController.index);
routes.post('/users/:user_id/posts', PostController.store);

module.exports = routes;