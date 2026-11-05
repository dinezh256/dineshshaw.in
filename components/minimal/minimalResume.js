import Link from "next/link";
import { useContext, useLayoutEffect, useRef } from "react";
import {
  BookOpen,
  Briefcase,
  Code,
  Download,
  ExternalLink,
  Folder,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
} from "react-feather";
import { GlobalContext } from "../../contexts";

const experience = [
  {
    company: "American Technology Consulting (ATC)",
    url: "https://atc.xyz",
    location: "Remote",
    roles: [
      {
        title: "Senior Software Engineer",
        dates: "Apr 2026 – Present",
        note: "Auzmor's engineering team moved to ATC under the same ownership; continuing to build the Auzmor LMS platform.",
        highlights: [
          <>
            Own <strong>frontend architecture</strong> and end-to-end delivery
            for major LMS modules; make technical decisions, guide
            implementation quality, <strong>mentor engineers</strong>, and lead
            regular code reviews.
          </>,
          <>
            Led migration from <strong>React 16 / CRA / CRACO</strong> to{" "}
            <strong>React 18 and Rsbuild</strong>, cutting CI build time by{" "}
            <strong>60%</strong>.
          </>,
        ],
      },
    ],
  },
  {
    company: "Auzmor Technology",
    url: "https://auzmor.com",
    location: "Remote",
    roles: [
      {
        title: "Senior Software Engineer",
        dates: "Jan 2025 – Mar 2026",
        highlights: [
          <>
            Led authorization rearchitecture from coarse role-based access to{" "}
            <strong>granular CRUD permissions</strong>, mapping every app
            feature to permissions and enabling{" "}
            <strong>custom roles for 50+ enterprise organizations</strong>.
          </>,
        ],
      },
      {
        title: "Software Engineer III",
        dates: "Jan 2023 – Dec 2024",
        highlights: [
          <>
            Led development of <strong>Mentorship and Task Management</strong>{" "}
            capabilities, driving a{" "}
            <strong>50% increase in community engagement</strong> across the
            platform.
          </>,
          <>
            Drove accessibility improvements across web platform components in
            alignment with <strong>WCAG 2.1</strong>, enhancing navigation for{" "}
            <strong>15,000+ monthly active users</strong>.
          </>,
          <>
            Improved platform{" "}
            <strong>Lighthouse score from 25 to 70</strong> through targeted
            frontend performance optimizations.
          </>,
        ],
      },
      {
        title: "Software Engineer I",
        dates: "Jan 2022 – Dec 2022",
        highlights: [
          <>
            Led frontend development of <strong>Social Learning</strong>{" "}
            features (posts, comments, polls), contributing to a{" "}
            <strong>40% increase in user engagement</strong>.
          </>,
          <>
            Implemented{" "}
            <strong>multi-tenant branding customization</strong> (logos, brand
            themes, login layouts), achieving adoption across{" "}
            <strong>100% of enterprise clients</strong>.
          </>,
        ],
      },
    ],
  },
  {
    company: "PuStack Technologies Inc.",
    url: "https://pustack.com",
    location: "Delhi, India",
    roles: [
      {
        title: "Software Development Engineer",
        dates: "Feb 2021 – Dec 2021",
        highlights: [
          <>
            Implemented <strong>user authentication</strong> with phone-number
            verification and <strong>OAuth sign-in</strong> via Google and
            Facebook.
          </>,
          <>
            Developed <strong>1:1 real-time video calling</strong> between
            teachers and students, enabling live communication within the
            learning platform.
          </>,
          <>
            Contributed to the redesign of the student web platform, driving a{" "}
            <strong>60% increase in user engagement</strong> within four
            months.
          </>,
        ],
      },
    ],
  },
];

const skills = [
  ["Languages", "JavaScript (ES6+), TypeScript, HTML5, CSS3, Swift"],
  [
    "Frontend",
    "React, Next.js, Redux Toolkit, React Query, Tailwind CSS, Styled Components, Semantic UI, Quill.js",
  ],
  [
    "Enterprise SaaS",
    "Multi-tenancy, RBAC & Permissions, SSO/SAML, OAuth, MFA, API Key Management",
  ],
  [
    "Performance & Accessibility",
    "Lighthouse, Core Web Vitals, Code Splitting, Lazy Loading, WCAG 2.1 AA",
  ],
  [
    "Architecture & Tooling",
    "Design Systems, Microfrontends, Monorepos, Rsbuild, CI/CD, Webpack, Vite, ESLint, Git",
  ],
  [
    "APIs & Node",
    "REST APIs, WebSockets, Node.js (CLIs and tooling), Express.js",
  ],
  [
    "Agentic AI",
    "LLM Agents, Multi-agent Systems, MCP, Agent Skills & Plugins",
  ],
];

const SectionTitle = ({ children, icon: Icon }) => (
  <h2 className="resume-section-title">
    {Icon && <Icon size={13} strokeWidth={1.8} aria-hidden="true" />}
    {children}
  </h2>
);

const MinimalResume = () => {
  const { viewMode, setViewMode } = useContext(GlobalContext);
  const isDark = viewMode === "minimal-dark";
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fit = () => {
      canvas.style.setProperty(
        "--resume-zoom",
        String(Math.min(1, canvas.clientWidth / 1120)),
      );
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="resume-page">
      <div className="resume-topbar">
        <Link href="/">DINESH SHAW</Link>
        <div>
          <a href="/api/resume-download" className="resume-download-button">
            <Download size={14} aria-hidden="true" /> Download PDF
          </a>
          <button type="button" onClick={() => window.print()}>
            Print
          </button>
          <button
            type="button"
            className="resume-theme-toggle"
            onClick={() =>
              setViewMode(isDark ? "minimal-light" : "minimal-dark")
            }
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? (
              <Sun size={14} aria-hidden="true" />
            ) : (
              <Moon size={14} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div ref={canvasRef} className="resume-canvas">
        <div className="resume-sheet">
          <header className="resume-hero">
            <div>
              <h1>Dinesh Shaw</h1>
              <p>Software Engineer · Frontend</p>
              <nav aria-label="Professional links">
                <a
                  href="https://dineshshaw.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dineshshaw.in <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/dinezh256"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github/dinezh256 <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a
                  href="https://in.linkedin.com/in/shawdinesh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin/shawdinesh{" "}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </nav>
            </div>
            <address>
              <span>
                <MapPin size={15} aria-hidden="true" /> India
              </span>
              <a href="mailto:dineshshw03@gmail.com">
                <Mail size={15} aria-hidden="true" /> dineshshw03@gmail.com
              </a>
              <a className="resume-phone" href="tel:+917979060821">
                <Phone size={15} aria-hidden="true" /> +91-7979060821
              </a>
            </address>
          </header>

          <section className="resume-summary">
            <SectionTitle icon={Code}>Summary</SectionTitle>
            <p>
              Software engineer focused on <strong>frontend architecture</strong> and thoughtful
              product delivery. Experienced in building <strong>enterprise LMS capabilities</strong>,
              improving <strong>performance and accessibility (WCAG)</strong>, and mentoring engineers
              across web platforms.
            </p>
          </section>

          <div className="resume-columns">
            <section className="resume-primary" id="experience">
              <SectionTitle icon={Briefcase}>Experience</SectionTitle>
              {experience.map(({ company, url, location, roles }) => (
                <article key={company} className="resume-company">
                  <div className="resume-company-head">
                    <h3>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-company-link"
                        >
                          {company}
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      ) : (
                        company
                      )}
                    </h3>
                    <span>{location}</span>
                  </div>
                  {roles.map(({ title, dates, note, highlights }) => (
                    <div key={title} className="resume-role">
                      <div>
                        <h4>{title}</h4>
                        <time>{dates}</time>
                      </div>
                      {note && <p className="resume-role-note">{note}</p>}
                      <ul>
                        {highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </section>

            <aside className="resume-sidebar">
              <section id="skills">
                <SectionTitle icon={Code}>Technical Skills</SectionTitle>
                <dl>
                  {skills.map(([label, content]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{content}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section id="education">
                <SectionTitle icon={BookOpen}>Education</SectionTitle>
                <h3>Tezpur University, Assam</h3>
                <p>B.Tech in Electronics &amp; Communication Engineering</p>
                <p className="resume-muted">Jul 2016 – Jun 2020 · 7.3 CGPA</p>
              </section>
              <section id="projects">
                <SectionTitle icon={Folder}>Projects</SectionTitle>
                <h3>Digital Portfolio</h3>
                <p>
                  Designed and built a personal portfolio and blog using{" "}
                  <strong>Next.js and MDX</strong>, creating a modern
                  interactive experience that led to a{" "}
                  <strong>25% increase in collaboration inquiries</strong>.
                </p>
                <p className="resume-links">
                  <a
                    href="https://dineshshaw.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live site <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  <a
                    href="https://github.com/dinezh256/dineshshaw.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </p>
              </section>
            </aside>
          </div>
        </div>
      </div>

      <footer className="resume-footer">
        Thinking about hiring?{" "}
        <a href="mailto:dineshshw03@gmail.com">
          Let&apos;s connect at dineshshw03@gmail.com.
        </a>
      </footer>
    </main>
  );
};

export default MinimalResume;
