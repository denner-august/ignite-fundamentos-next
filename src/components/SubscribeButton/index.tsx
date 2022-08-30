import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/Stripe-js";
import { useRouter } from "next/router";
interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const Router = useRouter();

  async function headSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.ActiveSubscription) {
      Router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/Subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log("erro durante o redirect do stripe", err);
    }
  }

  return (
    <button
      type="button"
      className={styles.SubscribeButton}
      onClick={headSubscribe}
    >
      subscribe now
    </button>
  );
}
