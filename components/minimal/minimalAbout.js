import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { ChevronsDown, ChevronsUp, Home, MapPin } from "react-feather";
import { resumeLink, skillsList, socials, timeline } from "../../utils";
import {
  MnAvailabilityBadge,
  MnButton,
  MnHoverRow,
  MnPageHeader,
  MnSectionTitle,
  MnSeparator,
} from "../ui/minimal";
import MinimalFooter from "./minimalFooter";

const formatTimelineDate = (dateStr, locale, t) => {
  if (dateStr === "Present") return t("about.now");
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString(locale || "en", {
      month: "short",
      year: "numeric",
    });
  }
  return dateStr;
};

const MinimalAbout = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const updateTimeline = () => {
      const rect = container.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.65;
      
      const totalHeight = rect.height;
      const activeHeight = Math.max(0, Math.min(totalHeight, triggerY - rect.top));
      const ratio = totalHeight > 0 ? activeHeight / totalHeight : 0;
      
      container.style.setProperty("--timeline-active-ratio", ratio);

      const dots = container.querySelectorAll("[data-timeline-dot]");
      dots.forEach((dot) => {
        const dotRect = dot.getBoundingClientRect();
        if (dotRect.top < triggerY) {
          dot.classList.add("is-active");
        } else {
          dot.classList.remove("is-active");
        }
      });
    };

    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          updateTimeline();
          ticked = false;
        });
        ticked = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateTimeline();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

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
          title={t("about.title")}
          subtitle={
            <>
              {t("about.subtitle1")}
              <strong>Auzmor</strong>
              {t("about.subtitle2")}
            </>
          }
          rotatorPrefix={t("about.rotatorPrefix")}
          rotatorWords={t("about.rotatorWords", { returnObjects: true })}
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
              <span
                aria-hidden="true"
                className="inline-flex items-center leading-none translate-y-[-0.5px]"
              >
                🇮🇳
              </span>
              <span>India</span>
            </span>
          </div>

          {/* Availability */}
          <MnAvailabilityBadge>{t("about.availability")}</MnAvailabilityBadge>

          {/* CTAs */}
          <div className="flex gap-2.5 flex-wrap">
            <MnButton
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="resume"
            >
              <ChevronsUp size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>{t("about.resume")}</span>
            </MnButton>
            <MnButton onClick={onClickContact}>
              <ChevronsDown size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>{t("about.contact")}</span>
            </MnButton>
          </div>
        </MnPageHeader>
        <MnSeparator className="bg-transparent" />

        {/* About */}
        <section className="mn-section">
          <MnSectionTitle>{t("about.sectionTitleAbout")}</MnSectionTitle>
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px]">
            {t("about.bullets", { returnObjects: true }).map((item, i) => {
              // Simple replacement for <1>...</1> and <2>...</2> tags from translation
              const parts = item.split(/(<\d>.*?<\/\d>)/g);
              return (
                <li
                  key={i}
                  className="text-[15px] leading-[1.78] pl-5 relative text-mn-text-secondary before:content-['•'] before:absolute before:left-0 before:font-medium before:text-mn-accent-text before:opacity-60 [&_strong]:font-semibold [&_strong]:text-mn-text-primary"
                >
                  {parts.map((part, index) => {
                    const match = part.match(/<(\d)>(.*?)<\/\1>/);
                    if (match) {
                      return <strong key={index}>{match[2]}</strong>;
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </li>
              );
            })}
          </ul>
        </section>
        <MnSeparator className="bg-transparent" />

        {/* Experience */}
        <section className="mn-section">
          <MnSectionTitle>{t("about.sectionTitleExperience")}</MnSectionTitle>
          <div ref={timelineRef} className="flex flex-col relative pl-6 ml-[7px] gap-8 mt-2">
            {/* Base timeline line */}
            <div className="absolute top-[10px] bottom-[15px] w-px bg-mn-divider" style={{ left: "-0.5px" }} />
            {/* Active timeline line */}
            <div
              className="absolute top-[10px] bottom-[15px] w-px bg-[#22c55e] origin-top transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(34,197,94,0.7)]"
              style={{ left: "-0.5px", transform: "scaleY(var(--timeline-active-ratio, 0))" }}
            />

            {timeline.map(({ orgId, orgName, yearwise }) => {
              const isCurrent = yearwise.some((y) => y.end === "Present");
              return (
                <div key={orgId} className="relative flex flex-col gap-2.5">
                  {/* Company Stepper dot */}
                  <span
                    data-timeline-dot="company"
                    className={`absolute -left-[30px] top-[5px] w-[12px] h-[12px] rounded-full border-2 bg-mn-bg transition-all duration-300 ${
                      isCurrent ? "border-[#22c55e]" : "border-mn-border-dim"
                    }`}
                  />
                  
                  {/* Org header */}
                  <div className="flex items-center gap-2">
                    <span className="text-[14.5px] font-semibold text-mn-text-primary">
                      {t(`companies.${orgId}`, { defaultValue: orgName })}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-[5px] text-[10.5px] font-semibold tracking-wide uppercase px-2 py-[3px] rounded-full bg-[#22c55e]/15 text-[#22c55e]">
                        <span className="w-[5px] h-[5px] rounded-full bg-[#22c55e]" />
                        {t("about.now")}
                      </span>
                    )}
                  </div>

                  {/* Roles */}
                  <div className="flex flex-col gap-0.5 pl-1">
                    {yearwise.map(({ id, start, end, position }) => (
                      <div
                        key={id}
                        className="relative flex items-center justify-between gap-4 py-[6px]"
                      >
                        {/* Dot on the timeline line */}
                        <span
                          data-timeline-dot="role"
                          className="absolute -left-[31px] w-[6px] h-[6px] rounded-full border border-mn-border-dim bg-mn-bg transition-all duration-300"
                        />
                        <span className="text-[13.5px] font-medium text-mn-text-primary">
                          {position}
                        </span>
                        <span className="text-[12px] text-mn-text-secondary opacity-55 whitespace-nowrap tabular-nums">
                          {formatTimelineDate(start, locale, t)} –{" "}
                          {formatTimelineDate(end, locale, t)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <MnSeparator className="bg-transparent" />

        {/* Skills */}
        <section className="mn-section">
          <MnSectionTitle>{t("about.sectionTitleSkills")}</MnSectionTitle>
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
        <MnSeparator className="bg-transparent" />

        {/* Connect */}
        <section className="mn-section mn-connect-section" tabIndex={-1}>
          <MnSectionTitle>{t("about.sectionTitleConnect")}</MnSectionTitle>
          <div className="flex flex-col gap-1">
            {[
              ...socials.map((social) => ({
                key: social.id,
                href: social.url,
                target: "_blank",
                rel: "noopener noreferrer",
                name: t(`socials.${social.id}`, { defaultValue: social.name }),
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
                <span className="font-medium min-w-[72px] text-mn-text-primary">
                  {name}
                </span>
                <span className="text-[13px] flex-1 opacity-45 group-hover:opacity-100 transition-opacity duration-150 mn-handle-text">
                  {handle}
                </span>
                <span className="text-[12px] opacity-25 ml-auto transition-[transform,opacity,color] duration-[120ms] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:opacity-100 group-hover:text-mn-accent">
                  ↗
                </span>
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
