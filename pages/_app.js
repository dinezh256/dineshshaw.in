import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import clsx from "clsx";
import Head from "next/head";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { IBM_Plex_Sans as FontFamily } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import Navbar from "../components/navbar";
import NameCard from "../components/nameCard";
import Footer from "../components/footer";
import MinimalToggle from "../components/minimal/minimalToggle";

import { GlobalContextProvider, GlobalContext } from "../contexts";

import { whiteListRoutes, navbarRoutes } from "../utils";
import "../styles/globals.scss";

const font = FontFamily({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const acorn = localFont({
  src: "../assets/fonts/acorn.woff",
  preload: true,
  variable: "--font-acorn",
});

const AppInner = ({ Component, pageProps }) => {
  const router = useRouter();
  const { isMinimal, viewMode, viewModePreference } = useContext(GlobalContext);
  const showComponent = whiteListRoutes.includes(router.pathname);
  const showNavbar =
    navbarRoutes.includes(router.pathname) ||
    router.pathname.includes("/blogs/");

  // Apply viewMode class to body
  useEffect(() => {
    if (viewModePreference === null) return; // Wait for hydration/storage read

    const body = document.body;
    body.classList.remove("minimal-light", "minimal-dark", "minimal-system");

    if (viewModePreference === "minimal-system") {
      body.classList.add("minimal-system");
      return;
    }

    if (viewMode === "minimal-light") body.classList.add("minimal-light");
    if (viewMode === "minimal-dark") body.classList.add("minimal-dark");
  }, [viewMode, viewModePreference]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#f8f8f8" />
        <link rel="canonical" href="https://dineshshaw.in" />
      </Head>
      <div className={font.className} style={{ display: "contents" }}>
        {!isMinimal && showNavbar && (
          <div className="mn-rich-only">
            <Navbar />
          </div>
        )}
        <main
          className={clsx(
            "main-wrapper",
            acorn.variable,
            isMinimal && "main-wrapper--minimal",
          )}
        >
          {!isMinimal && showComponent && (
            <div className="mn-rich-only">
              <NameCard />
            </div>
          )}
          <Component {...pageProps} />
        </main>
        {!isMinimal && showNavbar && (
          <div className="mn-rich-only">
            <Footer />
          </div>
        )}

        {showNavbar && <MinimalToggle />}
      </div>
    </>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalContextProvider>
      <AppInner Component={Component} pageProps={pageProps} />
      <GoogleAnalytics gaId="G-DZ5VTRTBNF" />
      <SpeedInsights />
      <Analytics />
    </GlobalContextProvider>
  );
};

export default MyApp;
