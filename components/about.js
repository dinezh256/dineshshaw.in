import { useState } from "react";
import Link from "next/link";
import { Circle, ChevronsDown, ChevronsUp } from "react-feather";
import { useTranslation, Trans } from "next-i18next/pages";
import { useRouter } from "next/router";

import Skills from "./skills";
import Contact from "./contact";
import AnimateText from "./animateText";

import CheckMarkIcon from "../assets/icons/checkMarkIcon";
import { resumeLink, timeline } from "../utils";

const formatTimelineDate = (dateStr, locale, t) => {
  if (dateStr === "Present") return t("about.now");
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString(locale || "en", { month: "short", year: "numeric" });
  }
  return dateStr;
};

const About = () => {
  const [animateContact, setAnimateContact] = useState(false);
  const { t, i18n } = useTranslation('common');
  const { locale } = useRouter();

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
                <span>{t('about.availability')}</span>
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
                  <span>{t('about.resume')}</span>
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
                  <span>{t('about.contact')}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="about-me">
            <AnimateText text={t('about.sectionTitleAbout').toUpperCase()} animate={false} />
            <ul className="about-desc">
              <li>
                <Trans
                  i18nKey="about.bullets.0"
                  t={t}
                  i18n={i18n}
                  components={{ 1: <b />, 2: <b /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about.bullets.1"
                  t={t}
                  i18n={i18n}
                  components={{ 1: <b />, 2: <b /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="about.bullets.2"
                  t={t}
                  i18n={i18n}
                  components={{ 1: <b /> }}
                />
              </li>
              <li>
                {t('about.bullets.3')}
              </li>
              <li>
                <Trans
                  i18nKey="about.bullets.4"
                  t={t}
                  i18n={i18n}
                  components={{ 1: <b />, 2: <b /> }}
                />
              </li>
            </ul>
          </div>
        </div>
        <Skills />
        <div className="timeline-section">
          <AnimateText text={t('about.sectionTitleExperience').toUpperCase()} animate={false} />
          {timeline.map(({ orgId, orgName, yearwise }) => (
            <div className="timeline-org" key={orgId}>
              <h3>{t(`companies.${orgId}`, { defaultValue: orgName })}</h3>
              <div
                className={
                  yearwise.length < 2 ? "org-levels" : `org-levels border`
                }
              >
                {yearwise.map(({ id, start, end, position }) => (
                  <div className="org-level" key={id}>
                    <CheckMarkIcon /> <h4>{`${formatTimelineDate(start, locale, t)} - ${formatTimelineDate(end, locale, t)}`}</h4>
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
