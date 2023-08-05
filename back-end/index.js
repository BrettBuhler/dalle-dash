const express = require ("express")
const app = express()

const mainRoutes = require('./routes/mainRoutes.js')
const apiRoutes = require('./routes/apiRoutes.js')

//NOTE STRIPE WEB HOOK ROUTE MUST BE USED BEFORE BODY PARSER
app.use(express.json())

app.use(mainRoutes)
app.use('/api', apiRoutes)
app.use(express.static("build"))

const port = process.env.PORT || 5000

try {
    app.listen(port, () => {
        console.log("listening on port:", port)
    })
} catch(error) {
    throw new Error(error)
}