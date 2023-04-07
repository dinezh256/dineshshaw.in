import Image from "next/image";
import InProgressImage from "../assets/in-progress.webp";

const InProgress = () => {
  return (
    <div className="inprogress-section">
      <Image
        src={InProgressImage}
        className="progress-image"
        alt="under-construction"
        draggable={false}
        priority
      />
      <h4>Under Progress</h4>
    </div>
  );
};

export default InProgress;
