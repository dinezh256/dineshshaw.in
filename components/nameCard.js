import Image from "next/image";
import DisplayImage from "../assets/DisplayPicture.webp";

const NameCard = () => {
  return (
    <div className="name-card">
      <div className="name-card-inner">
        <Image
          src={DisplayImage}
          className="display-image"
          alt="Dinesh"
          draggable={false}
          priority
        />
        <h1>Dinesh Shaw</h1>
        <h5>Software Engineer</h5>
      </div>
    </div>
  );
};

export default NameCard;
