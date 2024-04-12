import path from "path";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";

import PustackImage from "../assets/Pustack.webp";
import CovidStatsImage from "../assets/CovidStats.webp";
import RoyalMintImage from "../assets/RoyalMint.webp";
import DubariImage from "../assets/Dubari.webp";

import Javascript from "../assets/svg/javascript.svg";
import React from "../assets/svg/react.svg";
import NextJs from "../assets/svg/nextjs.svg";
import HTML from "../assets/svg/html.svg";
import SCSS from "../assets/svg/scss.svg";
import StyledComponents from "../assets/svg/styled-components.svg";
import SemanticUI from "../assets/svg/semantic.svg";
import Firebase from "../assets/svg/firebase.svg";
import Express from "../assets/svg/express.svg";
import Node from "../assets/svg/node.svg";
import Git from "../assets/svg/git.svg";
import { PenTool, Command, User } from "react-feather";

export const humanizeDuration = (time) => {
  const durations = intervalToDuration({ start: 0, end: time * 1000 });
  return formatDuration(durations);
};

export const resumeLink =
  "https://drive.google.com/file/d/11uQnNntOxyKUO5hKKFobUmZoaWrSrlrQ/view?usp=drive_link";

export const timeline = [
  {
    orgId: 0,
    orgName: "Pronation Events",
    yearwise: [
      {
        id: 0,
        start: "Jul 2020",
        end: "Oct 2020",
        position: "Intern (FE)",
      },
    ],
  },
  {
    orgId: 1,
    orgName: "Code Policy",
    yearwise: [
      {
        id: 0,
        start: "Nov 2020",
        end: "Dec 2020",
        position: "Intern (FE)",
      },
    ],
  },
  {
    orgId: 2,
    orgName: "PuStack Technologies",
    yearwise: [
      {
        id: 0,
        start: "Feb 2021",
        end: "Aug 2021",
        position: "SDE I",
      },
      {
        id: 1,
        start: "Sep 2021",
        end: "Dec 2021",
        position: "SDE II",
      },
    ],
  },
  {
    orgId: 3,
    orgName: "Auzmor Inc.",
    yearwise: [
      {
        id: 0,
        start: "Jan 2022",
        end: "Dec 2022",
        position: "SWE I",
      },
      {
        id: 1,
        start: "Jan 2023",
        end: "Present",
        position: "SWE III",
      },
    ],
  },
];

export const projects = [
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
    websiteUrl: "https://dubari.netlify.app/",
    type: "",
  },
];

export const navMenuItems = [
  {
    id: 0,
    name: "About",
    url: "/",
    icon: (props) => <User {...props} />,
  },
  {
    id: 1,
    name: "Work",
    url: "/work",
    icon: (props) => <Command {...props} />,
  },
  {
    id: 2,
    name: "Blogs",
    url: "/blogs",
    icon: (props) => <PenTool {...props} />,
  },
];

export const whiteListRoutes = ["/", "/work", "/contact", "/blogs"];

export const navbarRoutes = ["/", "/work", "/contact", "/blogs"];

const docsDirectory = path.join(process.cwd(), "markdown");

export const blogsList = [
  {
    id: 0,
    slug: "securely-transmit-data-in-unexpected-situations-using-react",
    fileName: "secure-transmission",
    createdAt: 1686933164331,
    readDuration: 120,
    name: "Securely Transmit Data in Unexpected Situations using React and Window events",
    description:
      "Sending data to the Server when the User navigates away, closes/reloads the tab.",
    keywords: "Server,React,React.js,Browser,unload,beforeunload,window,events",
  },
  {
    id: 1,
    slug: "understanding-the-challenges-of-lazy-loading-and-code-splitting-in-react",
    fileName: "react-lazy-loading-challenges",
    createdAt: 1687086811265,
    readDuration: 150,
    name: "Understanding the Challenges of Lazy Loading and Code Splitting in React",
    description:
      "Explore the challenges of lazy loading and code splitting in React, and discover strategies to overcome them for optimized performance and user experience.",
    keywords: "lazy loading,React,React.js,code splitting,user experience",
  },
  {
    id: 2,
    slug: "shifting-focus-from-an-element-to-popup-in-react",
    fileName: "shift-focus-to-popup",
    createdAt: 1711269071522,
    readDuration: 210,
    name: "Enhancing Accessibility: Shifting Focus from an Element to Popup in React",
    description:
      "Learn how to improve the accessibility of your React application by ensuring that focus shifts seamlessly from triggering elements to popups. Explore a step-by-step guide utilizing React hooks and Semantic UI components to create a more inclusive user experience for keyboard and screen reader users.",
    keywords:
      "react accessibility, keyboard navigation, assistive technologies, semantic ui popup, focus management, accessibility in web development, inclusive user experience, react hooks, web accessibility best practices",
  },
];

export const notFoundBlogMeta = {
  id: 0,
  slug: "",
  fileName: "",
  createdAt: 0,
  readDuration: 0,
  name: "Blogs",
};

export const getBlogMeta = (slug) =>
  blogsList.find((blog) => blog.slug === slug);

export const getDocBySlug = (slug) => {
  const blogMeta = getBlogMeta(slug);

  if (blogMeta) {
    return {
      file: path.join(docsDirectory, `${blogMeta.fileName}.md`),
      blogMeta,
    };
  }

  return {
    file: path.join(docsDirectory, "not-found.md"),
    blogMeta: notFoundBlogMeta,
  };
};

export const skillsList = [
  {
    id: 0,
    imgSrc: Javascript,
    name: "JavaScript",
  },
  {
    id: 1,
    imgSrc: React,
    name: "React.js",
  },
  {
    id: 2,
    imgSrc: NextJs,
    name: "Next.js",
  },
  {
    id: 3,
    imgSrc: HTML,
    name: "HTML 5",
  },
  {
    id: 4,
    imgSrc: SCSS,
    name: "SCSS",
  },
  {
    id: 5,
    imgSrc: Firebase,
    name: "Firebase",
  },
  {
    id: 6,
    imgSrc: Node,
    name: "Node.js",
  },
  {
    id: 7,
    imgSrc: Express,
    name: "Express.js",
  },
  {
    id: 8,
    imgSrc: Git,
    name: "Git",
  },
  {
    id: 9,
    imgSrc: SemanticUI,
    name: "Semantic UI",
  },
  {
    id: 10,
    imgSrc: StyledComponents,
    name: "Styled Components",
  },
];

export const getBlogUrl = (slug) => {
  return `https://dineshshaw.in/blogs/${slug}`;
};
