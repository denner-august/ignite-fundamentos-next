import Head from "next/head";

import styles from "./styles.module.scss";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import prismic from "@prismicio/client";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 março de 2021</time>
            <strong>Creating a monorepo with lerna & workspaces</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos, deleniti possimus{" "}
            </p>
          </a>
          <a href="#">
            <time>12 março de 2021</time>
            <strong>Creating a monorepo with lerna & workspaces</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos, deleniti possimus{" "}
            </p>
          </a>
          <a href="#">
            <time>12 março de 2021</time>
            <strong>Creating a monorepo with lerna & workspaces</strong>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos, deleniti possimus{" "}
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType("Publication", {
    fetch: ["Publication.title", "Publication.Content"],
    pageSize: 100,
  });

  console.log(JSON.stringify(response, null, 2));
  return {
    props: {},
    revalidate: 3600,
  };
};
