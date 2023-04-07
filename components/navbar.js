import Link from "next/link";
import { useState } from "react";

const navMenuItems = [
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

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (id) => {
    setActiveTab(id);
  }

  return (
    <div className="navbar">
      <div className="navbar-menu">
        <div className="slider" style={{ left: `${activeTab * 110}px` }} />
        {navMenuItems.map(({ name, id, url }) => (
          <Link
            href={url}
            as={url}
            key={id}
            className={activeTab === id ? "btn active" : "btn"}
            onClick={() => handleTabChange(id)}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
