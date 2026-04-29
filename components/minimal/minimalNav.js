import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blogs", label: "Blogs" },
];

const MinimalNav = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation('common');
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const [pill, setPill] = useState({ x: 0, width: 0, opacity: 0 });

  const getActive = (href) => {
    if (href === "/blogs") return pathname === "/blogs" || pathname.startsWith("/blogs/");
    return pathname === href;
  };

  const activeIdx = navLinks.findIndex(({ href }) => getActive(href));

  // Measure active link relative to nav and slide pill to it
  useEffect(() => {
    const el = linkRefs.current[activeIdx];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPill({ x: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
  }, [activeIdx, pathname, t]);

  return (
    <nav
      ref={navRef}
      className="relative flex items-center gap-1.5 w-fit mb-[34px] p-1 rounded-[10px] text-[13px] font-medium bg-mn-nav-bg"
      aria-label="Minimal navigation"
    >
      {/* Sliding pill — absolutely positioned, slides via transform */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-[7px] bg-mn-accent-subtle pointer-events-none"
        style={{
          left: 0,
          width: pill.width,
          opacity: pill.opacity,
          transform: `translateX(${pill.x}px)`,
          transition: "transform 0.22s cubic-bezier(0.16,1,0.3,1), width 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease",
        }}
      />

      {navLinks.map(({ href, label }, i) => {
        const active = getActive(href);
        return (
          <Link
            key={href}
            href={href}
            ref={(el) => { linkRefs.current[i] = el; }}
            className={cn(
              "relative z-10 px-3.5 py-[5.5px] no-underline transition-[color,background-color] duration-150 rounded-[7px] text-mn-text-primary",
              active ? "text-mn-accent-text" : "text-mn-text-secondary opacity-75 hover:opacity-100 hover:bg-mn-hover-bg"
            )}
            aria-current={active ? "page" : undefined}
          >
            {t(`nav.${label.toLowerCase()}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default MinimalNav;
