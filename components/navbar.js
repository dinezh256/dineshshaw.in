import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { useEffect, useState } from "react";
import { useWebHaptics } from "web-haptics/react";

import { navMenuItems } from "../utils";

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { trigger } = useWebHaptics();
  const isBlogPage = router?.pathname?.includes("/blogs/");
  const activeIdx = isBlogPage
    ? 2
    : navMenuItems.find((item) => router?.pathname === item.url)?.id;

  const [activeTab, setActiveTab] = useState(activeIdx);

  const handleTabChange = (id) => {
    if (id !== activeTab) {
      trigger("nudge");
    }
  };

  useEffect(() => {
    if (router.pathname || activeIdx !== activeTab) {
      setActiveTab(activeIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                aria-current={activeTab === id ? "page" : undefined}
              >
                {icon({ size: 15, strokeWidth: 2.75 })}
                {t(`nav.${name.toLowerCase()}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
