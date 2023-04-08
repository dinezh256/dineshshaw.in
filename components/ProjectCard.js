import Image from "next/image";

const ProjectCard = ({
  src,
  type,
  name = "project-image",
  codeUrl,
  websiteUrl,
}) => {
  return (
    <div className={`project-card ${type}`}>
      <div className="project-card-top">
        <Image
          className="card-image"
          src={src}
          priority
          alt={name}
          draggable={false}
        />
        <div className="project-details">
          <h4 className="project-name">{name}</h4>
          <div className="project-buttons">
            <a href={websiteUrl} target="_blank" className="visit">
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
