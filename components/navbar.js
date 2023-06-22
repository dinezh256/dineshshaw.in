import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { navMenuItems } from "../utils/constants";

const Navbar = () => {
  const router = useRouter();

  const [vibrate, setVibrate] = useState(false);
  const [activeTab, setActiveTab] = useState(
    router.pathname.includes("/blogs/")
      ? 2
      : navMenuItems.find((item) => router?.pathname === item.url)?.id
  );

  const handleTabChange = (id) => {
    if (id !== activeTab) {
      setActiveTab(id);
      setVibrate(true);
    }
  };

  useEffect(() => {
    if (vibrate) {
      navigator.vibrate(15);
      setVibrate(false);
    }
  }, [vibrate]);

  return (
    <div className="navbar">
      <div className="navbar-menu">
        <div className="slider" style={{ left: `${activeTab * 116}px` }} />
        {navMenuItems.map(({ name, id, url, icon }) => (
          <Link
            href={url}
            as={url}
            key={id}
            className={activeTab === id ? "btn active" : "btn"}
            onClick={() => handleTabChange(id)}
          >
            {icon({ size: 15, strokeWidth: 2.65 })}
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
