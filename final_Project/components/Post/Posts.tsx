import React, { useEffect, useState } from "react";
import Link from "next/link";
import SectionPart from "./SectionPart";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
const Posts = () => {
  const [posts, setPosts] = useState();
  const [renderApp, setRenderApp] = useState(false);
  const router = useRouter();
  const loadBlog = async () => {
    const response = await axios.get("http://localhost:8080/api/blog");
    setPosts(response.data.data);
    console.log(response.data.data);
    setRenderApp(true);
  };
  useEffect(() => {
    loadBlog();
  }, []);

  // useEffect(() => {
  //   fetch("/api/getPosts")
  //     .then((response) => response.json())
  //     .then((result) => {

  //       const sortedPosts = result.sort((a, b) => {
  //         const dateA = new Date(a.date);
  //         const dateB = new Date(b.date);
  //         return dateB - dateA;
  //       });
  //       setPosts(sortedPosts);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const handleEditClick = async (e, slug) => {
    e.preventDefault();
    router.push(`/posts/${slug}`);
    console.log("hello id", slug);
  };
  return (
    <>
      {renderApp && (
        <>
          <div className="flex gap-2 flex-wrap w-full mx-auto max-w-screen-2xl ml-5">
            <section className="mt-6 ml-6 w-[70%] ">
              <h2 className="text-4xl font-bold ">Blog</h2>
              <div className="flex gap-4 flex-wrap ">
                {posts.map((post) => (
                  <div
                    key={post.blog_id}
                    className="max-w-sm mt-4 bg-white border border-gray-200 rounded-lg shadowm-2"
                  >
                    <div className="w-52">
                      <Image
                        className="rounded-t-lg w-full"
                        src={post.blog_image}
                        alt="blogimage"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="p-5 ">
                      {" "}
                      <div onClick={(e) => handleEditClick(e, post.slug)}>
                        <div>
                          <div>
                            <h5
                              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                              style={{ fontSize: "16px" }}
                            >
                              {post.blog_name}
                            </h5>
                          </div>
                          <section
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-1">
                      {/* <Link href={`/posts/${post.id}`} passHref> */}
                        <div onClick={(e) => handleEditClick(e, post.slug)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Read more
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </div>
                      {/* </Link> */}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-6 px-8 w-[25%] ">
              <SectionPart posts={posts} />
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
