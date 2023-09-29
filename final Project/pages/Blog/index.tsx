// pages/blog/index.js

import React from 'react';
import Link from 'next/link';

const index = () => {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        <li>
        <Link href="/Blog/post1">My First Blog Post</Link>

        </li>
        {/* Add more list items for other blog posts */}
      </ul>
    </div>
  );
};

export default index;
