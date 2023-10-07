import React, { useEffect, useState } from "react";
import { getPostData, getSortedPostsData } from "../../lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import getFormattedDate from "../../lib/getFormattedDate";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const index = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [renderApp, setRenderApp] = useState(false);

  const loadData = async (slug) => {
    console.log(slug);
    const response = await axios.get(
      `http://localhost:8080/api/blogbyslug/${slug}`
    );
    console.log(response);
    setData(response.data.data);
    setRenderApp(true);
  };

  useEffect(() => {
    if (router.isReady) {
      loadData(router.query.index);
    }
  }, [router.isReady, router.query.index]);

  return (
    <>
      {renderApp && (
        <>
          <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto flex">
            <section className="m-6  flex-7/10 border">
              <Image
                className="rounded-t-lg m-6"
                src={data.blog_image}
                alt="img"
                width={200}
                height={200}
                // style={{ height: "40%", width: "40%" }}
              />
              <p className="mt-0 ml-6 text-purple-600">{data.date}</p>
              <h1 className="text-3xl mt-4 mb-0 text-purple-800 ml-6">
                {data.blog_name}
              </h1>
             
              <article className="ml-6 mt-2">
                <section
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </article>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default index;
