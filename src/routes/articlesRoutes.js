const express = require("express");
const routes = express.Router();
const limiter = require("../config/rateLimiter")
const PostController = require('../Controllers/PostController');
const log = require('../config/islogged')
const multer = require("multer")
const upload = require("../config/multer").single("articleCover")

routes.get("/", PostController.listAll);
routes.post("/", [log.isLoggedIn ,limiter], (req, res) => {
    upload(req, res, function(err){
        if(err instanceof multer.MulterError) {
            if(err.message == 'File too large') {
                req.flash('imgError', 'Tamanho máximo 300Kb')
            } else {
                req.flash('imgError', err.message)
            }
            res.redirect("/articles/new")
        } else if (err) {
            console.log(err)
            req.flash('imgError', 'Imagem deve ser .jpeg, jpg ou .png')
            res.redirect("/articles/new")
        } else {
            PostController.newPost(req, res);
        }
    })
});
routes.get("/new", log.isLoggedIn, (req, res) => {
    res.render("newArticle")
})
routes.get("/:post_name/:post_id", PostController.listPost);
// routes.get("/:post_name/:post_id/edit", PostController.editPostForm);
// routes.put("/:post_name/:post_id", limiter, PostController.editPost);
routes.delete("/:post_name/:post_id", [log.isLoggedIn, limiter], PostController.deletePost);

module.exports = routes
