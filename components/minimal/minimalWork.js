import { useTranslation } from "next-i18next/pages";
import { projects } from "../../utils";
import {
  MnInlineLink,
  MnPageHeader,
  MnSectionTitle,
  MnSeparator,
} from "../ui/minimal";
import MinimalFooter from "./minimalFooter";
import ProjectHoverList from "./projectHoverList";

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
          <ProjectHoverList projects={projects} t={t} />
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
