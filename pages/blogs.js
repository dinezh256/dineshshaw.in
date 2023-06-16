import Link from "next/link";
import Head from "next/head";
import format from "date-fns/format";

import { blogsList, humanizeDuration } from "../utils/constants";

const Blogs = () => (
  <div className="blog-section">
    <Head>
      <title>Blogs - Dinesh Shaw</title>
      <meta title="description" content="" />
    </Head>
    <h1>BLOGS</h1>

    <div className="blog-list">
      {blogsList.map(({ id, slug, name, readDuration, createdAt }) => (
        <Link href={`/blogs/${slug}`} as={`/blogs/${slug}`}>
          <div className="blog-card" key={id}>
            <span>{name}</span>
            <div className="blog-meta">
              <span>{format(createdAt, "PPP")}</span>
              <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
              <span>{humanizeDuration(readDuration)} read</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Blogs;
