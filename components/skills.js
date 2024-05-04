import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import AnimateText from "./animateText";
import { skillsList } from "../utils";

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

const Skills = () => {
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <div className="skills-section">
      <AnimateText text="SKILLS" />
      <div className="skills-list" key={inView}>{skillsList.map(SkillPill)}</div>
      <div ref={ref} />
    </div>
  )
};

export default Skills;
