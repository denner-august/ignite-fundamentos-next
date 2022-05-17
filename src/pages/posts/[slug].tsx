import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import Head from "next/head";
import Styles from "./post.module.scss";

interface postsProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: postsProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>

      <main className={Styles.container}>
        <article className={Styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={Styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.ActiveSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("Publication", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.Content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
