import Link from "next/link";
import { navMenuItems, resumeLink, socials } from "../../utils";

const footerSocials = socials.filter((social) => social.showInFooter !== false);

const MinimalFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mn-footer">
      <div className="mn-footer-main">
        <div className="mn-footer-col">
          <div className="mn-footer-label">Navigation</div>
          <div className="mn-footer-links">
            {navMenuItems.map(({ id, name, url }) => (
              <Link key={id} href={url}>
                {name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mn-footer-col">
          <div className="mn-footer-label">Social</div>
          <div className="mn-footer-links">
            {footerSocials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mn-footer-col">
          <div className="mn-footer-label">Extra</div>
          <div className="mn-footer-links">
            <a href={resumeLink} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
            <a
              href="https://github.com/dinezh256/dineshshaw.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </div>
        </div>

        <div className="mn-footer-col mn-footer-col--right">
          <button onClick={scrollToTop} className="mn-back-to-top">
            Back to top <span>↑</span>
          </button>
        </div>
      </div>

      <div className="mn-footer-meta">
        © {new Date().getFullYear()} Dinesh Shaw
      </div>
    </footer>
  );
};

export default MinimalFooter;
