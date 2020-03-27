const express = require("express");
const routes = express.Router();
const multer = require("multer")
const path = require('path')
const log = require('../config/islogged')
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');

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

routes.get('/', UserController.index) //
routes.put('/', UserController.edit);  //
routes.delete('/', UserController.destroy);
routes.post('/', UserController.store);

routes.post('/photo', log.isLoggedIn, (req, res) => {
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
routes.post('/password', log.isLoggedIn, UserController.verifyPass)

routes.get('/:user_id/posts', PostController.index);
routes.post('/:user_id/posts', PostController.store);

module.exports = routes;