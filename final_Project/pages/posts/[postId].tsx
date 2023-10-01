import React from "react";
import { getPostData, getSortedPostsData } from "../../lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import getFormattedDate from "../../lib/getFormattedDate";

export async function getStaticPaths() {
  const posts = getSortedPostsData();

  const paths = posts.map((post) => ({
    params: { postId: post.id },
  }));

  return {
    paths,
    fallback: false, // Set to true if you want to enable fallback for missing pages
  };
}

export async function getStaticProps({ params }) {
  const { postId } = params;
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);
  const pubDate = getFormattedDate(date);

  return {
    props: {
      post: {
        title,
        date,
        contentHtml,
      },
    },
  };
}

const Post = ({ post }) => {
  const { title, date, contentHtml } = post;
  const pubDate = getFormattedDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto flex">
      <section className="m-6  flex-7/10 bg-purple-200">
        <img
          className="rounded-t-lg m-6"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt=""
          style={{ height: "40%" ,width:"40%"}}
        />
        <h1 className="text-3xl mt-4 mb-0 text-purple-800 ml-6">{title}</h1>
        <p className="mt-0 ml-6 text-purple-600">{pubDate}</p>
        <article className="ml-6">
          <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <p>
            <Link href="/Blog" className="text-purple-800 underline">← Back </Link>
          </p>
        </article>
      </section>
    </main>
  );
};

export default Post;
