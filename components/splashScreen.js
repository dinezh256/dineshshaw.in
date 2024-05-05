import Image from 'next/image';

import logo from "../assets/logo.svg";

function SplashScreen(props) {
    return (
        <Image className="animate-splash" src={logo} alt="logo" />
    );
}

export default SplashScreen;