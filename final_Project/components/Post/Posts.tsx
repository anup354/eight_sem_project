import React, { useEffect, useState } from "react";
import Link from "next/link";
import SectionPart from "./SectionPart";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/getPosts") // Replace with your actual API route URL
      .then((response) => response.json())
      .then((result) => {
        // Sort the posts by date in descending order (most recent first)
        const sortedPosts = result.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex">
      <section className="mt-6  flex-7/10" style = {{ marginLeft:"125px" }}>
        <h2 className="text-4xl font-bold dark:text-white/90  m-4">Blog</h2>
        <div className="flex flex-wrap ml-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2"
              style={{ height: "400px" }} // Set a fixed height for the card
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  alt=""
                />
              </a>
              <div className="p-5" style={{ height: "15%" }}>
                {" "}
                {/* Set a fixed height for the header */}
                <Link href={`/posts/${post.id}`} passHref>
                  <div>
                    <div>
                      <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        style={{ fontSize: "16px" }}
                      >
                        {post.title }...........
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="p-5">
                {" "}
                {/* Set a fixed height for the content */}
                {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {post.date}
                </p> */}
                <Link href={`/posts/${post.id}`} passHref>
                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-6 ml-6 flex-3/10 px-8">
      <SectionPart posts={posts} />
      </section>
    </div>
  );
};

export default Posts;
