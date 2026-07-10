import { intervalToDuration } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { blogsList } from "../../utils";
import {
  MnHoverRow,
  MnPageHeader,
  MnSectionTitle,
  MnSeparator,
} from "../ui/minimal";
import MinimalFooter from "./minimalFooter";

const formatDate = (ts, locale) =>
  new Date(ts).toLocaleDateString(locale || "en", {
    month: "short",
    year: "numeric",
  });

const formatReadTime = (secs, t) => {
  const d = intervalToDuration({ start: 0, end: secs * 1000 });
  return d.minutes
    ? `${d.minutes} ${t("blogs.minRead")}`
    : `${secs} ${t("blogs.sRead")}`;
};

const MinimalBlogs = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <>
      <div className="minimal-page">
        <MnPageHeader
          kicker={t("blogs.kicker")}
          title={t("blogs.title")}
          subtitle={t("blogs.subtitle")}
          rotatorPrefix={t("blogs.rotatorPrefix")}
          rotatorWords={t("blogs.rotatorWords", { returnObjects: true })}
        />

        <MnSeparator className="bg-transparent" />

        {/* Posts */}
        <section className="mn-section">
          <MnSectionTitle>{t("blogs.sectionTitle")}</MnSectionTitle>
          <div className="flex flex-col gap-1">
            {blogsList.map(({ id, slug, name, createdAt, readDuration }) => (
              <MnHoverRow
                key={id}
                as={Link}
                href={`/blogs/${slug}`}
                className="block no-underline py-[11px]"
              >
                <div className="text-[15px] font-medium leading-[1.45] mb-[5px] text-mn-text-primary transition-colors duration-150 group-hover:text-mn-accent-text">
                  {t(`blogs.${id}.name`, { defaultValue: name })}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-mn-text-secondary">
                  <span>{formatDate(createdAt, locale)}</span>
                  <span className="opacity-50">·</span>
                  <span>{formatReadTime(readDuration, t)}</span>
                </div>
              </MnHoverRow>
            ))}
          </div>
        </section>

        <MinimalFooter />
      </div>
    </>
  );
};

export default MinimalBlogs;
