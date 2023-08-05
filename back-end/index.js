const express = require ("express")
const app = express()
const path = require("path")

app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./build", "index.html"))
})

app.use(express.static("build"))

const port = process.env.PORT || 5000

try {
    app.listen(port, () => {
        console.log("listening on port:", port)
    })
} catch(error) {
    throw new Error(error)
}