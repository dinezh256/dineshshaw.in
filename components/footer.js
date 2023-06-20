import Image from "next/image";

import logo from "../assets/logo.svg"

const Footer = () => (
  <div className="footer">
    <div className="flex-between footer-section">
      <Image src={logo} width={20} height={20} />
      <h5>© {new Date().getFullYear()} Dinesh Shaw</h5>
    </div>
  </div>
);

export default Footer;
