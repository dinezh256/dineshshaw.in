import Image from "next/image";

import logo from "../assets/logo.svg";

const Footer = () => (
  <footer className="footer">
    <div className="flex-center footer-section">
      <Image src={logo} width={20} height={20} alt="logo" />
      <span>© {new Date().getFullYear()} Dinesh Shaw</span>
    </div>
  </footer>
);

export default Footer;
