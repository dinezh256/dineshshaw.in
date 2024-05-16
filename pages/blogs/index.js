import { useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import format from "date-fns/format";
import { Calendar, Clock } from "react-feather";

import AnimateText from "../../components/animateText";

import { GlobalContext } from "../../contexts";

import { blogsList, humanizeDuration } from "../../utils";

const renderBlogCard = (
  { id, slug, name, readDuration, createdAt },
  position
) => {
  const { setIsLoading } = useContext(GlobalContext);
  return (
    <Link href={`/blogs/${slug}`} as={`/blogs/${slug}`} key={id} onClick={() => setIsLoading(true)}>
      <div
        className="blog-card"
        key={id}
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
  )
};

const Blogs = () => (
  <div className="blog-section">
    <Head>
      <title>Blogs | Dinesh Shaw</title>
      <meta
        title="description"
        content="Sharing how I've overcame challenges in Software Engineering in the form of blogs"
        key="desc"
      />
    </Head>
    <AnimateText text="BLOGS" />
    <ul className="blog-list">
      {blogsList
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((blog, position) => (
          <li key={blog.id}>{renderBlogCard(blog, position)}</li>
        ))}
    </ul>
  </div>
);

export default Blogs;
