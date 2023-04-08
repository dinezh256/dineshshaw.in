import Head from "next/head";

import NameCard from "../components/nameCard";

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
        <NameCard />
        <div className="contact-section-inner">
          <h6>CONTACT</h6>
          <div className="socials">
            <h6>SOCIALS</h6>
            <a
              href="https://in.linkedin.com/in/shawdinesh"
              target="_blank"
              className="linkedin"
            >
              LinkedIn <ArrowTopRight />
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
            <h6>EMAIL</h6>
            <h3>
              Hey there, are you stuck in the Stone Age of email writing? Well
              my prehistoric friend here's my email address - feel free
              to drop me a message on your trusty typewriter. Just make sure to
              send it via carrier pigeon for that authentic vintage touch.
            </h3>
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
