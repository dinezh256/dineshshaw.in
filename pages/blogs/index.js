import { useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { format } from "date-fns";
import { Calendar, Clock } from "react-feather";

import AnimateText from "../../components/animateText";

import { GlobalContext } from "../../contexts";

import { blogsList, humanizeDuration } from "../../utils";

export const BlogCard = ({ id, slug, name, readDuration, createdAt, position }) => {
  const { setIsLoading } = useContext(GlobalContext);
  return (
    <Link href={`/blogs/${slug}`} as={`/blogs/${slug}`} onClick={() => setIsLoading(true)}>
      <div
        className="blog-card"
        style={{ animationDelay: `${0.1 * (position + 1)}s` }}
      >
        <h3>{name}</h3>
        <div className="flex-start blog-meta">
          <span className="flex-start">
            <Calendar size={12} /> {format(createdAt, "PP")}
          </span>
          <span>•</span>
          <span className="flex-start">
            <Clock size={12} />
            {humanizeDuration(readDuration)} read
          </span>
        </div>
      </div>
    </Link>
  );
};

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
