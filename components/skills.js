import Image from "next/image";

import AnimateText from "./animateText";
import { skillsList } from "../utils";

const SkillPill = ({ id, imgSrc, name, url }) => (
  <a
    className="skill-pill"
    href={url}
    target="_blank"
    key={id}
    style={{ animationDelay: `${0.05 * (id + 1)}s` }}
  >
    <Image
      className="skill-image"
      width={11}
      height={11}
      src={imgSrc}
      alt={name}
      draggable={false}
      loading="lazy"
    />
    <span>{name}</span>
  </a>
);

const Skills = () => {
  return (
    <div className="skills-section">
      <AnimateText text="SKILLS" animate={false} />
      <div className="skills-list">{skillsList.map(SkillPill)}</div>
    </div>
  )
};

export default Skills;
