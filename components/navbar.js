import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const [vibrate, setVibrate] = useState(false);
  const [activeTab, setActiveTab] = useState(
    navMenuItems.find((item) => router?.pathname === item.url)?.id
  );

  const handleTabChange = (id) => {
    if (id !== activeTab) {
      setActiveTab(id);
      setVibrate(true);
    }
  };

  useEffect(() => {
    if (vibrate) {
      navigator.vibrate(20);
      setVibrate(false);
    }
  }, [vibrate]);

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
