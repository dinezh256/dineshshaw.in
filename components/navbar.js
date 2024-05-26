import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { navMenuItems } from "../utils";


const Navbar = () => {
  const router = useRouter();
  const isBlogPage = router?.pathname?.includes("/blogs/");
  const activeIdx = isBlogPage ? 2 : navMenuItems.find((item) => router?.pathname === item.url)?.id;


  const [vibrate, setVibrate] = useState(false);
  const [activeTab, setActiveTab] = useState(activeIdx);

  const handleTabChange = (id) => {
    if (id !== activeTab) {
      setVibrate(true);
    }
  };

  useEffect(() => {
    if (vibrate) {
      navigator.vibrate(10);
      setVibrate(false);
    }
  }, [vibrate]);

  useEffect(() => {
    if (router.pathname || activeIdx !== activeTab) {
      setActiveTab(activeIdx);
    }
  }, [router.pathname, activeIdx]);

  return (
    <nav>
      <div className="navbar-backdrop" aria-hidden />
      <div className="navbar">
        <div className="slider" style={{ left: `${activeTab * 116}px` }} />
        <ul className="navbar-menu">
          {navMenuItems.map(({ name, id, url, icon }) => (
            <li key={id}>
              <Link
                href={url}
                as={url}
                className={activeTab === id ? "btn active" : "btn"}
                onClick={() => handleTabChange(id)}
              >
                {icon({ size: 15, strokeWidth: 2.75 })}
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
