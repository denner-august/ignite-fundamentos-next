import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import subscribe from "../../pages/api/subscribe";
interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  function headSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    // checkout session
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
