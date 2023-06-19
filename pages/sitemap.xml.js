import Head from "next/head";

import { blogsList } from "../utils/constants";

const Sitemap = () => (
  <Head>
    <title>Sitemap - Dinesh Shaw</title>
    <meta title="description" content="Sitemap of the website" />
  </Head>
);

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://dineshshaw.in";

  const staticFiles = ["", "work", "blogs"];

  const staticPaths = staticFiles.map((staticPath) => ({
    url: `${BASE_URL}/${staticPath}`,
    lastMod: new Date().toISOString().split("T")[0],
  }));

  const blogPaths = blogsList.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastMod: new Date(blog.createdAt).toISOString().split("T")[0],
  }));

  const allPaths = [...staticPaths, ...blogPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths
      .map((path) => {
        return `
            <url>
              <loc>${path.url}</loc>
              <lastmod>${path.lastMod}</lastmod>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
