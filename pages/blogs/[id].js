import { useContext, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import Head from "next/head";
import Link from "next/link";
import { format } from "date-fns";
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
import { BlogCard } from ".";
import { getBlogViews, updateBlogViews } from "../../api";
import { useLocalStorage } from "../../hooks";

const TIME_DIFF = 6 * 60 * 60 * 1000; // 6 hours

export default function Page({ markdownContent, meta = notFoundBlogMeta, id }) {
  const [viewsCount, setViewsCount] = useState(0);
  const [isFetchingViews, setIsFetchingViews] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setIsLoading } = useContext(GlobalContext);
  const [lastViewedOnLS, setLastViewedOnLS] = useLocalStorage("lastViewedOn")

  const abortControllerRef = useRef(new AbortController());

  const sharableData = {
    url: getBlogUrl(meta.slug),
    text: meta.name,
    title: meta.name,
  };

  const fetchViews = async () => {
    setIsFetchingViews(true);
    const { success, data } = await getBlogViews(id, abortControllerRef.current.signal);
    if (success) setViewsCount(data.count);
    setIsFetchingViews(false);
  };

  const incrementViews = async () => {
    if (typeof window === 'undefined') return;

    const lastViewedOn = (lastViewedOnLS || {})[id];
    const now = +new Date();

    if (lastViewedOn && (now - lastViewedOn < TIME_DIFF)) return;

    const { success, data } = await updateBlogViews(id, abortControllerRef.current.signal);
    if (success) {
      setViewsCount(data?.count);
      setLastViewedOnLS({ ...(lastViewedOnLS || {}), [id]: +new Date() });
    }
  };

  useEffect(() => {
    fetchViews();
    const incrementTimer = setTimeout(incrementViews, 1000);

    const controller = abortControllerRef.current;
    return () => {
      clearTimeout(incrementTimer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="blog-page-wrapper" key={id}>
      <div
        className="reading-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden
      />
      <Head>
        <title>{`${meta.name} | Dinesh Shaw`}</title>
        <meta name="description" content={meta.description} key="desc" />
        <meta name="keywords" content={meta.keywords}></meta>
        <meta property="og:title" content={meta.name + " | Dinesh Shaw"} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={sharableData.url} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://dineshshaw.in/logo512.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={sharableData.url} />
      </Head>
      <Link href="/blogs" as="/blogs" className="flex-start back-to-blogs">
        <ChevronLeft size={20} /> <span>Back</span>
      </Link>
      <div className="blogs-nav">
        <div className="blogs-meta">
          <h6 className="flex-start">
            <Eye size={16} className={clsx({ fadeInOut: isFetchingViews })} />
            {viewsCount}
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
            aria-label="Share this blog"
            className="blogs-share flex-start"
            tabIndex={0}
            role="button"
          >
            <Share2 size={16} />
          </div>
        </RWebShare>
      </div>

      <div className="markdown">
        <MarkdownRenderer content={markdownContent} />
      </div>
      <div className="blog-recommendations">
        <h2>You might also like</h2>
        <ul className="blog-list">
          {blogsList
            .filter(b => b.id !== id)
            .slice(0, 2)
            .map((blog, position) => (
              <li key={blog.id}><BlogCard {...blog} position={position} /></li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { file, blogMeta } = getDocBySlug(params.id);
  const markdownContent = fs.readFileSync(file, "utf-8");

  return { props: { markdownContent, meta: blogMeta, id: blogMeta.id } };
}

export async function getStaticPaths() {
  return {
    paths: blogsList.map((blog) => `/blogs/${blog.slug}`),
    fallback: false,
  };
}
