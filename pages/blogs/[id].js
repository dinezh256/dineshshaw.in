import Head from "next/head";
import Link from "next/link";
import format from "date-fns/format";
import { Calendar, Share2 } from "react-feather";
import { ChevronLeft } from "react-feather";
import { RWebShare } from "react-web-share";
import fs from "fs";

import MarkdownRenderer from "../../components/markdownRenderer";
import {
  blogsList,
  getDocBySlug,
  notFoundBlogMeta,
  getBlogUrl,
} from "../../utils";

export default function Page({ markdownContent, meta = notFoundBlogMeta }) {
  const sharableData = {
    url: getBlogUrl(meta.slug),
    text: meta.name,
    title: meta.name,
  };

  return (
    <div className="blog-page-wrapper">
      <Head>
        <title>{`${meta.name} | Dinesh Shaw`}</title>
        <meta title="description" content={meta.description} key="desc" />
        <meta name="keywords" content={meta.keywords}></meta>
        <meta property="og:title" content={meta.name + " | Dinesh Shaw"} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={sharableData.url} />
      </Head>
      <Link href="/blogs" as="/blogs" className="flex-start back-to-blogs">
        <ChevronLeft size={20} /> <span>Back</span>
      </Link>
      <div className="blogs-nav">
        {meta.createdAt > 0 && (
          <h6 className="flex-start">
            <Calendar size={16} /> {format(meta.createdAt, "PP")}
          </h6>
        )}
        <RWebShare data={sharableData}>
          <div
            title="Share this blog"
            className="blogs-share flex-start"
            tabIndex={0}
          >
            <Share2 size={16} />
          </div>
        </RWebShare>
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
    paths: blogsList.map((blog) => `/blogs/${blog.slug}`),
    fallback: true,
  };
}
