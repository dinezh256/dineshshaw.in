import { useEffect } from "react";
import Head from "next/head";

import ProjectCard from "../components/ProjectCard";

import PustackImage from "../assets/Pustack.webp";
import CovidStatsImage from "../assets/CovidStats.webp";
import RoyalMintImage from "../assets/RoyalMint.webp";
import DubariImage from "../assets/Dubari.webp";

const projects = [
  {
    id: 0,
    src: PustackImage,
    name: "PuStack",
    codeUrl: "",
    websiteUrl: "https://pustack.com",
    type: "solid",
  },
  {
    id: 1,
    src: CovidStatsImage,
    name: "Covid India Stats",
    codeUrl: "https://github.com/dinezh256/CovidIndiaStats",
    websiteUrl: "https://covidindiastat.netlify.app",
    type: "solid",
  },
  {
    id: 2,
    src: RoyalMintImage,
    name: "The Royal Mint",
    codeUrl: "https://github.com/dinezh256/royalmint",
    websiteUrl: "https://royalmint.vercel.app",
    type: "",
  },
  {
    id: 3,
    src: DubariImage,
    name: "Dubari",
    codeUrl: "https://github.com/dinezh256/dubari",
    websiteUrl: "https://www.dubari.com",
    type: "",
  },
];

const Work = () => {
  useEffect(() => {
    const elementWithOverflowHidden = document.querySelector(
      '[style*="overflow: hidden"]'
    );

    console.log({ elementWithOverflowHidden });
  }, []);
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
