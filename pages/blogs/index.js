import Head from "next/head";

import AnimateText from "../../components/animateText";
import BlogCard from "../../components/blogCard";

import { blogsList } from "../../utils";

const Blogs = () => (
  <div className="blogs-section">
    <Head>
      <title>Blogs | Dinesh Shaw</title>
      <meta
        name="description"
        content="Writing about frontend engineering, React, and things I've figured out the hard way."
        key="desc"
      />
      <link rel="canonical" href="https://dineshshaw.in/blogs" />
    </Head>
    <AnimateText text="BLOGS" />
    <ul className="blog-list">
      {blogsList.map((blog, position) => (
        <li key={blog.id}><BlogCard {...blog} position={position} /></li>
      ))}
    </ul>
  </div>
);

export default Blogs;
