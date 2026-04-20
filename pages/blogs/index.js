import { useContext } from "react";
import Head from "next/head";
import AnimateText from "../../components/animateText";
import BlogCard from "../../components/blogListCard";
import MinimalBlogs from "../../components/minimal/minimalBlogs";
import { GlobalContext } from "../../contexts";
import { blogsList } from "../../utils";

const Blogs = () => {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);

  return (
    <>
      <Head>
        <title>Blogs | Dinesh Shaw</title>
        <meta
          name="description"
          content="Writing about frontend engineering, React, and things I've figured out the hard way."
          key="desc"
        />
        <link rel="canonical" href="https://dineshshaw.in/blogs" />
      </Head>

      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only">
          <MinimalBlogs />
        </div>
      )}
      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only">
          <div className="blogs-section">
            <AnimateText text="BLOGS" />
            <ul className="blog-list">
              {blogsList.map((blog, position) => (
                <li key={blog.id}>
                  <BlogCard {...blog} position={position} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
