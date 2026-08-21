import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import MinimalHealth from "../components/minimal/minimalHealth";
import { healthProfile } from "../data/health";
import nextI18NextConfig from "../next-i18next.config.js";

const Health = () => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Health | Dinesh Shaw</title>
        <meta name="description" content={healthProfile.summary} key="desc" />
        <meta property="og:title" content="Health | Dinesh Shaw" />
        <meta property="og:description" content={healthProfile.summary} />
        <meta property="og:locale" content={locale || "en"} />
        <link rel="canonical" href="https://dineshshaw.in/health" />
      </Head>

      <MinimalHealth />
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

export default Health;
