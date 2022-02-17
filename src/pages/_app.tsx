import { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/Global.scss";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
