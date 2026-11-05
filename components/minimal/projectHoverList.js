import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ExternalLink, GitHub } from "react-feather";
import { MnHoverRow } from "../ui/minimal";

/**
 * Adapted for this portfolio from ObsidianUI's Hover Image component (MIT).
 * Source: https://www.obsidianui.dev/docs/hover-img
 */
const ProjectHoverList = ({ projects, t }) => {
  const previewRef = useRef(null);
  const imageTrackRef = useRef(null);
  const xToRef = useRef(null);
  const yToRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) gsap.set(preview, { autoAlpha: 0, scale: 0 });
    };

    setMotionPreference();
    motionQuery.addEventListener("change", setMotionPreference);
    gsap.set(preview, { autoAlpha: 0, scale: 0, xPercent: -50, yPercent: -50 });
    xToRef.current = gsap.quickTo(preview, "x", {
      duration: 0.32,
      ease: "power3.out",
    });
    yToRef.current = gsap.quickTo(preview, "y", {
      duration: 0.32,
      ease: "power3.out",
    });

    return () => {
      motionQuery.removeEventListener("change", setMotionPreference);
      gsap.killTweensOf([preview, imageTrackRef.current]);
    };
  }, []);

  const showPreview = (index) => {
    if (reducedMotionRef.current || !previewRef.current) return;
    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(imageTrackRef.current, {
      yPercent: -100 * index,
      duration: 0.32,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const hidePreview = () => {
    if (reducedMotionRef.current || !previewRef.current) return;
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.94,
      duration: 0.18,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" || reducedMotionRef.current) return;
    xToRef.current?.(event.clientX);
    yToRef.current?.(event.clientY);
  };

  const handleFocus = (index) => {
    if (reducedMotionRef.current) return;
    xToRef.current?.(window.innerWidth / 2);
    yToRef.current?.(window.innerHeight / 2);
    showPreview(index);
  };

  return (
    <div
      className="relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={hidePreview}
    >
      <div className="flex flex-col gap-1 mb-4">
        {projects.map(({ id, name, src, codeUrl, websiteUrl }, index) => (
          <MnHoverRow
            key={id}
            className="flex items-center justify-between gap-4"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") showPreview(index);
            }}
            onFocus={() => handleFocus(index)}
          >
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
                  title={t("work.viewCode")}
                  aria-label={`${name} source code`}
                >
                  <GitHub size={13} strokeWidth={1.75} />
                  <span>{t("work.code")}</span>
                </a>
              )}
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[12.5px] font-medium no-underline opacity-50 transition-[opacity,color] duration-[120ms] text-mn-text-primary hover:opacity-100 hover:text-mn-accent-text"
                title={t("work.visitSite")}
                aria-label={`${name} live site`}
              >
                <ExternalLink size={13} strokeWidth={1.75} />
                <span>{t("work.visit")}</span>
              </a>
            </div>
          </MnHoverRow>
        ))}
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-40 w-64 overflow-hidden rounded-xl border border-mn-divider bg-mn-bg shadow-2xl md:block"
      >
        <div ref={imageTrackRef} className="h-full w-full">
          {projects.map(({ id, name, src }) => (
            <div key={id} className="relative h-40 w-64">
              <Image
                src={src}
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white drop-shadow-sm">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHoverList;
