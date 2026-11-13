import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const containers = containerRef.current;
    const listeners: { element: HTMLDivElement; handler: () => void }[] = [];

    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          container.addEventListener("click", handler);
          listeners.push({ element: container, handler });
        }
      });
    }
    return () => {
      listeners.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
    };
  }, []);

  return (
    <div className="whatIDO" id="services">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>UI/UX DESIGN</h3>
              <h4>User-Centered Design &amp; Strategy</h4>
              <p>
                Crafting intuitive digital experiences through rigorous user
                research, wireframing, interactive prototyping and design
                systems that harmonize usability and visual elegance.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">User Research</div>
                <div className="what-tags">User Flows</div>
                <div className="what-tags">Wireframing</div>
                <div className="what-tags">Prototyping</div>
                <div className="what-tags">Design Systems</div>
                <div className="what-tags">Usability Testing</div>
                <div className="what-tags">Interaction Design</div>
                <div className="what-tags">Figma</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>VISUAL &amp; TECH</h3>
              <h4>Visual Design &amp; Web Development</h4>
              <p>
                Blending strong graphic communication and creative tooling with
                practical web development fundamentals to deliver responsive,
                technically feasible interfaces.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Adobe Photoshop</div>
                <div className="what-tags">Adobe Illustrator</div>
                <div className="what-tags">Visual Design</div>
                <div className="what-tags">Responsive Design</div>
                <div className="what-tags">Information Architecture</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">Django</div>
                <div className="what-tags">VS Code</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
