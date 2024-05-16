import { useRouter } from "next/router";
import Head from "next/head";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { IBM_Plex_Sans as FontFamily } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'

import Navbar from "../components/navbar";
import NameCard from "../components/nameCard";
import Footer from "../components/footer";

import { GlobalContextProvider } from "../contexts";

import { whiteListRoutes, navbarRoutes } from "../utils";
import "../styles/globals.scss";

const font = FontFamily({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-plex',
  display: 'swap',
});

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const showComponent = whiteListRoutes.includes(router.pathname);
  const showNavbar =
    navbarRoutes.includes(router.pathname) ||
    router.pathname.includes("/blogs/");

  return (
    <>
      <style jsx global>
        {`
          html {
              font-family: ${font.style.fontFamily};
          }`
        }
      </style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalContextProvider>
        {showNavbar && <Navbar />}
        <main className="main-wrapper">
          {showComponent && <NameCard />}
          <Component {...pageProps} />
        </main>
        {showNavbar && <Footer />}
      </GlobalContextProvider>
      <GoogleAnalytics gaId="G-DZ5VTRTBNF" />
      <SpeedInsights />
    </>
  );
};

export default MyApp;
