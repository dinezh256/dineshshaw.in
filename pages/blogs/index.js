import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config.js";
import AnimateText from "../../components/animateText";
import BlogCard from "../../components/blogListCard";
import MinimalBlogs from "../../components/minimal/minimalBlogs";
import { GlobalContext } from "../../contexts";
import { blogsList } from "../../utils";

const Blogs = () => {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>{`${t('blogs.kicker')} | Dinesh Shaw`}</title>
        <meta
          name="description"
          content={t('blogs.subtitle') || "Writing about frontend engineering, React, and things I've figured out the hard way."}
          key="desc"
        />
        <meta property="og:title" content={`${t('blogs.kicker')} | Dinesh Shaw`} />
        <meta
          property="og:description"
          content={t('blogs.subtitle') || "Writing about frontend engineering, React, and things I've figured out the hard way."}
        />
        <meta property="og:locale" content={locale || 'en'} />
        <link rel="canonical" href="https://dineshshaw.in/blogs" />
      </Head>

      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only">
          <MinimalBlogs />
        </div>
      )}
      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only">
          <div className="blogs-section">
            <AnimateText text="BLOGS" />
            <ul className="blog-list">
              {blogsList.map((blog, position) => (
                <li key={blog.id}>
                  <BlogCard {...blog} position={position} />
                </li>
              ))}
            </ul>
          </div>
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

export default Blogs;
