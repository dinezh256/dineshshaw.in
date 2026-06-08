import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { useRef, useEffect, useState, useContext } from "react";
import { Sun, Moon } from "react-feather";
import { cn } from "../../lib/utils";
import { GlobalContext } from "../../contexts";
import Image from "next/image";
import logo from "../../assets/logo.svg";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blogs", label: "Blogs" },
];

const MinimalNav = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation('common');
  const { viewMode, setViewMode } = useContext(GlobalContext);
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const [pill, setPill] = useState({ x: 0, width: 0, opacity: 0 });

  const isDark = viewMode === "minimal-dark";

  const handleThemeToggle = () => {
    setViewMode(isDark ? "minimal-light" : "minimal-dark");
  };

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
    <div className="w-full px-6 pt-4 transition-colors duration-300 max-[500px]:px-5 max-[500px]:pt-3">
      <div className="max-w-[680px] mx-auto">
        <div className="mn-liquid-nav relative flex items-center justify-between overflow-hidden rounded-[24px] p-[8px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[24px] mn-liquid-nav-blur-layer"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[24px] mn-liquid-nav-frost-layer"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[1px] rounded-[23px] mn-liquid-nav-highlight-layer"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[24px] mn-liquid-nav-border-layer"
          />
          
          <div className="relative z-10 flex flex-1 items-center justify-start ml-1">
            <Link
              href="/"
              className="flex w-[34px] h-[34px] items-center justify-center transition-transform duration-150 active:scale-[0.94] group"
              aria-label="Home"
            >
              <div 
                className={cn(
                  "w-[34px] h-[34px] opacity-85 group-hover:opacity-100 transition-opacity duration-150",
                  isDark 
                    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.4))] shadow-[0_2px_10px_rgba(0,0,0,0.5)]" 
                    : "bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.2))] shadow-[0_2px_10px_rgba(255,255,255,0.75)]"
                )}
                style={{
                  WebkitMaskImage: `url(${logo.src})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url(${logo.src})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </Link>
          </div>

          <nav
            ref={navRef}
            className="mn-liquid-nav-rail relative z-10 flex min-w-0 shrink-0 items-center gap-1 rounded-[16px] p-[4px] h-[34px] text-[13px] font-medium"
            aria-label="Minimal navigation"
          >
            {/* Sliding pill — absolutely positioned, slides via transform */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 top-1 rounded-[12px] border border-[var(--mn-accent-border)] bg-[linear-gradient(180deg,var(--mn-nav-active-top),var(--mn-nav-active-bg))] shadow-[0_10px_24px_var(--mn-navbar-pill-shadow),inset_0_1px_0_var(--mn-navbar-pill-highlight)]"
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
                    "relative z-10 flex items-center justify-center rounded-[12px] px-3 h-[26px] no-underline transition-[color,background-color,opacity,transform] duration-150 [text-shadow:0_1px_1px_rgba(0,0,0,0.18)]",
                    active ? "text-mn-accent-text" : "text-mn-navbar-link opacity-90 hover:opacity-100 hover:bg-mn-hover-bg"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(`nav.${label.toLowerCase()}`)}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex flex-1 items-center justify-end gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={handleThemeToggle}
              title={isDark ? "Switch to light" : "Switch to dark"}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,var(--mn-navbar-button-top),var(--mn-navbar-button-bottom))] text-mn-text-secondary opacity-90 shadow-[inset_0_1px_0_var(--mn-navbar-button-highlight),0_6px_18px_var(--mn-navbar-button-shadow)] transition-[background-color,opacity,transform,color] duration-150 hover:opacity-100 hover:text-mn-text-primary active:scale-[0.94] border border-[var(--mn-navbar-button-border)]"
            >
              {isDark
                ? <Sun size={15} strokeWidth={2} />
                : <Moon size={15} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalNav;
