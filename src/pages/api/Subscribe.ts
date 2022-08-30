import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";

type UserProps = {
  ref: {
    id: string;
  };

  data: {
    stripe_customer_id: string;
  };
};

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    session.user;

    const user = await fauna.query<UserProps>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
    );

    let customerId = user.data.stripe_customer_id;

    try {
      if (!customerId) {
        const stripeCustomer = await stripe.customers.create({
          email: session.user.email,
        });

        await fauna.query(
          q.Update(q.Ref(q.Collection("users"), user.ref.id), {
            data: {
              stripe_customer_id: stripeCustomer.id,
            },
          })
        );

        customerId = stripeCustomer.id;
      }
    } catch (error) {
      console.log("erro durante o cadastro do usuario", error);
    }
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1KVNf4If8fqqQ71Ye4UgJ8Rg", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  }
  res.setHeader("ALLOW", "POST");
  res.status(405).end("Metho not allowed");
}
