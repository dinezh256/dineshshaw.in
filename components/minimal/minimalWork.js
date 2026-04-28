import { ExternalLink, GitHub } from "react-feather";
import MinimalFooter from "./minimalFooter";
import { projects } from "../../utils";
import { MnSeparator, MnSectionTitle, MnPageHeader, MnHoverRow, MnInlineLink } from "../ui/minimal";

const MinimalWork = () => (
  <>
    <div className="minimal-page">
      <MnPageHeader
        kicker="Work"
        title="Selected products, experiments, and shipped interfaces."
        subtitle="A mix of product work and personal builds across the web, with a frontend-first lens on usability, polish, and speed."
        rotatorPrefix="Across"
        rotatorWords={["SaaS products", "side projects", "shipped interfaces"]}
      />

      <MnSeparator />

      {/* Projects */}
      <section className="mn-section">
        <MnSectionTitle>Projects</MnSectionTitle>
        <div className="flex flex-col gap-1">
          {projects.map(({ id, name, codeUrl, websiteUrl }) => (
            <MnHoverRow key={id} className="flex items-center justify-between gap-4">
              <span className="text-[14.5px] font-medium flex-1 text-mn-text-primary transition-colors duration-150 group-hover:text-mn-accent-text">
                {name}
              </span>
              <div className="flex items-center gap-2.5 shrink-0">
                {codeUrl && (
                  <a
                    href={codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[12.5px] font-medium no-underline opacity-50 transition-[opacity,color] duration-[120ms] text-mn-text-primary hover:opacity-100 hover:text-mn-accent-text"
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
                  className="flex items-center gap-1 text-[12.5px] font-medium no-underline opacity-50 transition-[opacity,color] duration-[120ms] text-mn-text-primary hover:opacity-100 hover:text-mn-accent-text"
                  title="Visit site"
                  aria-label={`${name} live site`}
                >
                  <ExternalLink size={13} strokeWidth={1.75} />
                  <span>Visit</span>
                </a>
              </div>
            </MnHoverRow>
          ))}
        </div>
      </section>

      <MnSeparator />

      <MnInlineLink
        href="https://github.com/dinezh256?tab=repositories"
        className="text-[13.5px]"
      >
        View all repositories on GitHub ↗
      </MnInlineLink>

      <MinimalFooter />
    </div>
  </>
);

export default MinimalWork;
