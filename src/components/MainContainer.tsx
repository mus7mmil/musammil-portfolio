import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Skills from "./Skills";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );

  useEffect(() => {
    let timer: number;
    const resizeHandler = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 150);
    };

    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Skills />
            <Work />
            {isDesktopView && (
              <Suspense
                fallback={
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c2a4ff",
                    }}
                  >
                    Loading 3D Matrix...
                  </div>
                }
              >
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
