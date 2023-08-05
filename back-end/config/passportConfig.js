const passport = require("passport")
const User = require("../models/User.js")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.getUser(username)
            const isMatch = bcrypt.compare(password, user.password)
            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false, {message: "incorrect username or password"})
            }
        } catch (error) {
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    const user = await User.getUserById(id)
    done(null, user)
})

module.exports = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())
    console.log("at bottom")
}