const express = require("express");
const routes = express.Router();
const limiter = require("../config/rateLimiter")
const PostController = require('../Controllers/PostController');
const log = require('../config/islogged')
const multer = require("multer")

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
}).single('img')

routes.get("/", PostController.listAll);
routes.post("/", limiter, PostController.newPost);
routes.get("/new", (req, res) => {
    res.render("newArticle")
})
routes.get("/:post_name/:post_id", PostController.listPost);
routes.get("/:post_name/:post_id/edit", PostController.editPostForm);
routes.put("/:post_name/:post_id", limiter, PostController.editPost);
routes.delete("/:post_name/:post_id", limiter, PostController.deletePost);


module.exports = routes
