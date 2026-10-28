/**
 * Portfolio Data for Harshavardhan N
 * Strictly preserving all verified resume details with zero fabrication.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  architectureDetails: string[];
  githubUrl?: string;
  liveUrl?: string;
  hasInteractiveDemo: boolean;
  type: 'resume-analyzer' | 'apartment-system';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship';
  highlights: string[];
  badge?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  specialization?: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  type: 'cloud' | 'ai' | 'datascience' | 'automation';
  badgeLabel: string;
  topics: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    description: string;
    icon: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Harshavardhan N",
  roles: [
    "MCA Student",
    "Full-Stack Developer",
    "AI & Data Science Enthusiast"
  ],
  tagline: "MCA Student | Full-Stack Developer | AI & Data Science Enthusiast",
  summary: "Postgraduate MCA student specializing in AI and Data Science at Sapthagiri NPS University with a BCA foundation. Passionate about architecting scalable full-stack web applications, algorithmic problem-solving, intuitive data visualization, API integration, and AI-driven innovations.",
  aboutDetailed: [
    "I am currently pursuing my Master of Computer Applications (MCA) with a specialization in Core AI & Data Science at Sapthagiri NPS University, Bangalore. My academic journey is built upon a strong BCA foundation in Computer Science from National Degree College.",
    "My core engineering interest lies at the intersection of modern full-stack development and artificial intelligence. I enjoy constructing resilient backend architectures with Java, Spring Boot, and Python Flask, paired with reactive, dynamic frontends in React and JavaScript.",
    "With industry exposure in enterprise processes, digital communication, and customer support, I bring a collaborative mindset, analytical rigor, and dedication to writing clean, maintainable code that solves real-world challenges."
  ],
  location: "Bangalore, Karnataka, India",
  timezone: "IST (UTC +5:30)",
  email: "harshavardhan.raj18@gmail.com",
  phone: "+91 9035456298",
  github: "https://github.com/Harsha-Surya08",
  linkedin: "https://www.linkedin.com/in/harsha-vardhan18-n",
  stats: [
    { label: "Degree Focus", value: "MCA (AI & Data Science)" },
    { label: "Core Stacks", value: "Java / Python / React" },
    { label: "Cloud & DB", value: "AWS, MySQL, MongoDB" },
    { label: "Certifications", value: "7 Professional Certs" }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    description: "Foundational programming languages and query languages",
    skills: [
      { name: "Python", description: "Scripting, Data Science, Flask backends & automation", icon: "Code2" },
      { name: "Java", description: "Core Java, OOP, Spring Boot services & enterprise design", icon: "Coffee" },
      { name: "JavaScript", description: "ES6+, DOM manipulation, asynchronous programming & full-stack integration", icon: "FileCode" },
      { name: "SQL", description: "Complex queries, joins, relational schema design & indexing", icon: "Database" },
      { name: "HTML5", description: "Semantic markup, modern web standards & accessibility", icon: "Globe" },
      { name: "CSS", description: "Responsive layouts, Flexbox, Grid, transitions & animations", icon: "Palette" }
    ]
  },
  {
    category: "Frameworks & Libraries",
    description: "Backend frameworks and client-side UI ecosystems",
    skills: [
      { name: "Spring Boot", description: "REST APIs, Spring Data JPA, Hibernate ORM & enterprise microservices", icon: "Layers" },
      { name: "Flask", description: "Lightweight Python REST endpoints, web services & routing", icon: "Server" },
      { name: "React.js", description: "Component-driven interfaces, hooks, state management & SPAs", icon: "Atom" },
      { name: "Bootstrap", description: "Rapid responsive UI scaffolding and grid design", icon: "Layout" }
    ]
  },
  {
    category: "Cloud & Databases",
    description: "Cloud computing infrastructure and persistence engines",
    skills: [
      { name: "AWS EC2 / S3 / RDS", description: "Compute instances, scalable cloud storage & managed relational databases", icon: "Cloud" },
      { name: "MySQL", description: "Relational database modeling, transactions, constraints & optimization", icon: "HardDrive" },
      { name: "MongoDB", description: "NoSQL document storage, flexible BSON schemas & aggregation", icon: "DatabaseZap" }
    ]
  },
  {
    category: "Data & Analytics",
    description: "Visual intelligence, reporting, and metrics communication",
    skills: [
      { name: "Power BI", description: "Interactive dashboards, business intelligence reports & KPIs", icon: "BarChart3" },
      { name: "Data Visualization", description: "Exploratory data analysis, chart design & visual storytelling", icon: "PieChart" }
    ]
  },
  {
    category: "Engineering & Concepts",
    description: "Core computer science fundamentals and development workflows",
    skills: [
      { name: "OOP", description: "Encapsulation, inheritance, polymorphism & design patterns", icon: "Cpu" },
      { name: "DSA", description: "Data structures, algorithm complexity & problem solving", icon: "Binary" },
      { name: "API Integration", description: "RESTful architecture, JSON payloads, HTTP clients & error handling", icon: "Network" },
      { name: "GitHub", description: "Version control, branching workflows, pull requests & CI/CD", icon: "GitBranch" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "resume-analyzer",
    title: "Resume Analyzer",
    category: "Enterprise Full-Stack Application",
    tagline: "Intelligent ATS evaluation, skill gap identification, and scoring platform",
    description: "A full-stack software system that uploads resumes alongside target job descriptions, computes algorithmic Applicant Tracking System (ATS) match scores, analyzes keyword frequencies, detects missing competencies, and recommends actionable content improvements with automated dual-database persistence.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "H2",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Maven",
      "PowerShell",
      "Git"
    ],
    keyFeatures: [
      "ATS Match Score Engine: Evaluates resume content against target job descriptions with algorithmic keyword frequency analysis.",
      "Skill Gap & Missing Competency Detection: Identifies prerequisite technical skills absent in the resume and highlights exact keyword deficits.",
      "Dual-Database Profile Architecture: Seamless persistence with MySQL for persistent storage and an in-memory H2 database for local automated profiling and testing.",
      "Content Improvement Recommendations: Suggests concrete bullet point and vocabulary refinements to increase interview shortlisting probability.",
      "Automated Maven & PowerShell Build: Standardized build pipelines with automated dependency resolution and test execution."
    ],
    architectureDetails: [
      "Presentation Layer: Responsive web frontend built with semantic HTML5, CSS3, and JavaScript communicating via asynchronous JSON REST calls.",
      "Service & Business Layer: Spring Boot controllers orchestrating text tokenization, keyword density algorithms, and ATS comparison logic.",
      "Persistence Layer: Spring Data JPA with Hibernate abstraction facilitating transparent dual-mode mapping between MySQL and embedded H2.",
      "Build & Environment: Maven lifecycle management with PowerShell automation scripts for rapid profile toggling."
    ],
    hasInteractiveDemo: true,
    type: 'resume-analyzer'
  },
  {
    id: "digital-apartment-notification-system",
    title: "Digital Apartment Notification System",
    category: "Python Web Application & UI Experience",
    tagline: "Dynamic, cartoon-themed resident communication and alert interface",
    description: "A responsive, cartoon-themed apartment notification interface built with dynamic multi-page routing, smooth navigation, and interactive frontend components powered by a Python Flask web server.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Flask"
    ],
    keyFeatures: [
      "Engaging Cartoon-Themed Aesthetic: Custom playful visual language that turns mundane facility notices into accessible, inviting resident interactions.",
      "Multi-Page Dynamic Architecture: Coordinated pages for community announcements, urgent facility alerts, visitor logs, and maintenance rosters.",
      "Python Flask Backend: Lightweight RESTful endpoints serving real-time notice feeds, category sorting, and administrative broadcasts.",
      "Interactive Frontend Components: Instant search, category filters, animated alert popups, and smooth transitions.",
      "Mobile-First Responsive Layout: High readability across smartphones, tablets, and desktop displays."
    ],
    architectureDetails: [
      "Server Runtime: Lightweight Python Flask WSGI app routing announcements with modular template rendering.",
      "Frontend Engine: Vanilla JavaScript managing dynamic DOM updates, search filtering, and stateful notice interactions without heavy bundle overhead.",
      "Visual System: Custom CSS animations, cartoon badge styling, and playful typography tailored for community friendliness."
    ],
    hasInteractiveDemo: true,
    type: 'apartment-system'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "resource-pro",
    role: "Resource Pro Associate",
    company: "Resource Pro",
    location: "Bangalore, India",
    period: "Oct 2024 – Apr 2025",
    type: "Full-time",
    highlights: [
      "Processed and audited complex commercial insurance certificates and policy endorsements with precision.",
      "Analyzed nuanced client requirements to guarantee compliance with underwriting standards and contractual obligations.",
      "Managed end-to-end certificate lifecycle management workflows, consistently beating turnaround SLA targets.",
      "Executed critical non-certificate operational requests, cross-referencing account data and mitigating operational discrepancies."
    ]
  },
  {
    id: "mgm-designs",
    role: "Digital Marketing Intern",
    company: "MGM Designs Pvt Ltd",
    location: "Bangalore, India",
    period: "May 2024 – Jul 2024",
    type: "Internship",
    highlights: [
      "Formulated and implemented targeted digital marketing strategies to expand brand visibility across digital touchpoints.",
      "Collaborated closely with cross-functional design teams to develop compelling visual assets and campaign creatives.",
      "Facilitated professional B2B and B2C communications, nurturing lead pipelines and client inquiries.",
      "Conducted structured market research to evaluate user engagement, competitor positioning, and conversion trends."
    ]
  },
  {
    id: "manfred-info-tech",
    role: "Customer Support Executive",
    company: "Manfred Info Tech Pvt Ltd",
    location: "Bangalore, India",
    period: "Sep 2022 – Mar 2023",
    type: "Full-time",
    badge: "Employee of the Month",
    highlights: [
      "Handled high-volume US health-insurance benefit inquiry calls with empathy, clarity, and strict HIPAA compliance.",
      "Orchestrated insurance verification coordination between healthcare providers, insurance carriers, and policyholders.",
      "Awarded 'Employee of the Month' for exceptional customer satisfaction ratings, high call resolution rates, and operational reliability."
    ]
  }
];

export const EDUCATIONS: EducationItem[] = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Sapthagiri NPS University",
    location: "Bangalore, Karnataka",
    period: "2025 – 2027",
    specialization: "Core AI & Data Science",
    description: "Rigorous postgraduate curriculum centered on advanced artificial intelligence, deep learning architectures, statistical data modeling, big data paradigms, and enterprise software engineering."
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "National Degree College",
    location: "Bangalore, Karnataka",
    period: "2019 – 2022",
    grade: "CGPA: 7.0",
    specialization: "Computer Science",
    description: "In-depth undergraduate program covering core computer science principles: Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, Operating Systems, and Software Engineering."
  },
  {
    id: "puc",
    degree: "Pre-University Course (PUC)",
    institution: "Sri Krishna PU College",
    location: "Bangalore, Karnataka",
    period: "2016 – 2018",
    grade: "60%",
    specialization: "Science",
    description: "Secondary education with a rigorous foundation in Mathematics, Physics, Chemistry, and scientific analytical problem-solving."
  },
  {
    id: "sslc",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Mithra High School",
    location: "Bangalore, Karnataka",
    period: "Completed 2016",
    grade: "64.96%",
    description: "Secondary school education establishing foundational academic disciplines, mathematics, and science."
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "aws-restart",
    title: "AWS re/Start Graduate Certificate",
    issuer: "Amazon Web Services (AWS)",
    type: "cloud",
    badgeLabel: "Cloud Architecture",
    topics: [
      "Cloud Fundamentals & Economics",
      "AWS Compute (EC2, Lambda)",
      "Storage (S3, EBS) & Networking (VPC)",
      "Relational Databases (RDS) & IAM Security",
      "Linux System Administration & Scripting"
    ]
  },
  {
    id: "infosys-ai-primer",
    title: "AI Primer Certification",
    issuer: "Infosys Springboard",
    type: "ai",
    badgeLabel: "Artificial Intelligence",
    topics: [
      "Foundations of Artificial Intelligence",
      "Supervised & Unsupervised Learning",
      "Intelligent Agents & Heuristics",
      "AI Ethics and Real-World Applications"
    ]
  },
  {
    id: "infosys-deep-learning",
    title: "Deep Learning Certification",
    issuer: "Infosys Springboard",
    type: "ai",
    badgeLabel: "Deep Learning",
    topics: [
      "Multi-Layer Perceptrons & Backpropagation",
      "Convolutional Neural Networks (CNNs)",
      "Recurrent Neural Networks (RNNs) & LSTMs",
      "Loss Functions, Optimizers & Overfitting Mitigation"
    ]
  },
  {
    id: "infosys-nlp",
    title: "Natural Language Processing (NLP)",
    issuer: "Infosys Springboard",
    type: "ai",
    badgeLabel: "NLP",
    topics: [
      "Text Preprocessing, Tokenization & Stemming",
      "TF-IDF, Bag-of-Words & Word Embeddings",
      "Sentiment Analysis & Topic Modeling",
      "Language Modeling & Information Extraction"
    ]
  },
  {
    id: "infosys-computer-vision",
    title: "Computer Vision Certification",
    issuer: "Infosys Springboard",
    type: "ai",
    badgeLabel: "Vision AI",
    topics: [
      "Digital Image Processing Fundamentals",
      "Edge Detection & Feature Extraction",
      "Object Detection & Image Segmentation",
      "Vision Models in Industry Solutions"
    ]
  },
  {
    id: "infosys-data-science",
    title: "Data Science Certification",
    issuer: "Infosys Springboard",
    type: "datascience",
    badgeLabel: "Data Science",
    topics: [
      "Exploratory Data Analysis (EDA)",
      "Statistical Inference & Hypothesis Testing",
      "Feature Engineering & Model Validation",
      "Data Visualization & Insight Generation"
    ]
  },
  {
    id: "infosys-rpa",
    title: "Robotic Process Automation (RPA)",
    issuer: "Infosys Springboard",
    type: "automation",
    badgeLabel: "Automation",
    topics: [
      "Process Identification & Workflow Automation",
      "Bot Lifecycle & Exception Handling",
      "Data Scraping & Form Processing",
      "Enterprise Automation Integration"
    ]
  }
];
