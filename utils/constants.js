import PustackImage from "../assets/Pustack.webp";
import CovidStatsImage from "../assets/CovidStats.webp";
import RoyalMintImage from "../assets/RoyalMint.webp";
import DubariImage from "../assets/Dubari.webp";

export const timeline = [
  {
    orgId: 0,
    orgName: "Pronation Events",
    yearwise: [
      {
        id: 0,
        start: "Aug",
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
        start: "Nov",
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
        start: "Feb",
        end: "Aug 2022",
        position: "SDE I",
      },
      {
        id: 1,
        start: "Sep",
        end: "Dec 2023",
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
        start: "Jan",
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
    name: "Contact",
    url: "/contact",
  },
];

export const whiteListRoutes = [
  '/',
  '/work',
  '/contact',
];
