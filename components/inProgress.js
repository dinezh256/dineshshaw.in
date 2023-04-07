import Image from "next/image";
import InProgressImage from "../assets/in-progress.webp";

const InProgress = () => {
  return (
    <div className="inprogress-section">
      <div className="image-wrapper">
        <Image
          src={InProgressImage}
          className="progress-image"
          alt="under-construction"
          draggable={false}
          priority
        />
      </div>
      <h4>Work in Progress</h4>
    </div>
  );
};

export default InProgress;
