import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const ProjectCard = ({ src, type, name, codeUrl, websiteUrl, position }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`project-card ${type}`}
      style={{ animationDelay: `${0.1 * (position + 1)}s` }}
    >
      <div className="project-card-top">
        <Image
          className={clsx("card-image", loaded ? "no-blur" : "blur-image")}
          src={src}
          priority
          draggable={false}
          alt={`${name} thumbnail`}
          onLoadingComplete={() => setLoaded(true)}
        />
        <div className="project-details">
          <h4 className="project-name">{name}</h4>
          <div className="project-buttons">
            <a className="visit" href={websiteUrl} target="_blank">
              <span>Visit</span>
            </a>
            {codeUrl && (
              <a href={codeUrl} target="_blank">
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
