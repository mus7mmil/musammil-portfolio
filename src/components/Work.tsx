import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaBehance } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tools: string;
  image: string;
  link?: string;
  buttonText: string;
}

const projects: ProjectData[] = [
  {
    id: "loopin",
    number: "01",
    title: "Loopin",
    subtitle: "Bus & Metro Commuter App",
    category: "UI/UX Design | Mobile Application | Case Study",
    description:
      "A commuter-focused mobile application designed to improve bus and metro travel experiences. Focuses on making public transportation accessible, intuitive, and convenient through user research and thoughtful interaction design.",
    tools: "Figma, User Research, Wireframing, Prototyping",
    image: "/images/loopin-preview.svg",
    link: "https://www.behance.net/gallery/257132861/Loopin-Bus-Metro-Commuter-App-UIUX-Website",
    buttonText: "View Case Study on Behance",
  },
  {
    id: "pawzo",
    number: "02",
    title: "Pawzo",
    subtitle: "Pet Care Mobile App",
    category: "UI/UX Design | Mobile Application | Case Study",
    description:
      "A comprehensive pet care mobile application designed to make pet healthcare, appointment booking, and daily pet management seamless for owners through a friendly, stress-free user experience.",
    tools: "Figma, Design Systems, Mobile UI, Usability Testing",
    image: "/images/pawzo-preview.svg",
    link: "https://www.behance.net/gallery/257410269/Pawzo-Pet-Care-Mobile-App-UIUX-Case-Study",
    buttonText: "View Case Study on Behance",
  },
  {
    id: "petpamper",
    number: "03",
    title: "PetPamper Pro",
    subtitle: "Pet Care & Grooming Website",
    category: "UI/UX Design | Web Development",
    description:
      "A pet care and grooming website focused on simple navigation, clear service presentation, and a user-friendly browsing experience that bridges visual design with robust web architecture.",
    tools: "Python, Django, Figma, Responsive Web",
    image: "/images/petpamper-preview.svg",
    buttonText: "Design & Development Overview",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const boxes = document.querySelectorAll<HTMLElement>(".work-box");
      const workContainer = document.querySelector<HTMLElement>(".work-container");
      if (!boxes.length || !workContainer || !boxes[0].parentElement) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = boxes[0].getBoundingClientRect();
      const parentWidth = boxes[0].parentElement.getBoundingClientRect().width;
      const padding =
        parseInt(window.getComputedStyle(boxes[0]).padding || "0") / 2;

      translateX = Math.max(
        0,
        rect.width * boxes.length - (rectLeft + parentWidth) + padding + 120
      );
    }

    setTranslateX();

    if (window.innerWidth > 900 && translateX > 50) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    }
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            Featured <span>Projects</span>
          </h2>
          <p className="work-header-subtitle">
            Crafted with user-centered design, research insights, and modern
            interfaces.
          </p>
        </div>

        <div className="work-flex">
          {projects.map((project) => (
            <article className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div className="work-title-meta">
                    <h4>{project.title}</h4>
                    <span className="work-subtitle">{project.subtitle}</span>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>

                <p className="work-description">{project.description}</p>

                <div className="work-tools-section">
                  <span className="work-tools-label">Tools &amp; Methods:</span>
                  <p className="work-tools-list">{project.tools}</p>
                </div>

                <div className="work-actions">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn-primary"
                      data-cursor="disable"
                      aria-label={`${project.buttonText} for ${project.title}`}
                    >
                      <FaBehance className="work-btn-icon" />
                      <span>{project.buttonText}</span>
                    </a>
                  ) : (
                    <div
                      className="work-btn work-btn-detail"
                      data-cursor="disable"
                    >
                      <MdOutlineDesignServices className="work-btn-icon" />
                      <span>{project.buttonText}</span>
                    </div>
                  )}
                </div>
              </div>

              <WorkImage
                image={project.image}
                alt={`${project.title} Preview`}
                link={project.link}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
