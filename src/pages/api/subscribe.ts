import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from '../../services/stripe';

export default async (req:NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST'){
        const session = await getSession({req})
        session.user

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            //metadade
        })


        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer:stripeCustomer.id ,
            payment_method_types:['card'],
            billing_address_collection:'required',
            line_items: [
                {price: 'price_1KVNf4If8fqqQ71Ye4UgJ8Rg', quantity:1}
            ],
            mode:'subscription',
            allow_promotion_codes:true,
            success_url:process.env.STRIPE_SUCESS_URL,
            cancel_url:process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sessionId:stripeCheckoutSession.id})
    }
    res.setHeader('ALLOW', 'POST')  
    res.status(405).end('Metho not allowed')
}