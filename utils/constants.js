import path from "path";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";

import PustackImage from "../assets/Pustack.webp";
import CovidStatsImage from "../assets/CovidStats.webp";
import RoyalMintImage from "../assets/RoyalMint.webp";
import DubariImage from "../assets/Dubari.webp";

export const humanizeDuration = (time) => {
  const durations = intervalToDuration({ start: 0, end: time * 1000 });
  return formatDuration(durations);
};

export const timeline = [
  {
    orgId: 0,
    orgName: "Pronation Events",
    yearwise: [
      {
        id: 0,
        start: "Aug 2020",
        end: "Dec 2020",
        position: "Freelancer (FE)",
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
        position: "Freelancer (FE)",
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
    websiteUrl: "https://www.dubari.com",
    type: "",
  },
];

export const navMenuItems = [
  {
    id: 0,
    name: "About",
    url: "/",
  },
  {
    id: 1,
    name: "Work",
    url: "/work",
  },
  {
    id: 2,
    name: "Blogs",
    url: "/blogs",
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
    description: "Sending data to the Server when the User navigates away, closes/reloads the tab."
  },
];

const notFoundBlogMeta = {
  id: 0,
  slug: "",
  fileName: "",
  createdAt: 0,
  readDuration: 0,
  name: "No Blog Found",
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
