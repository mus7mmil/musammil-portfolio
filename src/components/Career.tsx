import "./styles/Career.css";

const experiences = [
  {
    role: "UI/UX Designer Intern",
    company: "Dotin Creative Academy",
    location: "Kochi, Kerala",
    date: "2026",
    period: "Feb 2026 – Mar 2026",
    category: "INTERNSHIP EXPERIENCE",
    description:
      "Hands-on UI/UX design internship focusing on end-to-end user-centered digital product workflows.",
    responsibilities: [
      "Created wireframes, high-fidelity mockups, and interactive prototypes in Figma.",
      "Applied user-centered design principles to develop intuitive, accessible user interfaces.",
      "Conducted user research, stakeholder interviews, and usability testing sessions.",
      "Analyzed user feedback and incorporated qualitative insights into iterative improvements.",
      "Applied interaction design, responsive layouts, and visual hierarchy principles.",
      "Collaborated on design projects from initial concept through refinement and design handoff.",
    ],
  },
  {
    role: "ADVM – Advertising Design & Visual Media",
    company: "Dotin Creative Academy",
    location: "Kochi, Kerala",
    date: "2026",
    period: "Professional Certification",
    category: "CERTIFICATION",
    description:
      "Comprehensive certification covering advertising strategy, visual media storytelling, typography systems, layout composition, and brand identity development.",
    responsibilities: [],
  },
  {
    role: "Bachelor of Computer Applications (BCA)",
    company: "Indira Gandhi National Open University (IGNOU)",
    location: "India",
    date: "2022–2025",
    period: "Graduation",
    category: "HIGHER EDUCATION",
    description:
      "Rigorous 3-year curriculum encompassing software development, web technologies, database design, and algorithmic problem-solving — providing technical literacy that bridges design with code.",
    responsibilities: [],
  },
  {
    role: "Higher Secondary Education – Science",
    company: "Board of Higher Secondary Examinations",
    location: "Govt. of Kerala",
    date: "2022",
    period: "Higher Secondary",
    category: "EDUCATION",
    description:
      "Core curriculum in science, mathematics, and logical analysis, cultivating strong analytical and critical thinking foundations.",
    responsibilities: [],
  },
  {
    role: "Secondary School Examination",
    company: "Darussalam English School",
    location: "CBSE Board",
    date: "2020",
    period: "Secondary School",
    category: "EDUCATION",
    description:
      "Completed secondary education under the CBSE curriculum with emphasis on foundational academics, communication, and creative arts.",
    responsibilities: [],
  },
];

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {experiences.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <span className="career-category-tag">{item.category}</span>
                  <h4>{item.role}</h4>
                  <h5>
                    {item.company} • <span>{item.location}</span>
                  </h5>
                  <span className="career-subperiod">{item.period}</span>
                </div>
                <h3>{item.date}</h3>
              </div>

              <div className="career-desc-container">
                <p>{item.description}</p>
                {item.responsibilities.length > 0 && (
                  <ul className="career-responsibilities-list">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
