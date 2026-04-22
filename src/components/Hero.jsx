import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import angularLogo from "../assets/angular.png";
import arduinoLogo from "../assets/arduino.png";
import awsLogo from "../assets/aws.png";
import cppLogo from "../assets/c++.svg";
import fastapiLogo from "../assets/fastapi.png";
import javaLogo from "../assets/Java-Logo.svg.png";
import linuxLogo from "../assets/linux.webp";
import nodeLogo from "../assets/node.png";
import pythonLogo from "../assets/python.svg.png";
import reactLogo from "../assets/react.png";
import swiftLogo from "../assets/swift.png";
import vueLogo from "../assets/vue.png";
import azureLogo from "../assets/Microsoft_Azure_Logo.svg.png";

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

const generateRandomDrift = () => {
  const angle = Math.random() * Math.PI * 2;
  const magnitude = 55 + Math.random() * 18;
  return {
    driftX: Math.cos(angle) * magnitude,
    driftY: Math.sin(angle) * magnitude,
  };
};

const generateRandomSize = (baseSize) => {
  const basePx = parseInt(baseSize);
  const randomSize = basePx + Math.random() * (basePx * 0.35);
  return Math.round(randomSize) + "px";
};

const techLogosData = [
  { name: "React", src: reactLogo, x: "8%", y: "12%", size: "86px", z: 3 },
  { name: "Node.js", src: nodeLogo, x: "28%", y: "8%", size: "82px", z: 5 },
  { name: "Python", src: pythonLogo, x: "54%", y: "10%", size: "84px", z: 4 },
  { name: "AWS", src: awsLogo, x: "78%", y: "15%", size: "84px", z: 4 },
  { name: "Azure", src: azureLogo, x: "92%", y: "38%", size: "90px", z: 6 },
  { name: "FastAPI", src: fastapiLogo, x: "18%", y: "35%", size: "80px", z: 5 },
  { name: "Angular", src: angularLogo, x: "44%", y: "48%", size: "84px", z: 4 },
  { name: "Vue", src: vueLogo, x: "68%", y: "42%", size: "86px", z: 5 },
  { name: "Arduino", src: arduinoLogo, x: "12%", y: "65%", size: "84px", z: 6 },
  { name: "Linux", src: linuxLogo, x: "38%", y: "72%", size: "80px", z: 4 },
  { name: "C++", src: cppLogo, x: "62%", y: "68%", size: "80px", z: 3 },
  { name: "Java", src: javaLogo, x: "82%", y: "75%", size: "82px", z: 5 },
  { name: "Swift", src: swiftLogo, x: "28%", y: "88%", size: "80px", z: 4 },
];

const techLogos = techLogosData.map((logo) => ({
  ...logo,
  size: generateRandomSize(logo.size),
  ...generateRandomDrift(),
}));

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
              href="/projects/SourishR_Resume.pdf"
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
          <div className="tech-cloud" aria-label="Technology logos">
            {techLogos.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="tech-cloud-item"
                style={{
                  "--tech-x": tech.x,
                  "--tech-y": tech.y,
                  "--tech-size": tech.size,
                  "--tech-z": tech.z,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: [0, tech.driftX],
                  y: [0, tech.driftY],
                  rotate: [-2, 2],
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.05, 0.88, 0.05],
                }}
                transition={{
                  duration: 7.4 + (index % 5) * 1.2,
                  delay: index * 0.18,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <img src={tech.src} alt={tech.name} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
