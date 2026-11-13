import { useState } from "react";
import {
  MdOutlineDesignServices,
  MdLayers,
  MdCode,
} from "react-icons/md";
import {
  SiFigma,
  SiPython,
  SiDjango,
} from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import "./styles/Skills.css";

interface SkillCategory {
  title: string;
  badge: string;
  icon: JSX.Element;
  description: string;
  skills: { name: string; tag?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "UI/UX DESIGN",
    badge: "HUMAN-CENTERED",
    icon: <MdOutlineDesignServices className="skill-cat-icon" />,
    description:
      "Empathy-driven design methodologies focused on transforming user insights into intuitive, accessible, and meaningful digital experiences.",
    skills: [
      { name: "User Research" },
      { name: "User Flows" },
      { name: "Information Architecture" },
      { name: "Wireframing" },
      { name: "Prototyping" },
      { name: "Usability Testing" },
      { name: "Interaction Design" },
      { name: "Responsive Design" },
      { name: "Design Systems" },
      { name: "Visual Design" },
    ],
  },
  {
    title: "DESIGN TOOLS",
    badge: "CREATIVE SUITE",
    icon: <MdLayers className="skill-cat-icon" />,
    description:
      "Industry-standard tools for crafting component libraries, responsive prototypes, vector illustrations, and high-fidelity visual media.",
    skills: [
      { name: "Figma", tag: "Interface & Systems" },
      { name: "Adobe Photoshop", tag: "Visual Media & Graphics" },
      { name: "Adobe Illustrator", tag: "Vector & Iconography" },
    ],
  },
  {
    title: "DEVELOPMENT",
    badge: "TECHNICAL LITERACY",
    icon: <MdCode className="skill-cat-icon" />,
    description:
      "Practical programming and web architecture foundation that bridges design intent with frontend and backend engineering reality.",
    skills: [
      { name: "Python", tag: "Core Programming" },
      { name: "Django", tag: "Web Architecture" },
      { name: "Visual Studio Code", tag: "Development Workflow" },
    ],
  },
];

const toolLogos = [
  { name: "Figma", icon: <SiFigma /> },
  { name: "Adobe Photoshop", icon: <DiPhotoshop /> },
  { name: "Adobe Illustrator", icon: <DiIllustrator /> },
  { name: "Python", icon: <SiPython /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "VS Code", icon: <VscVscode /> },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section className="skills-section section-container" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <span className="skills-pretitle">EXPERTISE &amp; CAPABILITIES</span>
          <h2>
            Skills <span>&amp;</span> Toolset
          </h2>
          <p className="skills-subtitle">
            A comprehensive blend of user-centered design principles, creative
            visual tooling, and practical development knowledge.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="skills-tabs">
          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              className={`skills-tab-btn ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              data-cursor="disable"
            >
              {cat.icon}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Detailed Grid Display */}
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className={`skills-card ${activeTab === idx ? "card-highlighted" : ""}`}
            >
              <div className="skills-card-header">
                <div className="skills-card-icon-wrap">
                  {category.icon}
                </div>
                <div>
                  <span className="skills-card-badge">{category.badge}</span>
                  <h3>{category.title}</h3>
                </div>
              </div>

              <p className="skills-card-desc">{category.description}</p>

              <div className="skills-pill-container">
                {category.skills.map((skill, sIdx) => (
                  <div className="skill-pill" key={sIdx}>
                    <span className="skill-pill-bullet"></span>
                    <span className="skill-pill-text">{skill.name}</span>
                    {skill.tag && (
                      <span className="skill-pill-tag">{skill.tag}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Creative Tool Bar with Icons */}
        <div className="skills-tool-bar">
          <span className="tools-bar-label">Core Design &amp; Dev Environment:</span>
          <div className="tools-bar-icons">
            {toolLogos.map((tool, tIdx) => (
              <div className="tool-logo-badge" key={tIdx} title={tool.name}>
                <span className="tool-icon">{tool.icon}</span>
                <span className="tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
