import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import logo from "../assets/logo.svg";
import { navMenuItems, resumeLink, socials } from "../utils";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="footer-about">
          <Image src={logo} width={80} height={80} alt="logo" />
          <span>© {new Date().getFullYear()} Dinesh Shaw</span>
        </div>
        <div className="footer-links">
          <div className="footer-links-group">
            <ul>
              {navMenuItems.map(({ id, name, url }) => (
                <li key={id}>
                  <Link href={url}>{t(`nav.${name.toLowerCase()}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-group">
            <ul>
              {socials
                .filter((social) => social.showInFooter !== false)
                .map((social) => (
                  <li key={social.id}>
                    <Link
                      id={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(`socials.${social.id}`, { defaultValue: social.name })}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="footer-links-group">
            <ul>
              <li>
                <Link
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.resume")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dinezh256/dineshshaw.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.sourceCode")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
