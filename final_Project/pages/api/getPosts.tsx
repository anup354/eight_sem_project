// pages/api/getPosts.js (Server-side route for getting posts data)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'blogposts');

export default (req, res) => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };
  });
  res.status(200).json(allPostsData);
};
