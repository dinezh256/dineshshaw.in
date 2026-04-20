import Link from "next/link";
import { useContext } from "react";
import { ChevronsDown, ChevronsUp, Home, MapPin } from "react-feather";
import { GlobalContext } from "../../contexts";
import MinimalFooter from "./minimalFooter";
import { resumeLink, timeline, skillsList, socials } from "../../utils";

const MinimalAbout = () => {
  const { viewMode } = useContext(GlobalContext);

  const onClickContact = () => {
    const contactSection = document.querySelector(".mn-connect-section");
    if (contactSection instanceof HTMLElement) {
      contactSection.focus({ preventScroll: true });
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={`minimal-page minimal-page--${viewMode}`}>
        {/* Nav */}
        <nav className="mn-nav">
          <Link href="/" className="active" aria-current="page">
            About
          </Link>
          <Link href="/work">Work</Link>
          <Link href="/blogs">Blogs</Link>
        </nav>

        {/* Header */}
        <header className="mn-header">
          <div className="mn-kicker">Dinesh Shaw</div>
          <div className="mn-hero-lines">
            <h1 className="mn-hero-line">
              Frontend engineer building thoughtful interfaces.
            </h1>
            <p className="mn-hero-subline">
              5+ years across web and mobile products. Currently shipping at{" "}
              <strong>Auzmor</strong>.
            </p>
            <p className="mn-hero-line mn-hero-line--animated">
              Mostly in
              <span className="mn-hero-rotator">
                <span>
                  <strong> JavaScript</strong>
                </span>
                <span>
                  <strong> React.js</strong>
                </span>
                <span>
                  <strong> React Native</strong>
                </span>
              </span>
            </p>
          </div>
          <div className="mn-meta">
            <span className="mn-meta-item">
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              <span>BLR</span>
            </span>
            <span className="mn-meta-item">
              <Home size={14} strokeWidth={2} aria-hidden="true" />
              <span>JSR</span>
            </span>
            <span className="mn-meta-item">
              <span aria-hidden="true">🇮🇳</span>
              <span>India</span>
            </span>
          </div>
          <div className="mn-availability">
            <span className="mn-dot" />
            Available for new opportunities
          </div>
          <div className="mn-cta">
            <Link
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mn-link-btn mn-link-btn--resume"
            >
              <ChevronsUp size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>Résumé</span>
            </Link>
            <button
              type="button"
              className="mn-link-btn mn-link-btn--email"
              onClick={onClickContact}
            >
              <ChevronsDown size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>Contact me</span>
            </button>
          </div>
        </header>

        <div className="mn-divider" />

        {/* About */}
        <section className="mn-section">
          <h2 className="mn-section-title">About</h2>
          <ul className="mn-list">
            <li>
              I&apos;ve spent the last 5+ years working mostly in{" "}
              <strong>JavaScript</strong> and <strong>React.js</strong>,
              building web and mobile interfaces across startups and product
              companies.
            </li>
            <li>
              At <strong>Auzmor</strong>, I work on the LMS platform as a Senior
              Software Engineer, across the web app and the{" "}
              <strong>React Native</strong> mobile app.
            </li>
            <li>
              I studied Electronics and Communication at{" "}
              <strong>Tezpur University</strong>, graduating in 2020. Turned out
              writing code was more fun than building circuits.
            </li>
            <li>
              I like knowing how things work under the hood. Performance,
              accessibility, and clean APIs are things I think about more than I
              probably should.
            </li>
            <li>
              Outside work, I go to the gym 4 times a week, follow{" "}
              <strong>cricket</strong> way too closely, and try to{" "}
              <strong>travel</strong> whenever I get the chance.
            </li>
          </ul>
        </section>

        <div className="mn-divider" />

        {/* Experience */}
        <section className="mn-section">
          <h2 className="mn-section-title">Experience</h2>
          <div className="mn-timeline">
            {timeline.map(({ orgId, orgName, yearwise }) => (
              <div className="mn-org" key={orgId}>
                <div className="mn-org-name">{orgName}</div>
                <div className="mn-org-roles">
                  {yearwise.map(({ id, start, end, position }) => (
                    <div className="mn-role-row" key={id}>
                      <span className="mn-role-period">
                        {start} – {end}
                      </span>
                      <span className="mn-role-sep">·</span>
                      <span className="mn-role-title">{position}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mn-divider" />

        {/* Skills */}
        <section className="mn-section">
          <h2 className="mn-section-title">Skills</h2>
          <p className="mn-skills-text">
            {skillsList.map((s, i) => (
              <span key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-inline-link"
                >
                  {s.name}
                </a>
                {i < skillsList.length - 1 && (
                  <span className="mn-comma">, </span>
                )}
              </span>
            ))}
          </p>
        </section>

        <div className="mn-divider" />

        {/* Connect */}
        <section className="mn-section mn-connect-section" tabIndex={-1}>
          <h2 className="mn-section-title">Connect</h2>
          <div className="mn-socials">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mn-social-link"
              >
                <span className="mn-social-name">{social.name}</span>
                <span className="mn-social-handle">@{social.username}</span>
                <span className="mn-arrow">↗</span>
              </a>
            ))}
            <a href="mailto:heydineshshaw@gmail.com" className="mn-social-link">
              <span className="mn-social-name">Email</span>
              <span className="mn-social-handle">heydineshshaw@gmail.com</span>
              <span className="mn-arrow">↗</span>
            </a>
          </div>
        </section>

        <MinimalFooter />
      </div>
    </>
  );
};

export default MinimalAbout;
