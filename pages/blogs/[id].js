import { measureNaturalWidth, prepareWithSegments } from "@chenglou/pretext";
import { clsx } from "clsx";
import { format } from "date-fns";
import fs from "fs";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { useContext, useEffect, useRef, useState } from "react";
import { Eye, Share2 } from "react-feather";
import { RWebShare } from "react-web-share";
import { getBlogViews, isViewsCached, updateBlogViews } from "../../api";
import MarkdownRenderer from "../../components/markdownRenderer";
import MinimalFooter from "../../components/minimal/minimalFooter";
import { GlobalContext } from "../../contexts";
import { useLocalStorage } from "../../hooks";
import nextI18NextConfig from "../../next-i18next.config.js";
import {
  blogsList,
  getBlogUrl,
  getDocBySlug,
  notFoundBlogMeta,
} from "../../utils";

const TIME_DIFF = 6 * 60 * 60 * 1000; // 6 hours

export default function Page({ markdownContent, meta = notFoundBlogMeta, id }) {
  // No viewMode check needed as Minimal is the only mode
  const { t } = useTranslation("common");

  const blogName = t(`blogs.${id}.name`, { defaultValue: meta.name });
  const blogDescription = t(`blogs.${id}.description`, {
    defaultValue: meta.description,
  });
  const [viewsCount, setViewsCount] = useState(0);
  const [viewerTextWidth, setViewerTextWidth] = useState(0);
  const [isFetchingViews, setIsFetchingViews] = useState(false);
  const [lastViewedOnLS, setLastViewedOnLS] = useLocalStorage("lastViewedOn");

  const abortControllerRef = useRef(new AbortController());

  const sharableData = {
    url: getBlogUrl(meta.slug),
    text: blogName,
    title: blogName,
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
          const fontStack =
            '500 14px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';

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
  }, [viewsCount]);

  // Clean the title from the markdown to prevent duplicate rendering since we show it in the header
  const cleanMarkdown = markdownContent.replace(/^#+\s+.*(\r?\n)+/, "");

  return (
    <>
      <Head>
        <title>{`${blogName} | Dinesh Shaw`}</title>
        <meta name="description" content={blogDescription} key="desc" />
        <meta name="keywords" content={meta.keywords}></meta>
        <meta property="og:title" content={blogName + " | Dinesh Shaw"} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={sharableData.url} />
        <meta property="og:description" content={blogDescription} />
        <meta property="og:image" content="https://dineshshaw.in/logo512.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={sharableData.url} />
      </Head>

      <div className="minimal-page">
        <header className="mb-4">
          {/* Blog title */}
          <div className="text-[28px] font-bold tracking-[-0.035em] leading-[1.08] mb-[10px] text-mn-text-primary">
            {blogName}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 text-[14px] text-mn-text-secondary mt-3">
            <span>
              {meta.createdAt > 0
                ? format(meta.createdAt, "MMM d, yyyy")
                : ""}
            </span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-1.5">
              <Eye
                size={14}
                className={clsx({ fadeInOut: isFetchingViews })}
                aria-hidden="true"
              />
              <span
                className="inline-block min-w-[8px] transition-[width] duration-300 ease-out overflow-hidden whitespace-nowrap"
                style={{
                  width:
                    viewerTextWidth > 0 ? `${viewerTextWidth}px` : "auto",
                }}
              >
                {viewsCount}
              </span>{" "}
              views
            </span>
            <span className="opacity-50">·</span>
            <RWebShare data={sharableData}>
              <button
                className="bg-transparent border-none p-[2px] cursor-pointer text-mn-text-secondary flex items-center justify-center transition-[color,transform] duration-150 hover:text-mn-text-primary hover:-translate-y-px active:translate-y-0"
                type="button"
                aria-label="Share this blog"
                title="Share"
              >
                <Share2 size={14} aria-hidden="true" />
              </button>
            </RWebShare>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px border-none mt-10 mb-8 bg-mn-divider" />

        {/* Markdown */}
        <div className="mn-markdown mt-0">
          <MarkdownRenderer content={cleanMarkdown} />
        </div>

        <MinimalFooter />
      </div>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const { file, fallbackFile, blogMeta } = getDocBySlug(params.id, locale);
  let markdownContent = "";

  if (fs.existsSync(file)) {
    markdownContent = fs.readFileSync(file, "utf-8");
  } else {
    markdownContent = fs.readFileSync(fallbackFile, "utf-8");
  }

  return {
    props: {
      markdownContent,
      meta: blogMeta,
      id: blogMeta.id,
      ...(await serverSideTranslations(
        locale ?? "en",
        ["common"],
        nextI18NextConfig,
      )),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: blogsList.map((blog) => ({ params: { id: blog.slug } })),
    fallback: "blocking",
  };
}
