import Image from "next/image";

import logo from "../assets/logo.svg";
import Link from "next/link";
import { resumeLink, socials, navMenuItems } from "../utils";

const Footer = () => (
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
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-links-group">
          <ul>
            {socials.filter(social => social.showInFooter !== false).map((social) => (
              <li key={social.id}>
                <Link id={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-links-group">
          <ul>
            <li>
              <Link href={resumeLink} target="_blank" rel="noopener noreferrer">
                Résumé
              </Link>
            </li>
            <li>
              <Link href="https://github.com/dinezh256/dineshshaw.in" target="_blank" rel="noopener noreferrer">
                Source
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
