const islogged = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/register')
    },
    isNotLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/');
        } else {
            return next();
        }
    }
}

module.exports = islogged