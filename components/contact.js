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
              Interested in talking? Let's do it, feel free to drop me a message
              on your trusty typewriter and we can connect at a suitable time.
            </h2>
            <a href="mailto:heydineshshaw@gmail.com" target="_blank">
              heydineshshaw@gmail.com 📬
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
