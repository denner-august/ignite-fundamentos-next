import { GetStaticProps } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

import Swal from "sweetalert2";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}
export default function Home({ product }: HomeProps) {
  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "LEIA COM ATENÇÃO",
      text: "essa aplicação usa o stripe como pagamento na versão TESTE então para utilizar você devera simular uma assinatura, você pode usar o numero do cartão como 4242 4242 4242 4242 codigo 567 e data 12/37 o resto é so preencher de acordo com o campo pedido, alem disso é nessario uma conta no github",
      confirmButtonText: "Confirmar",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News abourt the <span>React</span> world.
          </h1>
          <p>
            Git acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="girl coding"
          width={1200}
          height={1100}
        />

        {/* <img src="/images/avatar.svg" alt="girl coding" /> */}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KVNf4If8fqqQ71Ye4UgJ8Rg");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: { product },

    revalidate: 60 * 60 * 24, //24 hours
  };
};
