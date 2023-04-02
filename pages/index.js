import Head from "next/head";
import Navbar from "../components";

function Home() {
  return (
    <>
      <Head>
        <title>Dinesh Shaw</title>
        <meta
          title="description"
          content="Experienced Web Developer and Freelancer with a demonstrated history of working in the computer software industry. Skilled in JavaScript, ReactJS and NodeJS."
        />
      </Head>
      <Navbar />
    </>
  );
}

export default Home;
