import Image from "next/image";

import { skillsList } from "../utils/constants";

const SkillPill = ({ id, imgSrc, name }) => (
  <div
    className="skill-pill"
    key={id}
    style={{ animationDelay: `${0.05 * (id + 1)}s` }}
  >
    <Image
      className="skill-image"
      width={16}
      height={16}
      src={imgSrc}
      alt={name}
      draggable={false}
      priority
    />
    <span>{name}</span>
  </div>
);

const Skills = () => (
  <div className="skills-section">
    <h1>SKILLS</h1>
    <div className="skills-list">{skillsList.map(SkillPill)}</div>
  </div>
);

export default Skills;
