const express = require('express')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const router = express()
const endpointSecret = (process.env.ENDPOINT_SECRET)
const axios = require('axios')

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
    console.log('im alive')
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log('catch err', err)
      response.status(400).send(`Webhook Error here: ${err.message}`);
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
        const user_id = event.data.object.metadata.user_id
        const total = 500
        const payment_email = "test"//event.data.customer_details.email
        console.log('total:',total, 'payment_email:', payment_email, 'user_id', parseInt(user_id))
        try {
            const res1 = await axios.post('https://dalle-dash.uc.r.appspot.com/api/updatetoken', {id: parseInt(user_id), tokens: 50})
            const res2 = await axios.post('https://dalle-dash.uc.r.appspot.com/api/addpayment', {user_id: parseInt(user_id), payment_email: payment_email, cents_cad: total})
            if (res1 && res2){
                response.status(200).send('tokens added and payment added')
            }
        } catch (error) {
            console.log('catch error in web hook:', error)
        }
        break
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send('bottom');
  });

  module.exports = router