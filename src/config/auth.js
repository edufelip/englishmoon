const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        }, 
        function(email, password, done) {
        const User = user;
        const isValidPassword = function (userpassword, password){
            return bcrypt.compare(password, userpassword);
        }
        async function findUser(email){
            const user = await User.findOne({
                where: {email: email}
            })
            if(user) return user;
            return false;
        }
        user = findUser(email);
        if(!user) return done(null, false, {message: 'account does not exist'})
        if(!isValidPassword(user.password, password)) return done(null, false, {message: 'incorrect password'})
        return done(null, user);
        User.findOne({
            where: {email: email}
        }).then((user) => {
            if(!user) return done(null, false, {message: "account does not exist"});
            if(!isValidPassword(user.password, password)){
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
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: {id: id}
        }).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        })
    })    
}