import { motion } from "framer-motion";

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

export const Projects = () => {
  const openProjectLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const projects = [
    {
      title: "CoDriver",
      description:
        "A conversational AI assistant mobile app designed to keep you safe, focused, and engaged on the road. It monitors your behavior, provides real-time feedback while driving, and engages conversations about your route.",
      image: "/projects/CoDriver.png",
      tech: ["React Native", "Node.js", "Express.js", "MongoDB", "Claude", "Google Maps API", "OpenWeather API", "Spotify API", "ElevenLabs"],
      url: "https://github.com/acm-projects/CoDriver",
    },
    {
      title: "Aegis",
      description:
        "Aegis is a full-stack disaster response dashboard that aggregates real-time weather, outage, and pricing data to predict supply shortages and power failures during natural disasters.",
      image: "/projects/aegis.png",
      tech: ["React", "Python", "FastAPI", "Gemini", "NLP", "Twilio", "NASA API (Live)", "ODIN Dataset (Live)", "NOAA Dataset (Live)"],
      url: "https://devpost.com/software/aegis-d60u4e",
    },
    {
      title: "SubSlash",
      description:
        "AI subscription manager that helps you track subscriptions and get suggestions on them. It uses a combination of LLMs and web scraping to analyze your subscriptions and provide insights on how to optimize them.",
      image: "/projects/SubSlash.png",
      tech: ["React Native", "Python", "Express.js", "Node.js", "Supabase", "Claude", "BeautifulSoap"],
      url: "https://github.com/Insight14/SubSlash",
    },
    {
      title: "MedVisit",
      description:
        "MedVisit is a comprehensive healthcare consultation platform that bridges the gap between doctors and patients through intelligent AI-powered analysis using SOAP format and accessible reporting through an intuitive EMR dashboard.",
      imageStyle: "url('/projects/medvisit-diagram.png'), url('/projects/ai-saas.png')",
      tech: ["Python", "React.js", "Llama 3.1", "TwelveLabs", "FastAPI"],
      url: "https://devpost.com/software/medvisit",
    },
    {
      title: "Ask-and-Forget",
      description:
        "Smart Reminders is a context-aware notification system that replaces time-based alerts with intelligent triggers like location, weather, and real-world conditions using AI and cloud services. Built with FastAPI, Firebase, and Gemini API to transform natural language into automated actions.",
      image: "/projects/Ask-and-Forget.png",
      tech: ["Python", "FastAPI", "Firebase", "Gemini API", "Uvicorn"],
      url: "https://github.com/Pranav593/ask-and-forget",
    },
    {
      title: "NavStack",
      description:
        "A browser navigation system built from scratch using custom LinkedList, Stack, and Circular Array implementations with session persistence.",
      image: "/projects/NavStack.png",
      tech: ["Java"],
      url: "https://github.com/Insight14/NavStack",
    },
    {
      title: "BinaryGame",
      description:
        "A simple binary to hex to decimal numbers conversion game made using MIPS Assembly. Contains 10 levels for which ever mode the user wishes to select and play/practice.",
      image: "/projects/BinaryGame.png",
      tech: ["Assembly (MIPS)"],
      url: "https://github.com/Insight14/BinaryGame",
    },
    {
      title: "RGB Color Matcher",
      description:
        "Match a random color, provided by the system, by using Red, Green, and Blue sliders to adjust the RBG hex values to form the color",
      image: "/projects/RGBGame-3.png",
      tech: ["SwiftUI", "StoryBoard", "React Native (Separate)"],
    },
    {
      title: "iPhone 8-Ball",
      description:
        "Simple lucky 8-Ball Game that generates a random response when the user shakes their device.",
      image: "/projects/MAGIC8BALL.gif",
      tech: ["SwiftUI", "StoryBoard"],
    }
    
  ];
  
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onClick={project.url ? () => openProjectLink(project.url) : undefined}
            style={{ cursor: project.url ? "pointer" : "default" }}
          >
            <motion.div
              className="project-image"
              style={{
                backgroundImage: project.imageStyle || `url('${project.image}')`,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.tech.map((stack) => (
                <span key={`${project.title}-${stack}`}>{stack}</span>
              ))}
            </div>
          </motion.div>
        ))}

        
      </motion.div>
    </motion.section>
  );
};
