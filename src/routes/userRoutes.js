const express = require("express")
const routes = express.Router()
const multer = require("multer")
const bcrypt = require("bcrypt")
const log = require('../config/islogged')
const UserController = require('../controllers/UserController.js')
const limiter = require('../config/rateLimiter')
const upload = require('../config/multer').single('img')

routes.put('/', [limiter, log.isLoggedIn], UserController.update); 
routes.post('/', limiter, UserController.store);
routes.delete('/', [limiter, log.isLoggedIn] ,UserController.delete);

routes.put('/photo', [limiter, log.isLoggedIn], (req, res) => {
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
            UserController.update(req, res);
        }
    })
});

routes.post('/password', [limiter, log.isLoggedIn], (req, res) => {
    const userPass = req.user.password
    const bodyPass = req.body.password
    const verify = bcrypt.compareSync(bodyPass, userPass)
    return res.json(verify)
})

module.exports = routes;