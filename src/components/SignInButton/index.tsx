import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
export function SingInButton() {
  const { data: session, status } = useSession();

  return session ? (
    <button
      type="button"
      className={styles.SingInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.SingInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sing in with Github
    </button>
  );
}
