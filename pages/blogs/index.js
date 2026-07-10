import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import MinimalBlogs from "../../components/minimal/minimalBlogs";
import nextI18NextConfig from "../../next-i18next.config.js";

const Blogs = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>{`${t("blogs.kicker")} | Dinesh Shaw`}</title>
        <meta
          name="description"
          content={
            t("blogs.subtitle") ||
            "Writing about frontend engineering, React, and things I've figured out the hard way."
          }
          key="desc"
        />
        <meta
          property="og:title"
          content={`${t("blogs.kicker")} | Dinesh Shaw`}
        />
        <meta
          property="og:description"
          content={
            t("blogs.subtitle") ||
            "Writing about frontend engineering, React, and things I've figured out the hard way."
          }
        />
        <meta property="og:locale" content={locale || "en"} />
        <link rel="canonical" href="https://dineshshaw.in/blogs" />
      </Head>

      <MinimalBlogs />
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

export default Blogs;
