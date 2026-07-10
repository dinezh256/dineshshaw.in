import { useTranslation } from "next-i18next/pages";
import { ExternalLink, GitHub } from "react-feather";
import { projects } from "../../utils";
import {
  MnHoverRow,
  MnInlineLink,
  MnPageHeader,
  MnSectionTitle,
  MnSeparator,
} from "../ui/minimal";
import MinimalFooter from "./minimalFooter";

const MinimalWork = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="minimal-page">
        <MnPageHeader
          kicker={t("work.kicker")}
          title={t("work.title")}
          subtitle={t("work.subtitle")}
          rotatorPrefix={t("work.rotatorPrefix")}
          rotatorWords={t("work.rotatorWords", { returnObjects: true })}
        />

        <MnSeparator className="bg-transparent" />

        {/* Projects */}
        <section className="mn-section">
          <MnSectionTitle>{t("work.sectionTitle")}</MnSectionTitle>
          <div className="flex flex-col gap-1 mb-4">
            {projects.map(({ id, name, codeUrl, websiteUrl }) => (
              <MnHoverRow
                key={id}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-[14.5px] font-medium flex-1 text-mn-text-primary transition-colors duration-150 group-hover:text-mn-accent-text">
                  {name}
                </span>
                <div className="flex items-center gap-2.5 shrink-0">
                  {codeUrl && (
                    <a
                      href={codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[12.5px] font-medium no-underline opacity-50 transition-[opacity,color] duration-[120ms] text-mn-text-primary hover:opacity-100 hover:text-mn-accent-text"
                      title={t("work.viewCode")}
                      aria-label={`${name} source code`}
                    >
                      <GitHub size={13} strokeWidth={1.75} />
                      <span>{t("work.code")}</span>
                    </a>
                  )}
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[12.5px] font-medium no-underline opacity-50 transition-[opacity,color] duration-[120ms] text-mn-text-primary hover:opacity-100 hover:text-mn-accent-text"
                    title={t("work.visitSite")}
                    aria-label={`${name} live site`}
                  >
                    <ExternalLink size={13} strokeWidth={1.75} />
                    <span>{t("work.visit")}</span>
                  </a>
                </div>
              </MnHoverRow>
            ))}
          </div>
        </section>

        <MnInlineLink
          href="https://github.com/dinezh256?tab=repositories"
          className="text-[13.5px]"
        >
          {t("work.viewAllRepos")}
        </MnInlineLink>

        <MinimalFooter />
      </div>
    </>
  );
};

export default MinimalWork;
