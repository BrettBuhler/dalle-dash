const express = require('express')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const router = express()
const endpointSecret = (process.env.ENDPOINT_SECRET)
const axios = require('axios')
const User = require('../models/User.js')

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature']
  
    let event
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
    } catch (err) {
        console.log('catch err', err)
      response.status(400).send(`Webhook Error: ${err.message}`)
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        //const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      case 'checkout.session.completed':
        console.log(event.data.object)
        const user_id = event.data.object.metadata.user_id
        const total = 500
        const payment_email = event.data.object.customer_details.email
        console.log('total:',total, 'payment_email:', payment_email, 'user_id', parseInt(user_id))
        try {
            const res1 = await User.updateTokensById(parseInt(user_id), 50)
            const res2 = await User.addPayment(parseInt(user_id), payment_email, total)
        } catch (error) {
            console.log('catch error in web hook:', error)
        }
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send('')
  })

  module.exports = router