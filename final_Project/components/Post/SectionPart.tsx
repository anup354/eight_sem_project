import React from 'react'

const SectionPart = ({posts}) => {
  console.log(posts);
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
          <div className="flex items-center justify-between mb-4 ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Blog Posts
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {posts.map((post) => (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src= {post.blog_image}
                        alt="Author image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {post.author}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {post.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <a
                     href={`/posts/${post.id}`} 
                      class="text-lg font-bold leading-6 text-gray-900 dark:text-white hover:underline"
                    >
                      {post.blog_name}
                    </a>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
  )
}

export default SectionPart
