const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        }, 
        function(req, email, password, done) {
            const isValidPassword = function (password, userpassword){
                return bcrypt.compareSync(password, userpassword)
            }
            User.findOne({
                where: {email: email}
            }).then((user) => {
                if(!user) return done(null, false, {message: "account does not exist"});
                if(!isValidPassword(password, user.password)){
                    return done(null, false, {
                        message: 'incorrect password'
                    })
                }
                return done(null, user)
            }).catch((err) => {
                console.log("Error: ", err);
                return done(null, false, {
                    message: 'Something went wrong'
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(user.errors, null);
            }
        })
    })    
}