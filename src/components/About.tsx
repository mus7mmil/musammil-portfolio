import "./styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para about-lead">
          I am a UI/UX Designer with a Bachelor of Computer Applications (BCA)
          and hands-on experience in UI/UX design, visual design and web
          development.
        </p>
        <p className="about-details">
          I enjoy transforming ideas into intuitive digital experiences through
          user research, wireframing, prototyping and thoughtful visual design.
          I focus on creating user-friendly interfaces that balance
          functionality, usability and aesthetics. Passionate about continuous
          learning, exploring creative solutions and designing meaningful
          digital products.
        </p>
        <div className="about-highlights">
          <div className="about-pill">
            <span className="pill-dot"></span>
            <span>BCA Graduate & UI/UX Specialist</span>
          </div>
          <div className="about-pill">
            <span className="pill-dot"></span>
            <span>User-Centered Design & Research</span>
          </div>
          <div className="about-pill">
            <span className="pill-dot"></span>
            <span>Design-to-Code Technical Awareness</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
