import Head from "next/head";

import ProjectCard from "../components/projectCardLayout";
import AnimateText from "../components/animateText";
import { projects } from "../utils/constants";

const Work = () => {
  return (
    <>
      <Head>
        <title>Work | Dinesh Shaw</title>
        <meta
          title="description"
          content="Showcasing my works as a web developer"
          key="desc"
        />
      </Head>
      <div className="work-section">
        <div className="work-section-inner">
          <AnimateText text="WORK" />
          <ul className="project-section">
            {projects.map((project, index) => (
              <li key={project.id}>
                <ProjectCard {...project} position={index} />
              </li>
            ))}
          </ul>
          <div className="flex-center view-more-wrapper">
            <a
              className="view-more"
              href="https://github.com/dinezh256?tab=repositories"
              target="_blank"
            >
              <span>View Other Projects</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
