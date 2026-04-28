import Link from "next/link";
import { navMenuItems, resumeLink, socials } from "../../utils";
import { cn } from "../../lib/utils";

const footerSocials = socials.filter((social) => social.showInFooter !== false);

// Shared link style used in all three footer columns
const footerLinkCls =
  "no-underline transition-[opacity,color] duration-150 text-mn-text-primary opacity-55 w-fit hover:opacity-100 hover:text-mn-accent-text";

// Local column component — title + stacked links
const FooterColumn = ({ title, children }) => (
  <div className="flex flex-col gap-3.5 min-w-[100px]">
    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mn-text-dim">
      {title}
    </div>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

const MinimalFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col gap-12 text-[13px] text-mn-text-primary mt-[140px] pt-16 border-t border-mn-divider">
      <div className="flex justify-between flex-wrap gap-10">
        <FooterColumn title="Navigation">
          {navMenuItems.map(({ id, name, url }) => (
            <Link key={id} href={url} className={footerLinkCls}>
              {name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Social">
          {footerSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkCls}
            >
              {social.name}
            </a>
          ))}
        </FooterColumn>

        <FooterColumn title="Extra">
          <a href={resumeLink} target="_blank" rel="noopener noreferrer" className={footerLinkCls}>
            Résumé
          </a>
          <a
            href="https://github.com/dinezh256/dineshshaw.in"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkCls}
          >
            Source
          </a>
        </FooterColumn>

        {/* Back to top — right-aligned, responsive */}
        <div className="flex flex-col gap-3.5 ml-auto items-end max-[500px]:ml-0 max-[500px]:items-start max-[500px]:w-full max-[500px]:border-t max-[500px]:border-mn-divider max-[500px]:pt-6">
          <button
            type="button"
            onClick={scrollToTop}
            className="bg-transparent border-none p-0 text-[12.5px] font-medium font-[inherit] text-mn-text-primary opacity-50 cursor-pointer flex items-center gap-1.5 transition-[opacity,transform] duration-150 hover:opacity-100 group"
          >
            Back to top{" "}
            <span className="text-[14px] transition-[transform,color] duration-200 group-hover:-translate-y-[3px] group-hover:text-mn-accent">
              ↑
            </span>
          </button>
        </div>
      </div>

      <div className="text-[12px] opacity-40">
        © {new Date().getFullYear()} Dinesh Shaw
      </div>
    </footer>
  );
};

export default MinimalFooter;
