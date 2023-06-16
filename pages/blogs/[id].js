import { useRouter } from "next/router";
import fs from "fs";
import Head from "next/head";

import MarkdownRenderer from "../../components/markdownRenderer";
import { getDocBySlug } from "../../utils/constants";

export default function Page({ markdownContent }) {
  const router = useRouter();
  const query = router.query;

  return (
    <div className="blog-page-wrapper">
        <Head>
        <title>Article - Dinesh Shaw</title>
        <meta
          title="description"
          content=""
        />
      </Head>
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const file = getDocBySlug(params.id);
  const markdownContent = fs.readFileSync(file, "utf-8");

  return { props: { markdownContent } };
}

export async function getStaticPaths() {
  return {
    paths: ["/blogs/securely-transmit-data-in-unexpected-situations-using-react"],
    fallback: true,
  };
}
