import Image from "next/image";
import DisplayImage from "../assets/DisplayPicture.webp";

const NameCard = () => {
  return (
    <div className="name-card">
      <div className="name-card-inner">
        <div className="name-card-image">
          <Image
            src={DisplayImage}
            className="display-image"
            alt="Dinesh Shaw"
            draggable={false}
            priority
          />
        </div>
        <h1>Dinesh Shaw</h1>
        <h2>👨🏻‍💻 Software Engineer</h2>
        <span>📍 Jamshedpur, Jharkhand</span>
      </div>
    </div>
  );
};

export default NameCard;
