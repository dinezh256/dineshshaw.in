import fs from "fs";
import Head from "next/head";
import Link from "next/link";
import format from "date-fns/format";
import { Calendar } from "react-feather";
import { ChevronLeft } from "react-feather";

import MarkdownRenderer from "../../components/markdownRenderer";
import { getDocBySlug, notFoundBlogMeta } from "../../utils/constants";

export default function Page({ markdownContent, meta = notFoundBlogMeta }) {
  return (
    <div className="blog-page-wrapper">
      <Head>
        <title>{meta.name} - Dinesh Shaw</title>
        <meta title="description" content={meta.description} />
      </Head>
      <div className="flex-between blogs-nav">
        <Link href="/blogs" as="/blogs" className="flex-start">
          <ChevronLeft size={22} /> Blogs
        </Link>
        {meta.createdAt > 0 && (
          <span className="flex-start">
            <Calendar size={16} /> {format(meta.createdAt, "PPP")}
          </span>
        )}
      </div>
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { file, blogMeta } = getDocBySlug(params.id);
  const markdownContent = fs.readFileSync(file, "utf-8");

  return { props: { markdownContent, meta: blogMeta } };
}

export async function getStaticPaths() {
  return {
    paths: [
      "/blogs/securely-transmit-data-in-unexpected-situations-using-react",
    ],
    fallback: true,
  };
}
