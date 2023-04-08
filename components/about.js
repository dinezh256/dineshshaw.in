import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>Dinesh Shaw</title>
        <meta
          title="description"
          content="Experienced Web Developer, Freelancer. Skilled in JavaScript, ReactJS and NodeJS."
        />
      </Head>
      <div className="about-section">
        <div className="about-section-inner">
          <h6>ABOUT</h6>
          <h2>
            Hello, there! <span className="waive-hand">👋🏼</span>
          </h2>
          <h2 style={{ animationDelay: '' }}>
            My name is <b>Dinesh Shaw</b> and I'm a <b>Web Developer</b> and{" "}
            <b>Freelancer</b> based in Jamshedpur. I've been working in the
            Computer Software industry for a while now gaining a lot of
            experience in this field.
          </h2>
          <h2>
            I specialize in <b>JavaScript, ReactJS, NodeJS</b>, etc. I always strive to
            create innovative solutions that meet the needs of my clients.
            Paying attention to details is what sets me apart to deliver the
            best results possible.
          </h2>
          <h2>
            In this fast-paced industry, I'm always looking for ways to improve
            my skills and I'm constantly learning new things. If you're looking
            for a guy who is reliable, skilled, and passionate about
            their work, then I'm your guy. Let's work together to create
            something amazing!
          </h2>
        </div>
      </div>
    </>
  );
};

export default About;
