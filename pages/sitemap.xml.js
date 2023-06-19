import fs from "fs";
import { blogsList } from "../utils/constants";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://dineshshaw.in";

  const blockedFiles = [
    "api",
    "_app.js",
    "_document.js",
    "404.js",
    "sitemap.xml.js",
  ];

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => !blockedFiles.includes(staticPage))
    .map((staticPath) => ({
      url: `${BASE_URL}/${staticPath.replace(".js", "")}`,
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
