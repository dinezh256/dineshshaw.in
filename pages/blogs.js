import Link from "next/link";
import Head from "next/head";
import format from "date-fns/format";
import { Calendar, Clock } from "react-feather";

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
            <h3>{name}</h3>
            <div className="flex-start blog-meta">
              <span className="flex-start">
                <Calendar size={12} /> {format(createdAt, "PPP")}
              </span>
              <span>•</span>
              <span className="flex-start">
                <Clock size={12} />
                {humanizeDuration(readDuration)} read
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Blogs;
