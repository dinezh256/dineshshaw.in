import Head from "next/head";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

import Navbar from "../components/navbar";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-DZ5VTRTBNF"
      />

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
      <Navbar />
      <div className="main-wrapper">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  );
}

export default MyApp;
