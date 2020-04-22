const express = require("express");
const routes = express.Router();
const limiter = require("../config/rateLimiter")
const PostController = require('../Controllers/PostController');
const log = require('../config/islogged')

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
