import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";

import { GlobalContext } from "../contexts";
import { navMenuItems } from "../utils";

TopBarProgress.config({
  barColors: {
    "0": "#276ee0",
    "1.0": "#68a0fb"
  },
  shadowBlur: 5
});

const Navbar = () => {
  const router = useRouter();
  const isBlogPage = router?.pathname?.includes("/blogs/");
  const activeIdx = isBlogPage ? 2 : navMenuItems.find((item) => router?.pathname === item.url)?.id;

  const { isLoading, setIsLoading } = useContext(GlobalContext);

  const [vibrate, setVibrate] = useState(false);
  const [activeTab, setActiveTab] = useState(activeIdx);

  const handleTabChange = (id) => {
    if (id !== activeTab) {
      setVibrate(true);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (vibrate) {
      navigator.vibrate(10);
      setVibrate(false);
    }
  }, [vibrate]);

  useEffect(() => {
    if (router.pathname) {
      setActiveTab(activeIdx);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (activeIdx !== activeTab) {
      setActiveTab(activeIdx)
      setIsLoading(false);
    }
  }, [activeIdx]);

  return (
    <nav>
      {isLoading && <TopBarProgress />}
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
                {icon({ size: 15, strokeWidth: 2.25 })}
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
