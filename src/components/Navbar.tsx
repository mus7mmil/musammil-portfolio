import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const navItems = [
  { label: "HOME", href: "#landingDiv" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>("landingDiv");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sectionIds = [
        "landingDiv",
        "about",
        "experience",
        "skills",
        "work",
        "contact",
      ];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="header">
        <a
          href="#landingDiv"
          onClick={(e) => scrollToSection(e, "#landingDiv")}
          className="navbar-title"
          data-cursor="disable"
        >
          <span className="navbar-logo-badge">M</span>
          <span className="navbar-logo-text">MUSAMMIL</span>
        </a>

        <a
          href="mailto:muzammilm706@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          muzammilm706@gmail.com
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`mobile-nav-toggle ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}>
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li
                key={item.href}
                className={isActive ? "active-nav-item" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  data-cursor="disable"
                >
                  <HoverLinks text={item.label} />
                  {isActive && <span className="nav-active-dot" />}
                </a>
              </li>
            );
          })}
        </ul>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
