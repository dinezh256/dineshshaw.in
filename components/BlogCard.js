import Link from "next/link";
import { useContext } from "react";
import { Calendar, Clock } from "react-feather";
import { format } from "date-fns";

import { GlobalContext } from "../contexts";
import { humanizeDuration } from "../utils";

const BlogCard = ({ id, slug, name, readDuration, createdAt, position }) => {
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

export default BlogCard;
