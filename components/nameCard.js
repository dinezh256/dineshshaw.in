import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import DisplayImage from "../assets/DisplayPicture.jpeg";
import logo from "../assets/logo.svg";

const NameCard = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="name-card">
      <Image className="name-logo" src={logo} alt="logo" />
      <div className="name-card-inner">
        <div className="name-card-image">
          <Image
            src={DisplayImage}
            className={clsx("display-image", loaded ? "no-blur" : "blur-image")}
            alt="profile photo"
            draggable={false}
            priority
            quality={95}
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>
        <div className="name-card-meta">
          <h1>Dinesh Shaw</h1>
          <h2>Software Engineer</h2>
          <span>Jamshedpur, Jharkhand</span>
        </div>
      </div>
    </div>
  );
};

export default NameCard;
