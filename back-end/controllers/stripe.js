require('dotenv').config
const stripe = require('stripe')(process.env.STRIPE_KEY)

module.exports = {
    createCheckoutSession: async (req, res) => {
       try {
        const {user_id} = req.body
        console.log(req.body)
        console.log(user_id)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `price_1Nd1LYKI3ueQeOm3CDwsYjhd`,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `${process.env.MY_DOMAIN}/shop?success=true`,
            cancel_url: `${process.env.MY_DOMAIN}/shop?canceled=true`,
            metadata: {user_id: user_id}
        })
        res.redirect(303, session.url)
       } catch (error) {
        console.log('catch error:', error)
        res.status(500).json({error: error})
       }
    }
}