import fs from "fs";
import Head from "next/head";
import Link from "next/link";
import format from "date-fns/format";

import MarkdownRenderer from "../../components/markdownRenderer";
import { getDocBySlug } from "../../utils/constants";

export default function Page({ markdownContent, meta }) {
  return (
    <div className="blog-page-wrapper">
      <Head>
        <title>{meta.name} - Dinesh Shaw</title>
        <meta title="description" content={meta.description} />
      </Head>
      <div className="flex-between blogs-nav">
        <Link href="/blogs" as="/blogs">
          ← Back to Blogs
        </Link>
        <span>{format(meta.createdAt, "PPP")}</span>
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
