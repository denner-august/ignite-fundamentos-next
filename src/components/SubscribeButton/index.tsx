import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/Stripe-js";
interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function headSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/Subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
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
