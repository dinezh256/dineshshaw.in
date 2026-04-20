import { useContext } from "react";
import Head from "next/head";
import About from "../components/about";
import MinimalAbout from "../components/minimal/minimalAbout";
import { GlobalContext } from "../contexts";

const Home = () => {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);

  return (
    <>
      <Head>
        <title>Dinesh Shaw</title>
        <meta
          name="description"
          content="Frontend Engineer with 5+ years of experience building web and mobile products. Mostly React.js, React Native, and Node.js."
          key="desc"
        />
        <link rel="canonical" href="https://dineshshaw.in/" />
      </Head>
      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only">
          <MinimalAbout />
        </div>
      )}
      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only">
          <About />
        </div>
      )}
    </>
  );
};

export default Home;
