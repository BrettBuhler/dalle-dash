const { createClient } = require('@supabase/supabase-js')
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)

const getUser = async (userEmail) => {
    let {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
    if (error) {
        console.log("error in getUser:", error)
        throw new Error(error)
    }
    if (data.length > 1 || data.length === 0){
        throw new Error("Issues fetching user from DB")
    }
    return data[0]
}

module.exports = {
    addUser: async (req, res) => {
        try {
            const { email, password } = req.body 
            const isUser = await User.checkUser(email)
            if (isUser.length !== 0){
                console.log(`Email ${email} already existis.`)
                return res.status(400).json({error: "Email Already Exists"})
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const data = await User.addUser(email, hashedPassword)
            return res.status(200).json({ data : data })
        } catch (error) {
            console.log("catch error:", error)
            return res.status(500).json({error: "internal server error"})
        }
    },
    loginTwo: async (req, res) => {
        try {
            const { email, password } = req.body
            const User = await getUser(email)
            if (User) {
                const isMatch = await bcrypt.compare(password, User.password)
                if (isMatch){
                    return res.status(200).json({user: User})
                } else {
                    console.log("user.password:", User.password)
                    console.log("Hashed:", hashedPassword)
                    return res.status(400).json({error: "Invalid Password or Email"})
                }
            } else {
                return res.status(500).json({error: "unable to fetch user from db"})
            }
        } catch (error) {
            console.log("Catch Error:", error)
            return res.status(500).json({error: "internal server error"})
        }
    },
    login: (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            req.logIn(user, (err) => {
                if(err) return next(err)
                return res.json({ message: "Logged In", user: user})
            })
        })(req, res, next)
    },
    logout: (req, res, next) => {
        req.logout(function (err) {
            if (err) return next(err)
            res.setHeader('Cache-Control', 'no-store')
            res.redirect(303, '/')
        })
    },
    updateToken: async (req, res) => {
        try {
            const {id, tokens} = req.body
            const upsertData = await User.updateTokensById(id, tokens)

            if (!upsertData) {
                console.log("Upsert Error:")
                return res.status(500).json({error: "Upsert Error (updateToken)"})
            }
            return res.status(200).json({data: upsertData})
        } catch (error) {
            console.log('Catch Error:', error)
            return res.status(500).json({error: "internal server error"})
        }
    },
    getAuth: (req, res) => {
        if (req.isAuthenticated()) {
            const authenticatedUser = req.user
            return res.status(200).json({ message: "User is authenticated", user: authenticatedUser })
        } else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }
}