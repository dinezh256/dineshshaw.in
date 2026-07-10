import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import MinimalWork from "../components/minimal/minimalWork";
import nextI18NextConfig from "../next-i18next.config.js";

const Work = () => {
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

      <MinimalWork />
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
