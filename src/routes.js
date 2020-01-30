const express = require("express");
const routes = express.Router();

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

// routes.get("/", (req, res) => {
//     res.render("home");
// });
routes.get("/", PostController.list);

routes.get("/articles", PostController.listAll);
routes.get("/courses", (req, res) => {
    res.render("home");
});
routes.get("/contact", (req, res) => {
    res.render("home");
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/posts', PostController.index);
routes.post('/users/:user_id/posts', PostController.store);

module.exports = routes;