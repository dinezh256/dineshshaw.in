import { useContext } from "react";
import About from "../components/about";
import MinimalAbout from "../components/minimal/minimalAbout";
import { GlobalContext } from "../contexts";

const Home = () => {
  const { isMinimal } = useContext(GlobalContext);
  return isMinimal ? <MinimalAbout /> : <About />;
};

export default Home;
