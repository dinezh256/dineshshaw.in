import Image from "next/image";
import { ChevronsDown, ChevronsUp, Home, MapPin } from "react-feather";
import MinimalFooter from "./minimalFooter";
import { resumeLink, timeline, skillsList, socials } from "../../utils";
import {
  MnButton,
  MnSeparator,
  MnAvailabilityBadge,
  MnSectionTitle,
  MnPageHeader,
  MnHoverRow,
} from "../ui/minimal";

const MinimalAbout = () => {
  const onClickContact = () => {
    const contactSection = document.querySelector(".mn-connect-section");
    if (contactSection instanceof HTMLElement) {
      contactSection.focus({ preventScroll: true });
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="minimal-page">
        <MnPageHeader
          kicker="Dinesh Shaw"
          title="Frontend engineer building thoughtful interfaces."
          subtitle={
            <>
              5+ years across web and mobile products. Currently shipping at{" "}
              <strong>Auzmor</strong>.
            </>
          }
          rotatorPrefix="Mostly in"
          rotatorWords={["JavaScript", "React.js", "React Native"]}
        >
          {/* Meta */}
          <div className="flex items-center gap-[14px] flex-wrap mb-5 text-[13px] font-medium text-mn-text-secondary">
            <span className="inline-flex items-center gap-1.5 leading-none [&_svg]:block [&_svg]:shrink-0">
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              <span>BLR</span>
            </span>
            <span className="inline-flex items-center gap-1.5 leading-none [&_svg]:block [&_svg]:shrink-0">
              <Home size={14} strokeWidth={2} aria-hidden="true" />
              <span>JSR</span>
            </span>
            <span className="inline-flex items-center gap-1.5 leading-none">
              <span aria-hidden="true" className="inline-flex items-center leading-none translate-y-[-0.5px]">🇮🇳</span>
              <span>India</span>
            </span>
          </div>

          {/* Availability */}
          <MnAvailabilityBadge>Available for new opportunities</MnAvailabilityBadge>

          {/* CTAs */}
          <div className="flex gap-2.5 flex-wrap">
            <MnButton href={resumeLink} target="_blank" rel="noopener noreferrer" variant="resume">
              <ChevronsUp size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>Résumé</span>
            </MnButton>
            <MnButton onClick={onClickContact}>
              <ChevronsDown size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>Contact me</span>
            </MnButton>
          </div>
        </MnPageHeader>

        <MnSeparator />

        {/* About */}
        <section className="mn-section">
          <MnSectionTitle>About</MnSectionTitle>
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px]">
            {[
              <>I&apos;ve spent the last 5+ years working mostly in{" "}<strong>JavaScript</strong> and <strong>React.js</strong>, building web and mobile interfaces across startups and product companies.</>,
              <>At <strong>Auzmor</strong>, I work on the LMS platform as a Senior Software Engineer, across the web app and the{" "}<strong>React Native</strong> mobile app.</>,
              <>I studied Electronics and Communication at{" "}<strong>Tezpur University</strong>, graduating in 2020. Turned out writing code was more fun than building circuits.</>,
              <>I like knowing how things work under the hood. Performance, accessibility, and clean APIs are things I think about more than I probably should.</>,
              <>Outside work, I go to the gym 4 times a week, follow{" "}<strong>cricket</strong> way too closely, and try to{" "}<strong>travel</strong> whenever I get the chance.</>,
            ].map((item, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <li
                key={i}
                className="text-[15px] leading-[1.78] pl-5 relative text-mn-text-secondary before:content-['•'] before:absolute before:left-0 before:font-medium before:text-mn-accent-text before:opacity-60 [&_strong]:font-semibold [&_strong]:text-mn-text-primary"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <MnSeparator />

        {/* Experience */}
        <section className="mn-section">
          <MnSectionTitle>Experience</MnSectionTitle>
          <div className="flex flex-col gap-7">
            {timeline.map(({ orgId, orgName, yearwise }) => {
              const isCurrent = yearwise.some((y) => y.end === "Present");
              return (
                <div key={orgId}>
                  {/* Org header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[14.5px] font-semibold text-mn-text-primary">
                      {orgName}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-[5px] text-[10.5px] font-semibold tracking-wide uppercase px-2 py-[3px] rounded-full bg-[#22c55e]/15 text-[#22c55e]">
                        <span className="w-[5px] h-[5px] rounded-full bg-[#22c55e]" />
                        Now
                      </span>
                    )}
                  </div>

                  {/* Roles — connected by a left border timeline */}
                  <div className="flex flex-col border-l-2 border-mn-divider pl-4 ml-[3px] gap-0">
                    {yearwise.map(({ id, start, end, position }) => (
                      <div
                        key={id}
                        className="relative flex items-center justify-between gap-4 py-[9px]"
                      >
                        {/* Dot on the timeline line */}
                        <span
                          className={`absolute -left-[21px] w-[8px] h-[8px] rounded-full border-2 transition-colors ${
                            end === "Present"
                              ? "bg-[#22c55e] border-[#22c55e]"
                              : "bg-mn-bg border-mn-divider"
                          }`}
                        />
                        <span className="text-[13.5px] font-medium text-mn-text-primary">
                          {position}
                        </span>
                        <span className="text-[12px] text-mn-text-secondary opacity-55 whitespace-nowrap tabular-nums">
                          {start} – {end}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <MnSeparator />

        {/* Skills */}
        <section className="mn-section">
          <MnSectionTitle>Skills</MnSectionTitle>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[7px] px-[10px] py-[7px] rounded-[8px] border border-mn-divider bg-mn-btn-bg text-[12.5px] font-medium text-mn-text-primary no-underline opacity-75 hover:opacity-100 hover:border-mn-accent hover:text-mn-accent-text transition-[opacity,border-color,color] duration-150"
              >
                <Image
                  src={s.imgSrc}
                  width={14}
                  height={14}
                  alt={s.name}
                  className="shrink-0 mn-skill-icon"
                  loading="lazy"
                />
                {s.name}
              </a>
            ))}
          </div>
        </section>

        <MnSeparator />

        {/* Connect */}
        <section className="mn-section mn-connect-section" tabIndex={-1}>
          <MnSectionTitle>Connect</MnSectionTitle>
          <div className="flex flex-col gap-1">
            {[
              ...socials.map((social) => ({
                key: social.id,
                href: social.url,
                target: "_blank",
                rel: "noopener noreferrer",
                name: social.name,
                handle: `@${social.username}`,
              })),
              {
                key: "email",
                href: "mailto:heydineshshaw@gmail.com",
                target: undefined,
                rel: undefined,
                name: "Email",
                handle: "heydineshshaw@gmail.com",
              },
            ].map(({ key, href, target, rel, name, handle }) => (
              <MnHoverRow
                key={key}
                as="a"
                href={href}
                target={target}
                rel={rel}
                className="flex items-center gap-3 no-underline text-[14px] py-[9px] hover:bg-mn-toggle-seg-hover group"
              >
                <span className="font-medium min-w-[72px] text-mn-text-primary">{name}</span>
                <span className="text-[13px] flex-1 opacity-45 group-hover:opacity-100 transition-opacity duration-150 mn-handle-text">{handle}</span>
                <span className="text-[12px] opacity-25 ml-auto transition-[transform,opacity,color] duration-[120ms] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:opacity-100 group-hover:text-mn-accent">↗</span>
              </MnHoverRow>
            ))}
          </div>
        </section>

        <MinimalFooter />
      </div>
    </>
  );
};

export default MinimalAbout;
