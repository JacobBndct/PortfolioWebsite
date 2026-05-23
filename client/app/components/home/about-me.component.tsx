"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// --- Types ---
interface WindowDimensions {
  width: number;
  height: number;
}

// --- Window Size Hook (SSR‑safe) ---
function getWindowDimensions(): WindowDimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Safe to access window now
    setWindowDimensions(getWindowDimensions());

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

// --- Component ---
export default function AboutMe() {
  const widthLimit = 992;
  const { width } = useWindowDimensions();

  return (
    <div className="row align-items-center normal-section">
      <div className={width < widthLimit ? "" : "col-6 order-2"}>
        <div className="portfolio-image-container d-flex justify-content-center">
          <Image
            src="https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/PortfolioPicture2.png"
            alt="Portfolio picture"
            width={350}
            height={350}
            className="shadow-lg portfolio-image rounded-circle"
          />
        </div>
      </div>

      <div className={width < widthLimit ? "" : "col-6"}>
        <div>
          <h3>Welcome to my portfolio page!</h3>
          <p>
             Here you can explore some of my personal projects by scrolling down to see some featured projects or explore the different pages if you are interested in a specific discipline.
          </p>
          <p>
            I'm a multi-disciplinary game developer with a strong focus on software and a broad background several disciplines such as music, art, graphics, and game design.
          </p>  
          <p>
            As for my education, I currently hold a Bachelors of Computer Science and a certificate in Certificate in Graphics, Gaming, and Media from Dalhousie University in Halifax, Nova Scotia.
          </p>
        </div>
      </div>
    </div>
  );
}