const { ensureAuth } = require("../middleware/auth.js")

const express = require ("express")
const router = express.Router()

const path = require("path")

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"))
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/dashboard', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"))
})

router.get('/generate', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", 'index.html'))
})

router.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, "../build", 'index.html'))
})

router.get('/communitygallery', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", 'index.html'))
})

router.get('/mygallery', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", 'index.html'))
})

module.exports = router