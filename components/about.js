import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Circle, Mail } from "react-feather";

import Contact from "./contact";
import Skills from "./skills";

import { resumeLink, timeline } from "../utils/constants";
import CheckMarkIcon from "../assets/icons/checkMarkIcon";

const About = () => {
  const [animateContact, setAnimateContact] = useState(false);

  const onClickContact = () => {
    window.scrollTo({ top: window.outerHeight * 2, behavior: "smooth" });

    if (!animateContact) setTimeout(() => setAnimateContact(false), 2000);
    setAnimateContact(true);

  };
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
              <span>
                <b>Web Developer</b>
              </span>
              <span>
                <b>Freelancer</b>
              </span>
            </div>
          </h2>
          <div className="available-to-contact">
            <div className="contact-heading">
              <Circle size={12} fill="#00ac00" stroke="#00ac00" />
              <span>Available for new opportunities</span>
            </div>
            <div className="contact-cta-wrapper">
              <button className="contact-cta" onClick={onClickContact}>
                <Mail size={15} strokeWidth={2.5} />
                <span>Contact Me</span>
              </button>
              <Link
                className="resume-button"
                href={resumeLink}
                as={resumeLink}
                target="_blank"
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
        <Skills />
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
        <Contact animate={animateContact} />
      </div>
    </>
  );
};

export default About;
