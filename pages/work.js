import Head from "next/head";

import NameCard from "../components/nameCard";
import InProgress from "../components/inProgress";

const Work = () => {
  return (
    <>
      <Head>
        <title>Work - Dinesh Shaw</title>
        <meta title="description" content="My works as a web developer" />
      </Head>
      <div className="work-section">
        <NameCard />
        <div>
          <h6>WORK</h6>
          <InProgress />
        </div>
      </div>
    </>
  );
};

export default Work;
