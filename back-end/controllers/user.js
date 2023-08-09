const { createClient } = require('@supabase/supabase-js')
const { Configuration, OpenAIApi} = require('openai')
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const axios = require('axios')
require('dotenv').config()

const MY_DOMAIN = process.env.MY_DOMAIN

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

const downloadImage = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return response.data
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
            const response = await User.addUser(email, hashedPassword)
            console.log(response)
            if (response.id) {
                return res.status(200).json({ user : response })
            }
            return res.status(500).json({error: "Error adding user"})
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
    },
    genImage: async (req, res) => {
        const {id, prompt, n, size} = req.body
        const config = new Configuration({
            apiKey: process.env.DALLE_KEY
        })
        const openai = new OpenAIApi(config)
        try {
            const response = await openai.createImage({
                prompt: prompt,
                n: n,
                size: size
            })
            if (response.data.data) {
                return res.status(200).json({url: response.data.data[0].url})
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Internal Server Error"})
        }
    },
    addImgToDb: async (req, res) => {
        try {
            const {id, prompt, url} = req.body
            const imageData = await downloadImage(url)
            const filename = `image_${Date.now()}.jpg`
            const { publicURL, error } = await supabase.storage
                .from('images')
                .upload(filename, imageData)
                if (error) {
                    console.error(error)
                    return res.status(500).json({error: error, message: "server error adding image to storage"})
                } else {
                    const didAdd = await User.addImage(id, prompt, filename)
                    if (didAdd) {
                        console.log('image added')
                    } else {
                        console.log('image db upload failed')
                    }
                    return res.status(200).json({message: `${didAdd ? "success" : "failed"}`})
                }

        } catch (error) {
            console.error("Catch Error:", error)
            return res.status(500).json({error: error})
        }
    },
    saveImg : async (req, res) => {
        try {
            const imageData = await downloadImage('https://oaidalleapiprodscus.blob.core.windows.net/private/org-rcyp6JnunICAFoNKvi5SN42Y/user-00cEez4D0tPQAqdh6QsRAHyc/img-UpuY1P1dRjxGaUCH5hbHYwQG.png?st=2023-08-06T02%3A32%3A49Z&se=2023-08-06T04%3A32%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-05T07%3A28%3A02Z&ske=2023-08-06T07%3A28%3A02Z&sks=b&skv=2021-08-06&sig=sdH9PhxHPpA6LKfot8ILv9E/T6ZZdmdZd8YME7RWYsg%3D')
            const filename = `image_${Date.now()}.jpg`
            const { publicURL, error } = await supabase.storage
                        .from('images')
                        .upload(filename, imageData)
            console.log(publicURL)
        } catch (err) {
            console.log('er', err)
            return res.status(500)
        }
    },
    getImage: async (req, res) => {
        try{
            const {img_name} = req.body
            console.log(img_name)
            const {data, error} = await supabase.storage.from('images').createSignedUrl(`/${img_name}`, 600)
            if (error) {
                console.log('getImage err:', error)
                return res.status(500).json({err: error})
            }
            console.log(data)

            return res.status(200).json({data: data})
            } catch (error) {
                console.log("Catch Error:", error)
                res.status(500).json({CatchError: error})
            }
    },
    getImagesById: async (req, res) => {
        const {id} = req.body
        try {
            const response = await User.getImageById(id)
            return res.status(200).json({'data': response})
        } catch (error) {
            console.log('catch error:', error)
            return res.status(500).json({'error': error})
        }
    },
    getImagesNoId: async (req, res) => {
        try {
            const response = await User.getImageNoId()
            return res.status(200).json({'data': response})
        } catch (error) {
            console.log('catch error:', error)
            return res.status(500).json({'error': error})
        }
    },
    addPayment: async (req, res) => {
        try {
            const {user_id, payment_email, cents_cad} = req.body
            console.log('in addPayment')
            const response = await User.addPayment(user_id, payment_email, cents_cad)
            if (response){
                return res.status(200).json({message: 'payment added'})
            } else {
                return res.status(500).json({message: "internal server error failed to add payment"})
            }
        } catch (error) {
            console.log('catch error:', error)
            return res.status(500).json({error: error})
        }
    }
}