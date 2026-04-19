import Head from "next/head";
import Link from "next/link";
import { formatDuration, intervalToDuration } from "date-fns";
import MinimalFooter from "./minimalFooter";
import { blogsList } from "../../utils";

const formatDate = (ts) =>
  new Date(ts).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const formatReadTime = (secs) => {
  const d = intervalToDuration({ start: 0, end: secs * 1000 });
  return d.minutes ? `${d.minutes} min read` : `${secs}s read`;
};

const MinimalBlogs = () => (
  <>
    <Head>
      <title>Blogs | Dinesh Shaw</title>
      <meta
        name="description"
        content="Writing about frontend engineering, React, and things I've figured out the hard way."
        key="desc"
      />
      <link rel="canonical" href="https://dineshshaw.in/blogs" />
    </Head>
    <div className="minimal-page">
      <nav className="mn-nav">
        <Link href="/">About</Link>
        <Link href="/work">Work</Link>
        <Link href="/blogs" className="active" aria-current="page">Blogs</Link>
      </nav>

      <header className="mn-header">
        <div className="mn-kicker">Blogs</div>
        <div className="mn-hero-lines">
          <h1 className="mn-hero-line">
            Notes on frontend engineering and building for the web.
          </h1>
          <p className="mn-hero-subline">
            Writing about React, accessibility, performance, and the smaller
            implementation details that shape good product experiences.
          </p>
          <p className="mn-hero-line mn-hero-line--animated">
            Usually on
            <span className="mn-hero-rotator">
              <span>
                <strong> React</strong>
              </span>
              <span>
                <strong> accessibility</strong>
              </span>
              <span>
                <strong> performance</strong>
              </span>
            </span>
          </p>
        </div>
      </header>

      <div className="mn-divider" />

      <section className="mn-section">
        <h2 className="mn-section-title">Posts</h2>
        <div className="mn-blog-list">
          {blogsList.map(({ id, slug, name, createdAt, readDuration }) => (
            <Link
              key={id}
              href={`/blogs/${slug}`}
              className="mn-blog-row"
            >
              <div className="mn-blog-title">{name}</div>
              <div className="mn-blog-meta">
                <span>{formatDate(createdAt)}</span>
                <span className="mn-meta-sep">·</span>
                <span>{formatReadTime(readDuration)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <MinimalFooter />
    </div>
  </>
);

export default MinimalBlogs;
