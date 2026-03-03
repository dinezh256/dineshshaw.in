import Head from "next/head";

import ProjectCard from "../components/projectCard";
import AnimateText from "../components/animateText";
import { projects } from "../utils";

const Work = () => {
  return (
    <>
      <Head>
        <title>Work | Dinesh Shaw</title>
        <meta
          name="description"
          content="Some of the projects I've worked on."
          key="desc"
        />
        <link rel="canonical" href="https://dineshshaw.in/work" />
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
              <span>View More</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
