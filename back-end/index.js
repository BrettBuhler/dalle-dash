const express = require ("express")
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()
const crypto = require('crypto')
const app = express()


app.use(
    session({
        secret: process.env.PASSPORT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)
require('./config/passportConfig.js')(app)

const mainRoutes = require('./routes/mainRoutes.js')
const apiRoutes = require('./routes/apiRoutes.js')
const stripeRoutes = require('./routes/stripeRoutes.js')
const webhookRoutes = require('./routes/webhook.js')

app.use(webhookRoutes)



//NOTE STRIPE WEB HOOK ROUTE MUST BE USED BEFORE BODY PARSER
app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(mainRoutes)
app.use('/api', apiRoutes)
app.use(stripeRoutes)


app.use(express.static("build", {
    maxAge: '1h',
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            const version = '4950065f'; // Generate a unique identifier
            const etag = crypto.createHash('md5').update(version).digest('hex');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.setHeader('ETag', etag);
        }
    }
}));

const port = process.env.PORT || 5000

try {
    app.listen(port, () => {
        console.log("listening on port:", port)
    })
} catch(error) {
    throw new Error(error)
}