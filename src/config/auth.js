const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20');
const bcrypt = require('bcrypt')
const User = require('../models/User')
const keys = require('../config/googleCred')

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

    passport.use(new GoogleStrategy({
        callbackURL: '/api/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, () => {
            
        })
    )

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