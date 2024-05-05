import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { IBM_Plex_Sans as FontFamily } from "next/font/google";

import Navbar from "../components/navbar";
import NameCard from "../components/nameCard";
import Footer from "../components/footer";
import SplashScreen from "../components/splashScreen";

import { whiteListRoutes, navbarRoutes } from "../utils";
import "../styles/globals.scss";

const font = FontFamily({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-plex',
  display: 'swap',
});

const MyApp = ({ Component, pageProps }) => {
  const [isMounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const showComponent = whiteListRoutes.includes(router.pathname);
  const showNavbar =
    navbarRoutes.includes(router.pathname) ||
    router.pathname.includes("/blogs/");

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setShowSplash(false), 1500)
  }, [])

  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-DZ5VTRTBNF"
      />
      <style jsx global>
        {`
          html {
              font-family: ${font.style.fontFamily};
          }`
        }
      </style>

      <Script strategy="lazyOnload" id="g-tag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DZ5VTRTBNF');
        `}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {showNavbar && isMounted && <Navbar />}
      <main className="main-wrapper">
        {isMounted && showSplash && <SplashScreen />}
        {showComponent && isMounted && <NameCard />}
        {isMounted && <Component {...pageProps} />}
      </main>
      {showNavbar && isMounted && <Footer />}
      <Analytics />
    </>
  );
};

export default MyApp;
