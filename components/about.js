import Head from "next/head";
import NameCard from "./nameCard";

const About = () => {
  return (
    <>
      <Head>
        <title>Dinesh Shaw</title>
        <meta
          title="description"
          content="Experienced Web Developer and Freelancer with a demonstrated history of working in the computer software industry. Skilled in JavaScript, ReactJS and NodeJS."
        />
      </Head>
      <div className="about-section">
        <NameCard />
        <div>
          <h6 className="">ABOUT</h6>
          <h4>
            Hello, there! <span>👋</span>
          </h4>
          <h4>
            I am Dinesh Shaw, an experienced Web Developer and Freelancer with a
            demonstrated history of working in the computer software industry.
            Skilled in JavaScript, ReactJS and NodeJS.
          </h4>
        </div>
      </div>
    </>
  );
};

export default About;
