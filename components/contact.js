import AnimateText from "./animateText";
import ArrowTopRight from "../assets/icons/arrowTopRight";
import { GitHub, Instagram, Linkedin } from "react-feather";

const contacts = [
  {
    id: 'github',
    class: 'github',
    url: 'https://github.com/dinezh256',
    icon: <GitHub size={14} strokeWidth={1.25} />,
    name: 'Github',
  },
  {
    id: 'linkedin',
    class: 'linkedin',
    url: 'https://in.linkedin.com/in/shawdinesh',
    icon: <Linkedin size={14} strokeWidth={1.25} />,
    name: 'Linkedin',
  },
  {
    id: 'twitter',
    class: 'twitter',
    url: 'https://twitter.com/Dinezh256',
    icon: '𝕏',
    name: 'Twitter',
  },
  {
    id: 'instagram',
    class: 'instagram',
    url: 'https://www.instagram.com/dineshlearning',
    icon: <Instagram size={14} strokeWidth={1.25} />,
    name: 'Instagram',
  },
]

const Contact = ({ animate }) => {
  return (
    <>
      <div className="contact-section">
        <div className={`contact-section-inner${animate ? " animate-contact" : ""}`}>
          <div className="socials">
            <AnimateText text="SOCIALS" />
            {contacts.map(contact =>
              <a
                id={contact.id}
                href={contact.url}
                target="_blank"
                className={contact.class}
              >
                <span>{contact.icon}</span> {contact.name} <ArrowTopRight />
              </a>)}

          </div>
          <div className="emails">
            <AnimateText text="EMAIL" />
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
