import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const characters =
    "A-B*CD_EF-GH_JK*LM-NOP_QRS*TU-VWX_YZa*bcd_ef-gh_jkm_nopq_rstu_vw-xyz_023_456*789_";

const generateRandomChar = (text, index, timeElapsed, animationTime) => {
    if (text[index] === " ") return " ";
    const randomChar = Math.floor(Math.random() * characters.length);

    return Number(timeElapsed) >= Math.floor(Math.random() * animationTime)
        ? text[index]
        : characters[randomChar];
};

const AnimateText = ({ text, as = 'h1' }) => {
    const [isAnimating, setAnimating] = useState(true);
    const [randomisedText, setRandomisedText] = useState(text);
    const animationTime = text.length * 100 > 1000 ? 1000 : text.length * 100;

    const { ref, inView } = useInView({ threshold: 1 });

    useEffect(() => {
        if (isAnimating && inView) {
            let interval;

            setTimeout(() => {
                let timeElapsed = 0;

                interval = setInterval(() => {
                    timeElapsed += 100;
                    setRandomisedText(
                        text
                            .split("")
                            .map((_, idx) => generateRandomChar(text, idx, timeElapsed, animationTime))
                            .join("")
                    );
                }, 100);
            }, 50);

            setTimeout(() => {
                clearInterval(interval);
                setAnimating(false);
            }, animationTime + 50);
        }
    }, [text, inView]);

    const Wrapper = as;

    return <Wrapper className="section-header" ref={ref}>{isAnimating ? randomisedText : text}</Wrapper>;
};

export default AnimateText;
