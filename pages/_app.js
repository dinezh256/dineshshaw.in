import Head from "next/head";
// import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import Navbar from "../components/navbar";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Script
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=G-41BV8P41YT"}
      />

      <Script strategy="lazyOnload" id="g-tag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-41BV8P41YT', {
            page_path: window.location.pathname,
          });
        `}
      </Script> */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
