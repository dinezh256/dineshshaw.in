import { useContext } from "react";
import Head from "next/head";
import ProjectCard from "../components/projectCard";
import AnimateText from "../components/animateText";
import MinimalWork from "../components/minimal/minimalWork";
import { GlobalContext } from "../contexts";
import { projects } from "../utils";

const Work = () => {
  const { isMinimal, viewModePreference } = useContext(GlobalContext);

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

      {(isMinimal || viewModePreference === null) && (
        <div className="mn-minimal-only">
          <MinimalWork />
        </div>
      )}
      {(!isMinimal || viewModePreference === null) && (
        <div className="mn-rich-only">
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
        </div>
      )}
    </>
  );
};

export default Work;
