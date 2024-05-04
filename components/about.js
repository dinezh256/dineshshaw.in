import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Circle, ChevronsDown } from "react-feather";

import Contact from "./contact";
import Skills from "./skills";
import AnimateText from "./animateText";

import { getGreeting, resumeLink, timeline } from "../utils";
import CheckMarkIcon from "../assets/icons/checkMarkIcon";
import ArrowTopRight from "../assets/icons/arrowTopRight";

const About = () => {
  const [animateContact, setAnimateContact] = useState(false);

  const onClickContact = () => {
    window.scrollTo({ top: window.outerHeight * 2, behavior: "smooth" });

    if (!animateContact) setTimeout(() => setAnimateContact(false), 1500);
    setAnimateContact(true);
  };

  return (
    <>
      <Head>
        <title>Dinesh's Portfolio</title>
        <meta
          title="description"
          content="Experienced Frontend Developer with a keen eye for detail and a demonstrated history of working in the computer software industry. Skilled in JavaScript, React.js, React Native and Node.js"
          key="desc"
        />
      </Head>
      <div className="about-section">
        <div className="about-section-inner">
          <div className="about-main">
            <h2>
              Hey there! <span>👋🏼</span>
            </h2>
            <h2>
              My name is <b>Dinesh Shaw</b>
            </h2>
            <h2>
              I'm a passionate
              <div>
                <span>
                  <b> Web Developer</b>
                  <b>,</b>
                </span>
                <span>
                  <b> App Developer</b>
                  <b>,</b>
                </span>
                <span>
                  <b> Software Engineer</b>
                </span>
              </div>
            </h2>
            <div className="available-to-contact">
              <h3 className="contact-heading">
                <Circle size={12} fill="#00ac00" stroke="#00ac00" />
                <span>Available for new opportunities</span>
              </h3>
              <div className="contact-cta-wrapper">
                <Link
                  className="resume-button"
                  href={resumeLink}
                  as={resumeLink}
                  target="_blank"
                >
                  <ArrowTopRight />
                  <span>Résumé</span>
                </Link>
                <button className="contact-cta" onClick={onClickContact}>
                  <ChevronsDown size={18} strokeWidth={2.5} />
                  <span>Contact Me</span>
                </button>
              </div>
            </div>
          </div>
          <div className="about-me">
            <AnimateText text="ABOUT ME" />
            <ul className="about-desc">
              <li>
                With over <b>three years</b> of experience in Software Development, I bring expertise in Frontend Web Development using <b>JavaScript</b> and <b>ReactJS</b>.
              </li>
              <li>
                Currently, I'm diving into App Development using <b>React Native</b> and <b>SwiftUI</b> to diversify my skills.
              </li>
              <li>
                As a keen learner and attentive collaborator, I thrive on crafting efficient and scalable solutions.
              </li>
              <li>
                Other than being a Software Engineer, I love to <b>Workout</b> 4 times a week. When time permits, I love to travel, read blogs, play &amp; watch Cricket.
              </li>
            </ul>
          </div>
        </div>
        <Skills />
        <div className="timeline-section">
          <AnimateText text="EXPERIENCE" />
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
