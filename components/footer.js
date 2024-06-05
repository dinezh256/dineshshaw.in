import Image from "next/image";

import logo from "../assets/logo.svg";
import Link from "next/link";
import { resumeLink, socials } from "../utils";

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
            <li>
              <Link href="/">
                About
              </Link>
            </li>
            <li>
              <Link href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link href="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links-group">
          <ul>
            {socials.filter(social => social.id !== 'instagram').map((social) => (
              <li key={social.id}>
                <Link id={social.id}
                  href={social.url}
                  target="_blank">
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-links-group">
          <ul>
            <li>
              <Link href={resumeLink} target="_blank">
                Résumé
              </Link>
            </li>
            <li>
              <Link href="https://github.com/dinezh256/dineshshaw.in" target="_blank">
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
