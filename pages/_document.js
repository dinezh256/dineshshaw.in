/* eslint-disable @next/next/inline-script-id */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Dinesh Shaw</title>
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
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#f8f8f8" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://dineshshaw.in" />
          <meta property="og:title" content="Dinesh Shaw" />
          <meta
            property="og:description"
            content="Experienced Frontend Developer with a keen eye for detail and a demonstrated history of working in the computer software industry. Skilled in JavaScript, React.js, React Native and Node.js"
          />
          <meta
            property="og:image"
            content="https://dineshshaw.in/logo512.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:site_name" content="Dinesh Shaw" />
          <meta property="og:locale" content="en-US" />
          <meta name="darkreader-lock" />
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
