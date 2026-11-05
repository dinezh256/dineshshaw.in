import Head from "next/head";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import MinimalResume from "../components/minimal/minimalResume";
import nextI18NextConfig from "../next-i18next.config.js";

const Resume = () => (
  <>
    <Head>
      <title>Résumé | Dinesh Shaw</title>
      <meta
        name="description"
        content="Résumé of Dinesh Shaw, Senior Software Engineer specialising in frontend and React Native."
      />
      <meta property="og:title" content="Résumé | Dinesh Shaw" />
      <meta
        property="og:description"
        content="Senior Software Engineer specialising in frontend and React Native."
      />
      <link rel="canonical" href="https://dineshshaw.in/resume" />
    </Head>
    <MinimalResume />
  </>
);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["common"],
      nextI18NextConfig,
    )),
  },
});

export default Resume;
