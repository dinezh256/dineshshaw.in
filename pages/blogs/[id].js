import { useEffect, useRef, useState, useContext } from "react";
import { clsx } from "clsx";
import { GlobalContext } from "../../contexts";
import Head from "next/head";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Eye, Share2 } from "react-feather";
import { ChevronLeft } from "react-feather";
import { RWebShare } from "react-web-share";
import fs from "fs";

import MarkdownRenderer from "../../components/markdownRenderer";
import MinimalFooter from "../../components/minimal/minimalFooter";
import { prepareWithSegments, measureNaturalWidth } from "@chenglou/pretext";

import {
  blogsList,
  getDocBySlug,
  notFoundBlogMeta,
  getBlogUrl,
} from "../../utils";
import BlogCard from "../../components/blogListCard";
import { getBlogViews, updateBlogViews, isViewsCached } from "../../api";
import { useLocalStorage } from "../../hooks";

const TIME_DIFF = 6 * 60 * 60 * 1000; // 6 hours

export default function Page({ markdownContent, meta = notFoundBlogMeta, id }) {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);
  const [viewsCount, setViewsCount] = useState(0);
  const [viewerTextWidth, setViewerTextWidth] = useState(0);
  const [isFetchingViews, setIsFetchingViews] = useState(false);
  const [lastViewedOnLS, setLastViewedOnLS] = useLocalStorage("lastViewedOn");

  const abortControllerRef = useRef(new AbortController());

  const sharableData = {
    url: getBlogUrl(meta.slug),
    text: meta.name,
    title: meta.name,
  };

  const fetchViews = async () => {
    const cached = isViewsCached(id);
    if (!cached) setIsFetchingViews(true);
    const { success, data } = await getBlogViews(
      id,
      abortControllerRef.current.signal,
    );
    if (success) setViewsCount(data.count);
    if (!cached) setIsFetchingViews(false);
  };

  const incrementViews = async () => {
    if (typeof window === "undefined") return;

    const lastViewedOn = (lastViewedOnLS || {})[id];
    const now = +new Date();

    if (lastViewedOn && now - lastViewedOn < TIME_DIFF) return;

    const { success, data } = await updateBlogViews(
      id,
      abortControllerRef.current.signal,
    );
    if (success) {
      setViewsCount(data?.count);
      setLastViewedOnLS({ ...(lastViewedOnLS || {}), [id]: +new Date() });
    }
  };

  useEffect(() => {
    abortControllerRef.current = new AbortController();
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
    function updateWidth() {
      if (typeof window !== "undefined") {
        try {
          const fontStack = isMinimal
            ? '500 14px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif'
            : '500 14px "IBM Plex Sans", sans-serif';

          const prepared = prepareWithSegments(
            viewsCount.toString(),
            fontStack,
          );
          setViewerTextWidth(measureNaturalWidth(prepared));
        } catch (err) {
          console.error("Failed to measure text width with pretext:", err);
        }
      }
    }
    updateWidth();
  }, [viewsCount, isMinimal]);

  // Clean the title from the markdown to prevent duplicate rendering since we show it in the header
  const cleanMarkdown = markdownContent.replace(/^#+\s+.*(\r?\n)+/, "");

  return (
    <>
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

      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only minimal-page">
          <nav className="mn-nav" aria-label="Minimal Navigation">
            <Link href="/">About</Link>
            <Link href="/work">Work</Link>
            <Link href="/blogs" className="active" aria-current="page">
              Blogs
            </Link>
          </nav>

          <header className="mn-header" style={{ marginBottom: "16px" }}>
            <div className="mn-name" style={{ fontSize: "28px" }}>
              {meta.name}
            </div>
            <div
              className="mn-blog-meta"
              style={{
                marginTop: "12px",
                display: "flex",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <span>
                {meta.createdAt > 0
                  ? format(meta.createdAt, "MMM d, yyyy")
                  : ""}
              </span>
              <span className="mn-meta-sep">·</span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Eye
                  size={14}
                  className={clsx({ fadeInOut: isFetchingViews })}
                  aria-hidden="true"
                />
                <span
                  className="views-count-span"
                  style={{
                    width:
                      viewerTextWidth > 0 ? `${viewerTextWidth}px` : "auto",
                  }}
                >
                  {viewsCount}
                </span>{" "}
                views
              </span>
              <span className="mn-meta-sep">·</span>
              <RWebShare data={sharableData}>
                <button
                  className="mn-share-btn"
                  type="button"
                  aria-label="Share this blog"
                  title="Share"
                >
                  <Share2 size={14} aria-hidden="true" />
                </button>
              </RWebShare>
            </div>
          </header>

          <div className="mn-divider" style={{ marginBottom: "32px" }} />

          <div className="mn-markdown" style={{ marginTop: 0 }}>
            <MarkdownRenderer content={cleanMarkdown} />
          </div>

          <MinimalFooter />
        </div>
      )}

      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only blog-page-wrapper">
          <Link href="/blogs" as="/blogs" className="flex-start back-to-blogs">
            <ChevronLeft size={20} /> <span>Back</span>
          </Link>
          <div className="blogs-nav">
            <div className="blogs-meta">
              <h6 className="flex-start">
                <Eye
                  size={16}
                  className={clsx({ fadeInOut: isFetchingViews })}
                />
                <span
                  className="views-count-span"
                  style={{
                    width:
                      viewerTextWidth > 0 ? `${viewerTextWidth}px` : "auto",
                  }}
                >
                  {viewsCount}
                </span>
              </h6>
              <div className="divider" />
              {meta.createdAt > 0 && (
                <h6 className="flex-start">
                  <Calendar size={16} aria-hidden="true" />{" "}
                  {format(meta.createdAt, "PP")}
                </h6>
              )}
            </div>
            <RWebShare data={sharableData}>
              <button
                type="button"
                title="Share this blog"
                aria-label="Share this blog"
                className="blogs-share flex-start"
              >
                <Share2 size={16} aria-hidden="true" />
              </button>
            </RWebShare>
          </div>

          <div className="markdown">
            <MarkdownRenderer content={markdownContent} />
          </div>
          <div className="blog-recommendations">
            <h2>You might also like</h2>
            <ul className="blog-list">
              {blogsList
                .filter((b) => b.id !== id)
                .slice(0, 2)
                .map((blog, position) => (
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
