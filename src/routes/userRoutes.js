const express = require("express");
const routes = express.Router();
const multer = require("multer")
const log = require('../config/islogged')
const UserController = require('../controllers/UserController');
const limiter = require('../config/rateLimiter')
const upload = require('../config/multer').single('img')

routes.get('/', UserController.index) //
routes.put('/', limiter, UserController.edit);  //
routes.post('/', limiter, UserController.store);
routes.delete('/', UserController.destroy);

routes.post('/photo', [limiter, log.isLoggedIn], (req, res) => {
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
            UserController.changePhoto(req, res);
        }
    })
});

routes.post('/password', [limiter, log.isLoggedIn], UserController.verifyPass)

module.exports = routes;