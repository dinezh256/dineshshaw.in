import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { navMenuItems, resumeLink, socials } from "../../utils";
import { MnDropdown, MnFooterSeparator } from "../ui/minimal";

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
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleLanguageChange = (e) => {
    const locale = e.target.value;
    const { pathname, asPath, query } = router;
    if (locale === router.locale) return;
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <>
      <MnFooterSeparator />
      <footer className="flex flex-col gap-12 text-[13px] text-mn-text-primary mt-6">
      <div className="flex justify-between flex-wrap gap-10">
        <FooterColumn title={t("footer.nav")}>
          {navMenuItems.map(({ id, name, url }) => (
            <Link key={id} href={url} className={footerLinkCls}>
              {t(`nav.${name.toLowerCase()}`)}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.social")}>
          {footerSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkCls}
            >
              {t(`socials.${social.id}`, { defaultValue: social.name })}
            </a>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.extra")}>
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkCls}
          >
            {t("footer.resume")}
          </a>
          <a
            href="https://github.com/dinezh256/dineshshaw.in"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkCls}
          >
            {t("footer.sourceCode")}
          </a>
        </FooterColumn>
      </div>

      <div className="flex justify-between items-center border-t border-mn-divider pt-6 mt-2 flex-wrap gap-4">
        <MnDropdown
          value={router.locale}
          onChange={handleLanguageChange}
          options={[
            { value: "en", label: "English" },
            { value: "hi", label: "हिंदी" },
            { value: "bn", label: "বাংলা" },
          ]}
        />

        <div className="text-[12px] opacity-40">
          © {new Date().getFullYear()} Dinesh Shaw
        </div>
      </div>
    </footer>
    </>
  );
};

export default MinimalFooter;
