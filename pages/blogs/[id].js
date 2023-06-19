import fs from "fs";
import Head from "next/head";
import Link from "next/link";
import format from "date-fns/format";
import { Calendar } from "react-feather";
import { ChevronLeft } from "react-feather";

import MarkdownRenderer from "../../components/markdownRenderer";
import {
  blogsList,
  getDocBySlug,
  notFoundBlogMeta,
} from "../../utils/constants";

export default function Page({ markdownContent, meta = notFoundBlogMeta }) {
  return (
    <div className="blog-page-wrapper">
      <Head>
        <title>{meta.name} - Dinesh Shaw</title>
        <meta title="description" content={meta.description} />
      </Head>
      <div className="back-to-blogs">
        <Link href="/blogs" as="/blogs" className="flex-start">
          <ChevronLeft size={20} /> Back
        </Link>
      </div>
      <div className="flex-between blogs-nav">
        {meta.createdAt > 0 && (
          <h6 className="flex-start">
            <Calendar size={16} /> {format(meta.createdAt, "PPP")}
          </h6>
        )}
      </div>

      <div className="markdown">
        <MarkdownRenderer content={markdownContent} />
      </div>
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
    paths: blogsList.map(blog => `/blogs/${blog.slug}`),
    fallback: true,
  };
}
