import { useState } from "react";
import Link from "next/link";
import { Circle, ChevronsDown, ChevronsUp } from "react-feather";

import Skills from "./skills";
import Contact from "./contact";
import AnimateText from "./animateText";

import CheckMarkIcon from "../assets/icons/checkMarkIcon";
import { resumeLink, timeline } from "../utils";

const About = () => {
  const [animateContact, setAnimateContact] = useState(false);

  const onClickContact = () => {
    const contactSection = document.querySelector(".contact-section");
    if (contactSection instanceof HTMLElement) {
      contactSection.focus({ preventScroll: true });
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setAnimateContact(true);
    setTimeout(() => setAnimateContact(false), 1500);
  };

  return (
    <>
      <div className="about-section">
        <div className="about-section-inner">
          <div className="about-main">
            <p className="hero-line">
              Hey there! <span className="hand-waive">👋🏼</span>
            </p>
            <p className="hero-line">
              I&apos;m <b>Dinesh Shaw</b>
            </p>
            <h1>
              <span className="first-word">I&apos;m </span>
              <span className="second-word">a </span>
              <span>passionate</span>
              <span className="hero-rotator" aria-hidden="true">
                <span>
                  <b> Frontend Engineer</b>
                  <b>,</b>
                </span>
                <span>
                  <b> React Developer</b>
                  <b>,</b>
                </span>
                <span>
                  <b> Software Engineer</b>
                </span>
              </span>
            </h1>
            <div className="available-to-contact">
              <h3 className="contact-heading">
                <Circle
                  size={12}
                  fill="#00ac00"
                  stroke="#00ac00"
                  aria-hidden="true"
                />
                <span>Available for new opportunities</span>
              </h3>
              <div className="contact-cta-wrapper">
                <Link
                  className="resume-button"
                  href={resumeLink}
                  as={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ChevronsUp size={18} strokeWidth={2.5} aria-hidden="true" />
                  <span>Résumé</span>
                </Link>
                <button
                  type="button"
                  className="contact-cta"
                  onClick={onClickContact}
                >
                  <ChevronsDown
                    size={18}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span>Contact Me</span>
                </button>
              </div>
            </div>
          </div>
          <div className="about-me">
            <AnimateText text="ABOUT ME" animate={false} />
            <ul className="about-desc">
              <li>
                I&apos;ve spent the last 5+ years working mostly in{" "}
                <b>JavaScript</b> and <b>React.js</b>, building web and mobile
                interfaces across startups and product companies.
              </li>
              <li>
                At <b>Auzmor</b>, I work on the LMS platform as a Senior
                Software Engineer, across the web app and the{" "}
                <b>React Native</b> mobile app.
              </li>
              <li>
                I studied Electronics and Communication at{" "}
                <b>Tezpur University</b>, graduating in 2020. Turned out writing
                code was more fun than building circuits.
              </li>
              <li>
                I like knowing how things work under the hood. Performance,
                accessibility, and clean APIs are things I think about more than
                I probably should.
              </li>
              <li>
                Outside work, I go to the gym 4 times a week, follow{" "}
                <b>cricket</b> way too closely, and try to <b>travel</b>{" "}
                whenever I get the chance.
              </li>
            </ul>
          </div>
        </div>
        <Skills />
        <div className="timeline-section">
          <AnimateText text="EXPERIENCE" animate={false} />
          {timeline.map(({ orgId, orgName, yearwise }) => (
            <div className="timeline-org" key={orgId}>
              <h3>{orgName}</h3>
              <div
                className={
                  yearwise.length < 2 ? "org-levels" : `org-levels border`
                }
              >
                {yearwise.map(({ id, start, end, position }) => (
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
