import profilePhotoAsset from "@/assets/profile-photo.png.asset.json";

/**
 * PORTFOLIO DATA — edit this single file to update the whole site.
 * Projects, skills, experience, certifications, links, images, video and
 * resume URLs all live here. Leave a field as "" (empty string) to hide it.
 */

export const profile = {
  name: "Diksha Rade",
  greeting: "Hello, I'm Diksha",
  headline: "Building ideas with AI & Code.",
  subtitle: "B.Tech AI & Data Science | VIT Pune",
  intro:
    "An aspiring AI and Data Science professional passionate about building intelligent solutions, exploring emerging technologies, and turning ideas into practical applications.",
  // Replace with your photo: import an image or paste a URL.
  photoUrl: "/portfolio.png",
  tagline: "Designed to learn. Built to create.",
  // Short text shown in the navbar under your name
  navTagline: "AI & Data Science Fresher",
};

export const links = {
  email: "diksha.rade24@vit.edu",
  linkedin: "https://www.linkedin.com/in/diksharade",
  github: "https://github.com/Diksha2506",
  leetcode: "https://leetcode.com/u/Diksha795/", // add your verified LeetCode profile URL
  resumeUrl: "/Diksha_Resume.pdf", // public URL of your resume PDF (enables View/Download)
  videoUrl: "", // intro video URL or local file path (empty = placeholder)
};

export type Project = {
  title: string;
  category: "AI/ML" | "Web Development" | "Computer Vision" | "Systems" | "Blockchain & AI";
  description: string;
  technologies: string[];
  imageUrl: string; // cover image URL — empty shows a styled placeholder
  githubUrl: string;
  liveUrl: string; // empty = no live demo button
  caseStudyUrl: string; // empty = no case study button
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: "MedDecision — Real-Time Emergency Resource Allocation",
    category: "AI/ML",
    description:
      "Intelligent allocation of emergency medical resources in real time, helping hospitals prioritize and route critical cases faster.",
    technologies: ["Python", "Machine Learning", "Optimization"],
    imageUrl: "https://www.zynovashalbyhospital.com/wp-content/uploads/2024/07/Trauma-Care.png",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
  },
  {
    title: "AI-Driven Space Debris Detection and Trajectory Prediction",
    category: "Computer Vision",
    description:
      "Detecting orbital debris from imagery and predicting trajectories to support collision-avoidance decisions.",
    technologies: ["Python", "Deep Learning", "Computer Vision"],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLAcbI-JN8JEfVRNu2hzxnSE8KDhXyc0pBUVA_2Vv5ZLILj-DJ0h9ojhr&s=10",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
  },
  {
    title: "VeriChain – Blockchain-Based Product Authentication",
    category: "Blockchain & AI",
    description:
      "A blockchain-based product authentication and clone detection system that verifies product identity and metadata integrity, tracks supply-chain provenance, and uses risk-adaptive analysis to detect suspicious scans and potential counterfeit products.",
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Solidity",
      "Hardhat",
      "PostgreSQL",
    ],
    imageUrl: "https://cdn.sanity.io/images/caxo0d4b/production/323713cad69129fa7d7854086feea69688e6b293-2400x1350.webp?rect=0,45,2400,1260&bg=ffffff&w=1200&h=630&fit=fill",
    githubUrl: "https://github.com/Diksha2506/verichain-product-authentication",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
  },
  {
    title: "Digital Anganwadi Assistant",
    category: "Web Development",
    description:
      "A digital assistant for Anganwadi workers to manage beneficiary records, nutrition tracking and reporting.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://cghdde.berkeley.edu/sites/default/files/projects/2019-08/CAS.png",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: true,
  },
  {
    title: "Speech-to-Sign Converter",
    category: "AI/ML",
    description:
      "Converts spoken language into sign-language representations to improve accessibility for the hearing impaired.",
    technologies: ["Python", "NLP", "Speech Recognition"],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: false,
  },
  {
    title: "AgriConnect",
    category: "Web Development",
    description:
      "A platform connecting farmers with resources, market information and agricultural guidance.",
    technologies: ["React", "Express", "PostgreSQL"],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: false,
  },
  {
    title: "Lightweight OS-Level Containerization and Resource Isolation System",
    category: "Systems",
    description:
      "A minimal containerization layer exploring namespaces, cgroups and resource isolation at the OS level.",
    technologies: ["C", "Linux", "Systems Programming"],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: false,
  },
  {
    title: "ZeroDep Doctor",
    category: "AI/ML",
    description:
      "A zero-dependency diagnostic assistant that suggests possible conditions from symptoms using lightweight models.",
    technologies: ["Python", "Machine Learning", "Healthcare"],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: false,
  },
  {
    title: "Virtual Laboratory Simulator",
    category: "Web Development",
    description:
      "An interactive virtual lab for running science experiments in the browser when physical labs aren't accessible.",
    technologies: ["JavaScript", "React", "Simulation"],
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    featured: false,
  },
];

export const projectCategories = [
  "All",
  "AI/ML",
  "Blockchain & AI",
  "Web Development",
  "Computer Vision",
  "Systems",
] as const;

export const skillCategories: { title: string; skills: string[] }[] = [
  { title: "Programming", skills: ["Python", "C", "C++", "SQL"] },
  {
    title: "AI & Data Science",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express"],
  },
  { title: "Databases", skills: ["MySQL", "MongoDB", "PostgreSQL"] },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Power BI", "Tableau", "KNIME", "Docker"],
  },
];

export type Experience = {
  role: string;
  organization: string;
  duration: string;
  description: string;
  skills: string[];
  certificateUrl: string;
};

// Add internships, virtual internships, research or technical programs here.
export const experience: Experience[] = [
  {
    role: "NLP/LLM Intern",
    organization: "HCL Technologies",
    duration: "Sep 2025 – Present",
    description:
      "Contributed to the development of a Retrieval-Augmented Generation (RAG) pipeline to extract structured information from unstructured technical documents. Designed JSON schema-based extraction workflows using LangChain and Groq API, assisted in integrating LLaMA-based models, and contributed to backend API development using FastAPI.",
    skills: [
      "Python",
      "RAG",
      "LLMs",
      "LangChain",
      "Groq API",
      "LLaMA",
      "FastAPI",
      "JSON Schema"
    ],
    certificateUrl: "",
  },
  {
    role: "Full-Stack Developer Intern",
    organization: "Infosys Springboard",
    duration: "Feb 2026 – April 2026",
    description:
      "Developed responsive user interfaces and server-side application logic for scalable web applications. Implemented REST APIs, database integration, authentication, and CRUD operations, while focusing on application security and performance. Participated in Agile development, code reviews, debugging, testing, and Git-based version control.",
    skills: [
      "Full-Stack Development",
      "HTML",
      "CSS",
      "JavaScript",
      "REST APIs",
      "Database Integration",
      "Authentication",
      "CRUD",
      "Git"
    ],
    certificateUrl: "/intership/Internship (Infosys).pdf",
  }
];

export type Certification = {
  name: string;
  organization: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
};

// Add certificates and achievements here.
export const certifications: Certification[] = [
  {
    name: "Deep Learning",
    organization: "NVIDIA",
    date: "2026",
    imageUrl: "/certificates/NVIDIA (Deep_learning).png",
    credentialUrl: "/certificates/NVIDIA (Deep Learning).pdf",
  },
  {
    name: "Building Transformer-Based NLP Applications",
    organization: "NVIDIA",
    date: "2026",
    imageUrl: "/certificates/nvidia-transformer-nlp.png",
    credentialUrl: "/certificates/nvidia-transformer-nlp.pdf",
  },
  {
    name: "Building LLM Applications With Prompt Engineering",
    organization: "NVIDIA",
    date: "2026",
    imageUrl: "/certificates/nvidia-llm-prompt-engineering.png",
    credentialUrl: "/certificates/nvidia-llm-prompt-engineering.pdf",
  },
  {
    name: "Applications of AI for Anomaly Detection",
    organization: "NVIDIA",
    date: "2026",
    imageUrl: "/certificates/nvidia-anomaly-detection.png",
    credentialUrl: "/certificates/nvidia-anomaly-detection.pdf",
  },
  {
    name: "Artificial Intelligence Foundation Certification",
    organization: "Infosys",
    date: "2026",
    imageUrl: "/certificates/infosys-ai-foundation.png",
    credentialUrl: "/certificates/infosys-ai-foundation.pdf",
  },
  {
    name: "Introduction to Artificial Intelligence",
    organization: "Infosys",
    date: "2026",
    imageUrl: "/certificates/infosys-intro-ai.png",
    credentialUrl: "/certificates/infosys-intro-ai.pdf",
  },
  {
    name: "Introduction to Deep Learning",
    organization: "Infosys",
    date: "2026",
    imageUrl: "/certificates/infosys-intro-deep-learning.png",
    credentialUrl: "/certificates/infosys-intro-deep-learning.pdf",
  },
  {
    name: "Introduction to Natural Language Processing",
    organization: "Infosys",
    date: "2026",
    imageUrl: "/certificates/infosys-intro-nlp.png",
    credentialUrl: "/certificates/infosys-intro-nlp.pdf",
  },
  {
    name: "Basics of Python",
    organization: "Infosys",
    date: "2026",
    imageUrl: "/certificates/infosys-python.png",
    credentialUrl: "/certificates/infosys-python.pdf",
  },
  {
    name: "Data Analysis Using Excel",
    organization: "Infosys",
    date: "2026",
    imageUrl: "/certificates/infosys-excel-data-analysis.png",
    credentialUrl: "/certificates/infosys-excel-data-analysis.pdf",
  },
  {
    name: "Data Analytics & Python Workshop",
    organization: "Workshop",
    date: "2026",
    imageUrl: "/certificates/data-analytics-python-workshop.png",
    credentialUrl: "/certificates/data-analytics-python-workshop.pdf",
  },
  {
    name: "Speech-to-Sign Language Paper Publication",
    organization: "IJERT",
    date: "2026",
    imageUrl: "/certificates/ijert-speech-to-sign.png",
    credentialUrl: "/certificates/ijert-speech-to-sign.pdf",
  }
];

export const education = {
  institution: "Vishwakarma Institute of Technology, Pune",
  degree: "B.Tech in Artificial Intelligence & Data Science",
  status: "Third-year student",
  cgpa: "9.6", // optional — shown only when provided
  achievements: [] as string[], // optional
  coursework: [] as string[], // optional
};
