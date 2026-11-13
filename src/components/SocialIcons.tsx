import { FaBehance, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { useEffect, useRef } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const social = containerRef.current;
    if (!social) return;

    const cleanups: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let animId: number;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const currentRect = elem.getBoundingClientRect();
        const x = e.clientX - currentRect.left;
        const y = e.clientY - currentRect.top;

        if (x < 50 && x > 0 && y < 50 && y > 0) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = currentRect.width / 2;
          mouseY = currentRect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove, { passive: true });
      animId = requestAnimationFrame(updatePosition);

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animId);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  

  return (
    <div className="icons-section">
      <div
        className="social-icons"
        data-cursor="icons"
        id="social"
        ref={containerRef}
      >
        <span>
          <a
            href="https://linkedin.com/in/muhammed-musammil-mm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.behance.net/musammilmm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance Portfolio"
          >
            <FaBehance />
          </a>
        </span>
        <span>
          <a
            href="mailto:muzammilm706@gmail.com"
            aria-label="Send Email"
          >
            <FaEnvelope />
          </a>
        </span>
      </div>

      <a
        className="resume-button"
       href="/documents/Muhammed_Musammil_MM_UIUX_Designer_Resume.pdf"
      target="_blank"
rel="noopener noreferrer"
        data-cursor="disable"
        aria-label="Contact for Resume"
      >
        <HoverLinks text="CONTACT / CV" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
