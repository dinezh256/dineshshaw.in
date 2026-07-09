import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { useContext } from "react";
import AnimateText from "../components/animateText";
import MinimalWork from "../components/minimal/minimalWork";
import ProjectCard from "../components/projectCard";
import { GlobalContext } from "../contexts";
import nextI18NextConfig from "../next-i18next.config.js";
import { projects } from "../utils";

const Work = () => {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>{`${t("work.kicker")} | Dinesh Shaw`}</title>
        <meta
          name="description"
          content={t("work.subtitle") || "Some of the projects I've worked on."}
          key="desc"
        />
        <meta
          property="og:title"
          content={`${t("work.kicker")} | Dinesh Shaw`}
        />
        <meta
          property="og:description"
          content={t("work.subtitle") || "Some of the projects I've worked on."}
        />
        <meta property="og:locale" content={locale || "en"} />
        <link rel="canonical" href="https://dineshshaw.in/work" />
      </Head>

      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only">
          <MinimalWork />
        </div>
      )}
      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only">
          <div className="work-section">
            <div className="work-section-inner">
              <AnimateText text="WORK" />
              <ul className="project-section">
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <ProjectCard {...project} position={index} />
                  </li>
                ))}
              </ul>
              <div className="flex-center view-more-wrapper">
                <a
                  className="view-more"
                  href="https://github.com/dinezh256?tab=repositories"
                  target="_blank"
                >
                  <span>{t("work.viewAllRepos") || "View More"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? "en",
        ["common"],
        nextI18NextConfig,
      )),
    },
  };
};

export default Work;
