const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20');
const bcrypt = require('bcrypt')
const User = require('../models/User')
const keys = require('./credentials')

module.exports = function(passport){

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
                if(!user) return done(null, false, {message: "E-MAIL INEXISTENTE"});
                if(!isValidPassword(password, user.password)){
                    return done(null, false, {
                        message: 'SENHA INCORRETA'
                    })
                }
                console.log(user)
                return done(null, user)
            }).catch((err) => {
                return done(null, false, {
                    message: 'ALGO DEU ERRADO'
                });
            });
        }
    ));

    passport.use(new GoogleStrategy({
        callbackURL: '/api/auth/google/callback',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        }, (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({
                where: {email: profile.emails[0].value},
                defaults: {
                    name: profile.displayName,
                    email: profile.emails[0].value
                }
            }).then((user) => {
                return done(null, user[0]);
            }).catch((err) => {
                return done(err, null);
            });
        }
    ));

}