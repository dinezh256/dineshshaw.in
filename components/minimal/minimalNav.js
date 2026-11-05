import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { useContext, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "react-feather";
import logo from "../../assets/logo.svg";
import { GlobalContext } from "../../contexts";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blogs", label: "Blogs" },
  { href: "/health", label: "Health" },
];

const MinimalNav = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");
  const { viewMode, setViewMode } = useContext(GlobalContext);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [underline, setUnderline] = useState({
    opacity: 0,
    width: 0,
    x: 0,
  });

  const isDark = viewMode === "minimal-dark";

  const handleThemeToggle = () => {
    setViewMode(isDark ? "minimal-light" : "minimal-dark");
  };

  const getActive = (href) => {
    if (href === "/blogs")
      return pathname === "/blogs" || pathname.startsWith("/blogs/");
    return pathname === href;
  };

  useEffect(() => {
    const nav = navRef.current;
    const activeLink = nav
      ? linkRefs.current[navLinks.find(({ href }) => getActive(href))?.href]
      : null;

    if (!nav || !activeLink) return;

    const measure = () => {
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      if (linkRect.width > 0) {
        setUnderline({
          opacity: 1,
          width: linkRect.width,
          x: linkRect.left - navRect.left - 1,
        });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    observer.observe(activeLink);

    return () => observer.disconnect();
  }, [pathname, t]);

  return (
    <div className="w-full px-6 pt-3 transition-colors duration-300 max-[500px]:px-5">
      <div className="max-w-[680px] mx-auto">
        <div
          ref={navRef}
          className="relative flex min-h-14 items-center gap-4 overflow-hidden rounded-[10px] border border-mn-divider bg-mn-btn-bg px-3 backdrop-blur-md shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[14px] z-10 h-px bg-mn-accent"
            style={{
              left: 0,
              opacity: underline.opacity,
              transform: `translateX(${underline.x}px)`,
              transition:
                "transform 0.28s cubic-bezier(0.16,1,0.3,1), width 0.28s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease",
              width: underline.width,
            }}
          />
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center transition-transform duration-150 active:scale-[0.94]"
              aria-label="Home"
            >
              <div
                className="h-6 w-6 transition-opacity duration-150 hover:opacity-75"
                style={{
                  background: "var(--mn-text-primary)",
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
            className="flex min-w-0 items-center gap-1 text-[13px] font-medium"
            aria-label="Minimal navigation"
          >
            {navLinks
              .filter(({ href }) => href !== "/health")
              .map(({ href, label }) => {
                const active = getActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative z-20 flex h-8 items-center justify-center px-3 no-underline transition-colors duration-150 ${
                      active
                        ? "text-mn-text-primary"
                        : "text-mn-text-secondary hover:text-mn-text-primary"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span
                      ref={(element) => {
                        linkRefs.current[href] = element;
                      }}
                    >
                      {t(`nav.${label.toLowerCase()}`)}
                    </span>
                  </Link>
                );
              })}
          </nav>

          <div className="ml-auto flex items-center">
            <Link
              href="/health"
              className={`relative z-20 flex h-8 w-8 items-center justify-center transition-colors duration-150 ${
                getActive("/health")
                  ? "text-[#ef4444]"
                  : "text-mn-text-secondary hover:text-mn-text-primary"
              }`}
              aria-current={getActive("/health") ? "page" : undefined}
              aria-label={t("nav.health")}
              title={t("nav.health")}
            >
              <span
                ref={(element) => {
                  linkRefs.current["/health"] = element;
                }}
                className="flex"
              >
                <Heart
                  size={16}
                  strokeWidth={2}
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <div className="ml-3 border-l border-mn-divider pl-3">
              <button
                type="button"
                onClick={handleThemeToggle}
                title={isDark ? "Switch to light" : "Switch to dark"}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                className="flex h-8 w-8 items-center justify-center rounded-[6px] text-mn-text-secondary transition-colors duration-150 hover:bg-mn-hover-bg hover:text-mn-text-primary active:scale-[0.94]"
              >
                {isDark ? (
                  <Sun size={15} strokeWidth={2} />
                ) : (
                  <Moon size={15} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalNav;
