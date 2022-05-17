import { getSession, useSession } from "next-auth/react";
import { GetStaticProps } from "next/types";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import Head from "next/head";
import Styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();

  const Router = useRouter();

  useEffect(() => {
    if (session?.ActiveSubscription) {
      Router.push(`/posts/${post.slug}`);
    }
  }, [Router, post.slug, session]);

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
            className={`${Styles.postContent} ${Styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={Styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("Publication", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.Content.splice(0, 3)),
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
    revalidate: 60 * 24, // revalidate every 24 hours
  };
};
