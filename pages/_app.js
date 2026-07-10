import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { IBM_Plex_Sans as FontFamily } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next/pages";
import { useContext, useEffect } from "react";
import MinimalNav from "../components/minimal/minimalNav";
import MinimalToggle from "../components/minimal/minimalToggle";
import { GlobalContext, GlobalContextProvider } from "../contexts";
import nextI18NextConfig from "../next-i18next.config.js";

import { navbarRoutes, whiteListRoutes } from "../utils";
import "../styles/tailwind.css";
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

  // Apply viewMode class to html and body
  useEffect(() => {
    if (viewModePreference === null) return; // Wait for hydration/storage read

    const body = document.body;
    const html = document.documentElement;

    const expectedPreference = viewModePreference;
    let expectedMode = viewMode;
    if (expectedPreference === "minimal-system") {
      expectedMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "minimal-dark"
        : "minimal-light";
    }

    const bodyHasPref = body.classList.contains(expectedPreference);
    const bodyHasMode = body.classList.contains(expectedMode);
    const htmlHasPref = html.classList.contains(expectedPreference);
    const htmlHasMode = html.classList.contains(expectedMode);

    // If classes are already perfectly synchronized, bypass to prevent styling flash
    if (bodyHasPref && bodyHasMode && htmlHasPref && htmlHasMode) {
      return;
    }

    body.classList.remove("minimal-light", "minimal-dark", "minimal-system");
    html.classList.remove("minimal-light", "minimal-dark", "minimal-system");

    if (expectedPreference === "minimal-system") {
      body.classList.add("minimal-system");
      html.classList.add("minimal-system");
      body.classList.add(expectedMode);
      html.classList.add(expectedMode);
      return;
    }

    if (expectedMode === "minimal-light") {
      body.classList.add("minimal-light");
      html.classList.add("minimal-light");
    }
    if (expectedMode === "minimal-dark") {
      body.classList.add("minimal-dark");
      html.classList.add("minimal-dark");
    }
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
        <main
          className={clsx(
            "main-wrapper",
            acorn.variable,
            "main-wrapper--minimal",
          )}
        >
          {showNavbar && (
            <div className="mn-minimal-only sticky top-0 z-50 w-full">
              <MinimalNav />
            </div>
          )}
          <div className="pt-20 max-[500px]:pt-[72px]">
            <Component {...pageProps} />
          </div>
        </main>

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

export default appWithTranslation(MyApp, nextI18NextConfig);
