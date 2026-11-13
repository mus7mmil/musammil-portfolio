import { useState } from "react";
import {
  MdArrowOutward,
  MdCopyright,
  MdContentCopy,
  MdCheck,
  MdMailOutline,
} from "react-icons/md";
import { FaLinkedinIn, FaBehance } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "muzammilm706@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <footer className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-badge">GET IN TOUCH</span>
          <h3>LET&apos;S CREATE SOMETHING MEANINGFUL.</h3>
          <p className="contact-intro">
            Have a project in mind or looking for a UI/UX Designer? I&apos;d love
            to connect and discuss creative opportunities.
          </p>
        </div>

        <div className="contact-flex">
          {/* Direct Email Box with Copy Feature */}
          <div className="contact-box contact-email-box">
            <h4>DIRECT EMAIL</h4>
            <div className="contact-email-wrap">
              <a
                href={`mailto:${email}`}
                className="contact-main-email"
                data-cursor="disable"
              >
                {email}
              </a>
              <button
                className="contact-copy-btn"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                data-cursor="disable"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <MdCheck className="copy-icon success" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <MdContentCopy className="copy-icon" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="contact-cta-action">
              <a
                href={`mailto:${email}?subject=UI/UX%20Design%20Inquiry`}
                className="contact-cta-btn"
                data-cursor="disable"
              >
                <MdMailOutline className="cta-icon" />
                <span>Send an Email</span>
                <MdArrowOutward className="cta-arrow" />
              </a>
            </div>

            <div className="contact-location-info">
              <span className="location-dot-pulse"></span>
              <span>Based in Thrissur, Kerala, India • Available for Remote &amp; Onsite Opportunities</span>
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="contact-box contact-social-box">
            <h4>CONNECT &amp; PORTFOLIO</h4>
            <a
              href="https://linkedin.com/in/muhammed-musammil-mm"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span className="social-icon-label">
                <FaLinkedinIn /> LinkedIn
              </span>
              <MdArrowOutward />
            </a>
            <a
              href="https://www.behance.net/musammilmm"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span className="social-icon-label">
                <FaBehance /> Behance
              </span>
              <MdArrowOutward />
            </a>
          </div>

          {/* Credits & Copyright */}
          <div className="contact-box contact-credit-box">
            <h2>
              Designed &amp; Crafted by <br />
              <span>Muhammed Musammil M M</span>
            </h2>
            <p className="contact-credit-subtitle">
              UI/UX Designer • Bachelor of Computer Applications
            </p>
            <h5>
              <MdCopyright /> 2026 Muhammed Musammil. All rights reserved.
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
