import Head from "next/head";

import CheckMarkIcon from "../assets/icons/checkMarkIcon";
import { timeline } from "../utils/constants";
import Contact from "./contact";

const About = () => {
  return (
    <>
      <Head>
        <title>Dinesh Shaw</title>
        <meta
          title="description"
          content="Experienced Web Developer, Freelancer. Skilled in JavaScript, ReactJS and NodeJS."
        />
      </Head>
      <div className="about-section">
        <div className="about-section-inner">
          <h2>
            Hey there! <span>👋🏼</span>
          </h2>
          <h2>
            My name is <b>Dinesh Shaw</b>
          </h2>
          <h2>
            I'm a passionate{" "}
            <div>
              <span><b>Web Developer</b></span>
              <span><b>Freelancer</b></span>
            </div>
          </h2>
        </div>
        <div className="timeline-wrapper">
          <h1>Journey</h1>
          {timeline
            .sort((a, b) => b.orgId - a.orgId)
            .map(({ orgId, orgName, yearwise }) => (
              <div className="timeline-org" key={orgId}>
                <h3>{orgName}</h3>
                <div
                  className={
                    yearwise.length < 2 ? "org-levels" : `org-levels border`
                  }
                >
                  {yearwise
                    .sort((a, b) => b.id - a.id)
                    .map(({ id, start, end, position }) => (
                      <div className="org-level" key={id}>
                        <CheckMarkIcon /> <h4>{`${start} - ${end}`}</h4>
                        <h4>—&nbsp;&nbsp;{position}</h4>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <Contact />
      </div>
    </>
  );
};

export default About;
