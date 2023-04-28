import Head from "next/head";
import ArrowTopRight from "../assets/icons/arrowTopRight";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact - Dinesh Shaw</title>
        <meta
          title="description"
          content="If you're looking for a guy who is reliable, skilled, and passionate about
          their work, then I'm your guy. Let's work together to create something amazing!"
        />
      </Head>
      <div className="contact-section">
        <div className="contact-section-inner">
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
              Hey there, are you stuck in the Stone Age of email writing? Well
              my prehistoric friend here's my email address - feel free to drop
              me a message on your trusty typewriter. Just make sure to send it
              via carrier pigeon for that authentic vintage touch.
            </h2>
            <a href="mailto:heydineshshaw@gmail.com" target="_blank">
              heydineshshaw@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
