import Link from "next/link";
import { formatDuration, intervalToDuration } from "date-fns";
import MinimalFooter from "./minimalFooter";
import { blogsList } from "../../utils";
import { MnSeparator, MnSectionTitle, MnPageHeader, MnHoverRow } from "../ui/minimal";

const formatDate = (ts) =>
  new Date(ts).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const formatReadTime = (secs) => {
  const d = intervalToDuration({ start: 0, end: secs * 1000 });
  return d.minutes ? `${d.minutes} min read` : `${secs}s read`;
};

const MinimalBlogs = () => (
  <>
    <div className="minimal-page">
      <MnPageHeader
        kicker="Blogs"
        title="Notes on frontend engineering and building for the web."
        subtitle="Writing about React, accessibility, performance, and the smaller implementation details that shape good product experiences."
        rotatorPrefix="Usually on"
        rotatorWords={["React", "accessibility", "performance"]}
      />

      <MnSeparator />

      {/* Posts */}
      <section className="mn-section">
        <MnSectionTitle>Posts</MnSectionTitle>
        <div className="flex flex-col gap-1">
          {blogsList.map(({ id, slug, name, createdAt, readDuration }) => (
            <MnHoverRow
              key={id}
              as={Link}
              href={`/blogs/${slug}`}
              className="block no-underline py-[11px]"
            >
              <div className="text-[15px] font-medium leading-[1.45] mb-[5px] text-mn-text-primary transition-colors duration-150 group-hover:text-mn-accent-text">
                {name}
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-mn-text-secondary">
                <span>{formatDate(createdAt)}</span>
                <span className="opacity-50">·</span>
                <span>{formatReadTime(readDuration)}</span>
              </div>
            </MnHoverRow>
          ))}
        </div>
      </section>

      <MinimalFooter />
    </div>
  </>
);

export default MinimalBlogs;
