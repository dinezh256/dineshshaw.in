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

  useEffect(() => {
    if (router.pathname) {
      setActiveTab(
        router.pathname.includes("/blogs/")
          ? 2
          : navMenuItems.find((item) => router?.pathname === item.url)?.id
      );
    }
  }, [router.pathname]);

  return (
    <nav>
      <div className="navbar-backdrop">
        <div className="navbar-backdrop-inner">
          {Array(30).fill(0)
            .map((_, idx) => <div key={idx} id={idx} className="background-blur" style={{ backdropFilter: `blur(${0.2 * (idx + 1)}px)` }} />)
          }
        </div>
      </div>
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
                {icon({ size: 15, strokeWidth: 2.65 })}
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
