import Head from "next/head";
import Link from "next/link";
import { ExternalLink, GitHub } from "react-feather";
import MinimalFooter from "./minimalFooter";
import { projects } from "../../utils";

const MinimalWork = () => (
  <>
    <Head>
      <title>Work | Dinesh Shaw</title>
      <meta name="description" content="Some of the projects I've worked on." key="desc" />
      <link rel="canonical" href="https://dineshshaw.in/work" />
    </Head>
    <div className="minimal-page">
      <nav className="mn-nav">
        <Link href="/">About</Link>
        <Link href="/work" className="active" aria-current="page">Work</Link>
        <Link href="/blogs">Blogs</Link>
      </nav>

      <header className="mn-header">
        <div className="mn-kicker">Work</div>
        <div className="mn-hero-lines">
          <h1 className="mn-hero-line">
            Selected products, experiments, and shipped interfaces.
          </h1>
          <p className="mn-hero-subline">
            A mix of product work and personal builds across the web, with a
            frontend-first lens on usability, polish, and speed.
          </p>
          <p className="mn-hero-line mn-hero-line--animated">
            Across
            <span className="mn-hero-rotator">
              <span>
                <strong> SaaS products</strong>
              </span>
              <span>
                <strong> side projects</strong>
              </span>
              <span>
                <strong> shipped interfaces</strong>
              </span>
            </span>
          </p>
        </div>
      </header>

      <div className="mn-divider" />

      <section className="mn-section">
        <h2 className="mn-section-title">Projects</h2>
        <div className="mn-projects">
          {projects.map(({ id, name, codeUrl, websiteUrl }) => (
            <div className="mn-project-row" key={id}>
              <span className="mn-project-name">{name}</span>
              <div className="mn-project-links">
                {codeUrl && (
                  <a
                    href={codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mn-project-link"
                    title="View code"
                    aria-label={`${name} source code`}
                  >
                    <GitHub size={13} strokeWidth={1.75} />
                    <span>Code</span>
                  </a>
                )}
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-project-link"
                  title="Visit site"
                  aria-label={`${name} live site`}
                >
                  <ExternalLink size={13} strokeWidth={1.75} />
                  <span>Visit</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mn-divider" />

      <a
        href="https://github.com/dinezh256?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="mn-inline-link"
        style={{ fontSize: "13.5px" }}
      >
        View all repositories on GitHub ↗
      </a>

      <MinimalFooter />
    </div>
  </>
);

export default MinimalWork;
