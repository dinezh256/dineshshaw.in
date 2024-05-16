import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import format from "date-fns/format";
import { Calendar, Eye, Share2 } from "react-feather";
import { ChevronLeft } from "react-feather";
import { RWebShare } from "react-web-share";
import fs from "fs";

import MarkdownRenderer from "../../components/markdownRenderer";
import { GlobalContext } from "../../contexts";

import {
  blogsList,
  getDocBySlug,
  notFoundBlogMeta,
  getBlogUrl,
} from "../../utils";
import { getBlogViews, updateBlogViews } from "../../api";
import { useLocalStorage } from "../../hooks";

const TIME_DIFF = 60 * 60 * 1000; // 1 hour

export default function Page({ markdownContent, meta = notFoundBlogMeta, id, initialViews }) {
  const [viewsCount, setViewsCount] = useState(initialViews)
  const { setIsLoading } = useContext(GlobalContext);
  const [lastViewedOnLS, setLastViewedOnLS] = useLocalStorage("lastViewedOn")
  const sharableData = {
    url: getBlogUrl(meta.slug),
    text: meta.name,
    title: meta.name,
  };

  useEffect(() => {
    setIsLoading(false);
    setTimeout(incrementViews, 1000);
  }, [])

  const incrementViews = async () => {
    if (typeof window === 'undefined') return;

    const lastViewedOn = (lastViewedOnLS || {})[id]
    const now = + new Date()

    if (lastViewedOn && (now - lastViewedOn < TIME_DIFF)) return;

    const { success, data } = await updateBlogViews(id);
    if (success) {
      setViewsCount(data?.count);

      setLastViewedOnLS({ ...(lastViewedOnLS || {}), [id]: +new Date() })
    }
  }

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
        <div className="blogs-meta">
          <h6 className="flex-start">
            <Eye size={16} /> {viewsCount}
          </h6>
          <div className="divider" />
          {meta.createdAt > 0 && (
            <h6 className="flex-start">
              <Calendar size={16} /> {format(meta.createdAt, "PP")}
            </h6>
          )}
        </div>
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

  const { success, data } = await getBlogViews(blogMeta.id)

  return { props: { markdownContent, meta: blogMeta, id: blogMeta.id, initialViews: success ? data.count : 0 } };
}

export async function getStaticPaths() {
  return {
    paths: blogsList.map((blog) => `/blogs/${blog.slug}`),
    fallback: true,
  };
}
