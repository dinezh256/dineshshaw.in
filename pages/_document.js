/* eslint-disable @next/next/inline-script-id */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="Dinesh Shaw" />
          <meta name="msapplication-TileColor" content="#3291ff"></meta>
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://localhost:3000" />
          <meta property="og:title" content="Dinesh Shaw" />
          <meta
            property="og:description"
            content="TExperienced Web Developer and Freelancer with a demonstrated history of working in the computer software industry. Skilled in JavaScript, ReactJS and NodeJS"
          />
          <meta
            property="og:image"
            content="http://localhost:3000/logo512.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
