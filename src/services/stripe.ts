import Stripe from 'stripe'

export const stripe = new Stripe(
    process.env.STRIPE_AI_KEY,
    {
        apiVersion:'2020-08-27',
        appInfo:{
            name:'ignews',
            
        },
    }
)