import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Hero = () => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 140,
    damping: 20,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 140,
    damping: 20,
    mass: 0.5,
  });

  const backgroundTransform = useMotionTemplate`translate3d(${smoothX}px, ${smoothY}px, 0) scale(1.02)`;
  const contentRotateX = useTransform(smoothY, [-8, 8], [1.4, -1.4]);
  const contentRotateY = useTransform(smoothX, [-8, 8], [-1.4, 1.4]);
  const contentTransform = useMotionTemplate`rotateX(${contentRotateX}deg) rotateY(${contentRotateY}deg)`;

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(offsetX * -12);
    pointerY.set(offsetY * -10);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <motion.div
        className="hero-background"
        aria-hidden="true"
        style={{ transform: backgroundTransform }}
      />
      <motion.div
        className="hero-stars"
        aria-hidden="true"
        style={{ transform: backgroundTransform }}
      >
        <span className="shooting-star shooting-star-1" />
        <span className="shooting-star shooting-star-2" />
        <span className="shooting-star shooting-star-3" />
        <span className="shooting-star shooting-star-4" />
        <span className="shooting-star shooting-star-5" />
      </motion.div>

      <motion.div className="hero-container" style={{ transform: contentTransform }}>
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-badge">
            <span> 👋 Hello, I'm </span>
          </motion.div>
          <motion.h1
            className="glitch"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            Sourish Reddy
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            <span className="subtitle-white">CS + Data Science @</span>{' '}
            <span className="subtitle-orange">UT Dallas</span>
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            I am a college student and an aspiring AI & Security Engineer based in Dallas, TX. 
            My current interests lie in web and app development, with a good knowledge of React, 
            Python, REST API's, etc. 
          </motion.p>

          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a
              href="/projects/Sourish_Reddy_Update_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {" "}
              View My Resume
            </motion.a>
            <motion.a
              href="#contact" // Corrected from #contacts to #contact based on App.css
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          <motion.div className="social-links" variants={staggerContainer}>
            <motion.a href="https://github.com/Insight14" target="_blank">
              <i className="fab fa-github"> </i>
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/sri-satya-sourish-reddy/" target="_blank">
              <i className="fab fa-linkedin"> </i>
            </motion.a>
            <motion.a href="https://www.instagram.com/sourish._.ssr/" target="_blank">
              <i className="fab fa-instagram"> </i>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="typescript"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(10px)",
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
              
  {`const aboutMe: DeveloperProfile = 
  {
      username: "Insight14",
      origin: "Hyderabad, TL, India",
      role: "Full Time Student"
            "Part Time Gamer"
            "Overtime Programmer"
            "Certified grass toucher",
      skills: {
        coding languages: ["Java", "C/C++", "Python", "Swift", "HTML/CSS", "Javascript/Typescript"],
        frameworks: ["React", "Uvicorn", "Node.js", "Express.js", "FastAPI", "Vue", "TailwindCSS"]
        languages: ["English", "Telugu", "Hindi", "Spanish", "Japanese"]
      },
      traits: [
        "strategic slacker",
        "code whisperer",
        "brackets-balanced believer",
        "refactor evangelist",
      ],
      missionStatement:
        "Making the world a more compile-able place.",
      availability: "#opentowork"
                    "#opentoconnect",
    };`
    }
            </SyntaxHighlighter>
          </div>

          <motion.div
            className="floating-card"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon"> 💻 </span>
              <span className="card-text">
                {" "}
                Currently exploring Kubernetes!
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
