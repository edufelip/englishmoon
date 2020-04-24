const express = require("express");
const routes = express.Router();
const limiter = require("../config/rateLimiter")
const PostController = require('../Controllers/PostController');
const log = require('../config/islogged')
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
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
}).single('articleCover')

routes.get("/", PostController.listAll);
routes.post("/", limiter, (req, res) => {
    upload(req, res, function(err){
        if(err instanceof multer.MulterError) {
            if(err.message == 'File too large') {
                req.flash('imgError', 'Tamanho máximo 300Kb')
            } else {
                req.flash('imgError', err.message)
            }
            res.redirect("/articles/new")
        } else if (err) {
            req.flash('imgError', 'Imagem deve ser .jpeg, jpg ou .png')
            res.redirect("/articles/new")
        } else {
            PostController.newPost(req, res);
        }
    })
});
routes.get("/new", (req, res) => {
    res.render("newArticle")
})
routes.get("/:post_name/:post_id", PostController.listPost);
routes.get("/:post_name/:post_id/edit", PostController.editPostForm);
routes.put("/:post_name/:post_id", limiter, PostController.editPost);
routes.delete("/:post_name/:post_id", limiter, PostController.deletePost);


module.exports = routes
