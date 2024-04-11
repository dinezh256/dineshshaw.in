import ArrowTopRight from "../assets/icons/arrowTopRight";

const Contact = ({ animate }) => {
  return (
    <>
      <div className="contact-section">
        <div
          className={`contact-section-inner${
            animate ? " animate-contact" : ""
          }`}
        >
          {/* <h1>CONTACT</h1> */}
          <div className="socials">
            <h1>SOCIALS</h1>
            <a
              href="https://in.linkedin.com/in/shawdinesh"
              target="_blank"
              className="linkedin"
            >
              LinkedIn <ArrowTopRight />
            </a>
            <a
              href="https://github.com/dinezh256"
              target="_blank"
              className="github"
            >
              Github <ArrowTopRight />
            </a>
            <a
              href="https://twitter.com/Dinezh256"
              target="_blank"
              className="twitter"
            >
              Twitter <ArrowTopRight />
            </a>
            <a
              href="https://www.instagram.com/dineshlearning"
              target="_blank"
              className="instagram"
            >
              Instagram <ArrowTopRight />
            </a>
          </div>
          <div className="emails">
            <h1>EMAIL</h1>
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
