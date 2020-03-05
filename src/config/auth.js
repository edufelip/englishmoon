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
                if(!user) return done(null, false, {message: "e-mail inexistente"});
                if(!isValidPassword(password, user.password)){
                    return done(null, false, {
                        message: 'senha incorreta'
                    })
                }
                return done(null, user)
            }).catch((err) => {
                console.log("Error: ", err);
                return done(null, false, {
                    message: 'algo deu errado'
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            done(null, user);
        }).catch((err) => {
            done(err);
        })
    })    
}