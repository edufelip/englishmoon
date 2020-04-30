require('dotenv').config()

const islogged = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/register')
    },
    isNotLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/');
        } else {
            return next();
        }
    },
    isAdmin: function(req, res, next) {
        if(req.isAuthenticated() && (req.user.email === process.env.ADMIN_EMAIL || req.user.email === process.env.FAKE_ADMIN_EMAIL)) {
            return next();
        }
        return res.redirect("/")
    }
}

module.exports = islogged