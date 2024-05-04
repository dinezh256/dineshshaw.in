import Link from "next/link";
import Image from "next/image";

import AnimateText from "./animateText";
import { skillsList } from "../utils/constants";

const SkillPill = ({ id, imgSrc, name, url }) => (
  <Link
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
      priority
    />
    <span>{name}</span>
  </Link>
);

const Skills = () => (
  <div className="skills-section">
    <AnimateText text="SKILLS" />
    <div className="skills-list">{skillsList.map(SkillPill)}</div>
  </div>
);

export default Skills;
