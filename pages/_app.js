import { useRouter } from "next/router";
import clsx from "clsx";
import Head from "next/head";
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { IBM_Plex_Sans as FontFamily } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

import Navbar from "../components/navbar";
import NameCard from "../components/nameCard";
import Footer from "../components/footer";

import { GlobalContextProvider } from "../contexts";

import { whiteListRoutes, navbarRoutes } from "../utils";
import "../styles/globals.scss";

const font = FontFamily({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-plex',
  display: 'swap',
});

const acorn = localFont({
  src: '../assets/fonts/acorn.woff',
  preload: true,
  variable: '--font-acorn'
})

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const showComponent = whiteListRoutes.includes(router.pathname);
  const showNavbar =
    navbarRoutes.includes(router.pathname) ||
    router.pathname.includes("/blogs/");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="transparent" />
        <link rel="canonical" href="https://dineshshaw.in" />
      </Head>
      <GlobalContextProvider>
        <div className={font.className} style={{ display: "contents" }}>
          {showNavbar && <Navbar />}
          <main className={clsx("main-wrapper", acorn.variable)}>
            {showComponent && <NameCard />}
            <Component {...pageProps} />
          </main>
          {showNavbar && <Footer />}
        </div>
      </GlobalContextProvider>
      <GoogleAnalytics gaId="G-DZ5VTRTBNF" />
      <SpeedInsights />
    </>
  );
};

export default MyApp;
