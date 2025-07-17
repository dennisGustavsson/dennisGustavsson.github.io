import GitHubProjectsComponent from "../components/GitHubProjectsComponent";
import ModalComponent from "../components/ModalComponent";
import useEmail from "../assets/hooks/useEmailHook";
import { useRef, useState } from "react";

const AboutSection = () => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const encodedEmail = "ZGVubmlzZ3VzdGF2c3Nvbjg3QGdtYWlsLmNvbQ==";
  const email = useEmail(encodedEmail);

  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container">
      <div className="text-container">
        {/* PROJECTS SECTION */}

        <section className="text-box topbox">
          <h3>
            <button onClick={handleClick} className="btn projectsBtn">
              Projects
            </button>
          </h3>
        </section>

        {/* GITHUB LINKS SECTION */}

        <section id="gh-links" className="text-box" ref={ref}>
          <h3>GitHub Projects</h3>
          <GitHubProjectsComponent />
        </section>

        {/* ABOUT SECTION */}

        <section className="text-box">
          <h3>About Me</h3>
          <div>
            <img
              className="aboutImage"
              src={import.meta.env.BASE_URL + "assets/aboutportrait.jpg"}
              alt="Portrait"
            />
          </div>
          <p>
            After years of crafting visual narratives through high-end
            retouching, I was drawn to the creative and logical challenges of
            building for the web. Today, I combine visual sensitivity with solid
            development practices to create user-friendly digital experiences.
          </p>
          <div>
            <button className="btn" onClick={() => setShowModal(true)}>
              Contact
            </button>
          </div>
          <ModalComponent
            shouldShow={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <div className="contact-modal">
              <a href={`mailto:${email}`}>email me</a>
              <a href="https://www.linkedin.com/in/dennisgustavsson-hello/">
                linkedin
              </a>
            </div>
          </ModalComponent>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;
