import Head from "next/head";

import ProjectCard from "../components/ProjectCard";
import { projects } from "../utils/constants";

const Work = () => {
  return (
    <>
      <Head>
        <title>Work - Dinesh Shaw</title>
        <meta title="description" content="My works as a web developer" />
      </Head>
      <div className="work-section">
        <div className="work-section-inner">
          <h6>WORK</h6>
          <div className="project-section">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
