import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              <span className="landing-name-line">MUHAMMED</span>
              <br />
              <span className="landing-name-line landing-name-accent">
                MUSAMMIL M M
              </span>
            </h1>
            <div className="landing-location">
              <span className="location-dot"></span>
              <span>Thrissur, Kerala, India</span>
            </div>
          </div>
          <div className="landing-info">
            <h3>UI/UX</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Designer</div>
              <div className="landing-h2-2">Creative</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Designer</div>
              <div className="landing-h2-info-1">Creative</div>
            </h2>
                       <p className="landing-description">
              Designing meaningful digital experiences through creativity,
              research and thoughtful interaction.
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;