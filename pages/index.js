import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import nextI18NextConfig from "../next-i18next.config.js";
import About from "../components/about";
import MinimalAbout from "../components/minimal/minimalAbout";
import { GlobalContext } from "../contexts";

const Home = () => {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Dinesh Shaw</title>
        <meta
          name="description"
          content={t('about.bullets.0') || "Frontend Engineer with 5+ years of experience building web and mobile products."}
          key="desc"
        />
        <meta property="og:title" content="Dinesh Shaw" />
        <meta
          property="og:description"
          content={t('about.bullets.0') || "Frontend Engineer with 5+ years of experience building web and mobile products."}
        />
        <meta property="og:locale" content={locale || 'en'} />
        <link rel="canonical" href="https://dineshshaw.in/" />
      </Head>
      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only">
          <MinimalAbout />
        </div>
      )}
      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only">
          <About />
        </div>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};

export default Home;
