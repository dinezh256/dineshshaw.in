import Head from "next/head";

import ProjectCard from "../components/projectCardLayout";
import { projects } from "../utils/constants";

const Work = () => {
  return (
    <>
      <Head>
        <title>Work | Dinesh Shaw</title>
        <meta title="description" content="Showcasing my works as a web developer" key="desc" />
      </Head>
      <div className="work-section">
        <div className="work-section-inner">
          <h1>WORK</h1>
          <div className="project-section">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} {...project} position={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
