import clsx from "clsx";

import AnimateText from "./animateText";
import { socials } from "../utils";

const Contact = ({ animate }) => {
  return (
    <>
      <div className="contact-section">
        <div className={`contact-section-inner${animate ? " animate-contact" : ""}`}>
          <div className="socials">
            <AnimateText text="SOCIALS" animate={false} />
            <div className="socials-list">
              {socials.map(social =>
                <a
                  id={social.id}
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("social-widget", social.id)}
                >
                  <div className="social-icon">{social.icon}</div>
                  <div className="social-meta">
                    <h6>{social.name}</h6>
                    <span>@{social.username}</span>
                  </div>
                </a>
              )}
            </div>

          </div>
          <div className="emails">
            <AnimateText text="EMAIL" animate={false} />
            <h2>
              If you have something in mind, whether it&apos;s a project, a
              role, or just a question, send me an email. I&apos;ll get back
              to you.
            </h2>
            <a href="mailto:heydineshshaw@gmail.com" target="_blank" rel="noopener noreferrer">
              heydineshshaw@gmail.com 📬
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
