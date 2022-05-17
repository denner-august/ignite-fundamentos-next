import { SingInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../Activelink";
import Image from "next/image";
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" height={100} width={100} />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>post</a>
          </ActiveLink>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
}
