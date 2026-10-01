// ─── Central Content Data ─────────────────────────────────────
// Single source of truth. Edit here to update the entire site.

export const personalInfo = {
  name: "Jainam Chheda",
  title: "Business Design · Operations · Analytics",
  tagline: "Turning operational complexity into clear decisions.",
  positionStatement:
    "I combine process analysis, data, and structured problem-solving to improve workflows and support better business decisions.",
  location: "Mumbai, India",
  email: "jbchheda03@gmail.com",
  linkedin: "https://www.linkedin.com/in/jainam-chheda",
  github: "https://github.com/jainam03",
  resumeUrl: "/resume-latest.pdf",
  openToWork: false,
  seekingRole: "Former Procurement Analyst Intern @ Roquette",
};

export const about = {
  headline: "Business design student. Operations analyst. Structured problem-solver.",
  paragraphs: [
    "PGDM Business Design student at WeSchool, with a B.E. in Information Technology and a functional concentration in Operations.",
    "I map processes, analyze operational and market data, and turn findings into practical workflows, dashboards, and decision-support tools.",
  ],
  traits: [
    "Process Analysis",
    "Root Cause Analysis",
    "Data-led Decisions",
    "Stakeholder Collaboration",
  ],
};

export const education = [
  {
    degree: "PGDM – Business Design",
    institution: "WeSchool (Prin. L.N. Welingkar Institute)",
    period: "2025 – 2027",
    location: "Mumbai",
    grade: "7.98 / 10",
    highlights: [
      "Major: Design Thinking, Strategy & Consulting",
      "Functional Concentration: Operations",
      "Projects span QSR process analysis, gifting UX, and C&D carbon tracking",
    ],
  },
  {
    degree: "B.E. – Information Technology",
    institution: "Shah & Anchor Kutchhi Engineering College",
    period: "2020 – 2024",
    location: "Mumbai",
    grade: "76.20%",
    highlights: [
      "Published 2 research papers in peer-reviewed journals",
      "Runners-up at Global Deepfake Discovery Hackathon (Cyber Peace Foundation)",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "SIES College, Mumbai",
    period: "2020",
    location: "Mumbai",
    grade: "75.85%",
    highlights: [],
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Shree Sanatan Dharam Vidyalaya, Mumbai",
    period: "2018",
    location: "Mumbai",
    grade: "92.20%",
    highlights: [],
  },
];

export type ProjectArtifact = {
  type: "presentation" | "prototype";
  label: string;
  mode: "storage-pdf" | "pdf" | "external" | "iframe";
  url?: string;
  storageKey?: string;
  available: boolean;
};

export type Project = {
  id: string;
  title: string;
  domain: string;
  period: string;
  summary: string;
  tags: string[];
  impact: string;
  problem: string;
  approach: string;
  tools: string[];
  insights: string[];
  outcome: string;
  artifacts?: ProjectArtifact[];
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Process Analysis — QSR & Retail",
    domain: "Operations",
    period: "Jul '25 – Dec '25",
    summary:
      "Used Gemba observation and time-motion analysis to map QSR operations and quantify process waste and customer lead time.",
    tags: ["Lean", "Time-Motion Study", "Process Mapping", "QSR"],
    impact: "72.88% non-value-added activity · 31-minute lead time · 8.59% process cycle efficiency",
    problem:
      "The observed QSR process had a 31-minute lead time and substantial non-value-added activity, pointing to bottlenecks and process gaps.",
    approach:
      "Conducted a Gemba walk and time-motion study to map the as-is process, quantify non-value-added activity, and design a more efficient to-be workflow.",
    tools: ["Time-Motion Study", "Lean / VSM", "MS Excel", "Process Mapping"],
    insights: [
      "72.88% of observed activity was non-value-added.",
      "Process cycle efficiency was 8.59%, highlighting a large improvement opportunity.",
    ],
    outcome:
      "Designed to-be workflows addressing the measured process gaps and inefficiencies.",
    artifacts: [
      {
        type: "presentation",
        label: "View Presentation",
        mode: "storage-pdf",
        storageKey: "qsr",
        available: true,
      },
    ],
  },
  {
    id: "p2",
    title: "Customised Gifting Platform — UX Digitisation",
    domain: "Product & UX",
    period: "Nov '25 – Jan '26",
    summary:
      "Mapped a gifting platform's order lifecycle and designed an AI-enabled coordination prototype.",
    tags: [
      "UX Research",
      "Workflow Design",
      "AI Prototype",
      "Stakeholder Mapping",
    ],
    impact: "Coordination prototype reducing gaps across 3+ stakeholder layers",
    problem:
      "The platform had fragmented coordination across customers, vendors, and manufacturers — causing fulfilment delays, poor order visibility, and repeated alignment failures at handoff points.",
    approach:
      "Conducted multi-stakeholder primary research (customers, vendors, manufacturers) to map the full order lifecycle. Identified visibility gaps and coordination bottlenecks at each handoff. Designed an AI-enabled workflow prototype for real-time order tracking, exception handling, and cross-stakeholder communication.",
    tools: [
      "Stakeholder Interviews",
      "Workflow Mapping",
      "Figma",
      "Notion",
      "AI Prototype Design",
    ],
    insights: [
      "Fulfilment failures clustered at handoff points — not in execution itself, but in transition ownership.",
      "Standard tracking tools lacked exception-awareness; alerts were reactive, not predictive.",
    ],
    outcome:
      "Delivered an AI-enabled workflow prototype for clearer order visibility, exception handling, and handoff ownership.",
    artifacts: [
      {
        type: "presentation",
        label: "View Presentation",
        mode: "storage-pdf",
        storageKey: "gifting",
        available: true,
      },
      {
        type: "prototype",
        label: "View Prototype",
        mode: "external",
        url: "https://wrapcraft.lovable.app",
        available: true,
      },
    ],
  },
  {
    id: "p3",
    title: "C&D Waste Lifecycle Analysis — GCL Project",
    domain: "Sustainability & Analytics",
    period: "Nov '25 – Apr '26",
    summary:
      "Mapped the construction and demolition waste lifecycle and identified traceability gaps and opportunities to improve process visibility.",
    tags: [
      "Lifecycle Analysis",
      "Workflow Analysis",
      "Sustainability",
      "Prototype",
    ],
    impact: "End-to-end lifecycle map · stakeholder and material flow analysis",
    problem:
      "The C&D waste lifecycle had process gaps, operational risks, and limited traceability across collection, transportation, processing, and disposal.",
    approach:
      "Mapped end-to-end material and stakeholder flows to identify inefficiencies and traceability gaps, then assessed technology-enabled interventions for improved visibility and control.",
    tools: [
      "Workflow Analysis",
      "Stakeholder Mapping",
      "Material Flow Analysis",
      "Prototype Design",
    ],
    insights: [
      "Process and traceability gaps appeared across multiple stages of the waste lifecycle.",
      "Stakeholder and material-flow mapping helped surface opportunities to improve visibility and resource use.",
    ],
    outcome:
      "Delivered a lifecycle analysis with proposed interventions to improve process visibility, resource utilization, and operational control.",
    artifacts: [
      {
        type: "presentation",
        label: "View Presentation",
        mode: "storage-pdf",
        storageKey: "traceCarbon",
        available: true,
      },
      {
        type: "prototype",
        label: "View Prototype",
        mode: "external",
        url: "https://tracecarbon-sustainability.vercel.app/",
        available: true,
      },
    ],
  },
  {
    id: "p4",
    title: "FakeBreaker — Audio Deepfake Detection",
    domain: "AI / ML Research",
    period: "Aug '23 – May '24",
    summary:
      "Processed 3,695 labelled audio samples and evaluated deepfake detection models using accuracy and error metrics.",
    tags: ["Python", "RNN", "ML", "Audio Processing", "Research"],
    impact: "3,695 labelled audio samples · Research publication · Hackathon runners-up",
    problem:
      "With the proliferation of AI-generated audio, distinguishing real from deepfake voice content is a high-stakes security challenge — yet accessible, accurate detection tools remain scarce.",
    approach:
      "Processed and prepared a labelled audio dataset of 3,695 samples, then evaluated detection models using accuracy and error metrics.",
    tools: [
      "Python",
      "RNN / Deep Learning",
      "Audio Preprocessing",
      "Data Annotation",
    ],
    insights: [
      "The project focused on measurable model evaluation across labelled real and deepfake audio samples.",
      "The work contributed to a published review paper on deepfake voice detection.",
    ],
    outcome:
      "Functional deepfake detection model. Research published in GIS Science Journal (Feb '24). Team placed Runners-up at the Global Deepfake Discovery Hackathon organised by Cyber Peace Foundation (Mar '24).",
    artifacts: [
      {
        type: "prototype",
        label: "View Prototype",
        mode: "external",
        url: "https://fakebreaker.vercel.app/",
        available: true,
      },
    ],
  },
  {
    id: "p5",
    title: "Evenix — Blockchain Ticketing System",
    domain: "Tech & Blockchain",
    period: "Aug '23 – May '24",
    summary:
      "Designed a Solidity-based blockchain ticketing platform with smart contracts to prevent duplication and enable tamper-proof traceability.",
    tags: ["Solidity", "Blockchain", "Smart Contracts", "Systems Design"],
    impact: "Smart contract logic eliminating ticket duplication risk",
    problem:
      "Ticket fraud, duplication, and resale manipulation are systemic issues in event-based transaction systems — undermining revenue integrity and user trust.",
    approach:
      "Developed a Solidity-based simulation of a blockchain ticketing platform. Designed smart contract logic to enforce ticket uniqueness, prevent duplication, and enable full transaction traceability from issuance to redemption.",
    tools: [
      "Solidity",
      "Blockchain",
      "Smart Contract Design",
      "Systems Documentation",
    ],
    insights: [
      "Blockchain's immutability is structurally well-suited to high-fraud-risk transactional systems.",
      "Feasibility for real-world deployment hinges on gas cost optimisation vs. fraud prevention ROI.",
    ],
    outcome:
      "Functional simulation with documented smart contract architecture. Feasibility assessment validated the approach for deployment in high-volume transactional ticketing environments.",
    artifacts: [
      {
        type: "prototype",
        label: "View Prototype",
        mode: "external",
        url: "https://myevenix.vercel.app/",
        available: true,
      },
    ],
  },
];

export type Experience = {
  role: string;
  organization: string;
  period: string;
  impact: string[];
  tools: string[];
};

export const experience: Experience[] = [
  {
    role: "Procurement Analyst Intern",
    organization: "Roquette",
    period: "May 2026 – Jul 2026",
    impact: [
      "Analyzed supply-demand dynamics, cyclicality, and macroeconomic factors to develop pricing insights and support data-driven sourcing decisions.",
      "Built an integrated Power BI model combining pricing, production, inventory, and demand data for trend analysis and scenario review.",
      "Designed standardized update protocols and QA checks to maintain data quality and model consistency across monthly cycles.",
    ],
    tools: [
      "Power BI",
      "Market Analysis",
      "Data Quality",
      "Sourcing Decisions",
    ],
  },
];

export type Skill = {
  category: string;
  items: string[];
  icon: string;
};

export const skills: Skill[] = [
  {
    category: "Operations & Process",
    icon: "⚙️",
    items: [
      "Process Analysis",
      "Workflow Design",
      "Process Mapping",
      "Process Improvement",
      "Root Cause Analysis",
      "Gemba Study",
    ],
  },
  {
    category: "Data & Analytics",
    icon: "📊",
    items: [
      "Data Analysis",
      "Data Visualization",
      "Dashboard Development",
      "Power BI",
      "Business Intelligence",
      "AI / GenAI Tools",
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "💻",
    items: [
      "Excel",
      "PowerPoint",
      "Word",
      "VS Code",
      "GitHub",
      "Replit",
      "Lovable",
      "Bolt",
      "Google Stitch",
    ],
  },
  {
    category: "Professional Skills",
    icon: "🎯",
    items: [
      "Structured Problem Solving",
      "Stakeholder Management",
      "Cross-functional Collaboration",
      "Communication",
      "Adaptability",
    ],
  },
];

export const certifications = [
  {
    title: "Leading with Generative AI",
    issuer: "Harvard Business Impact Enterprise",
    year: "2026",
    credentialUrl: "#",
  },
  {
    title: "AI Fluency Framework & Foundation",
    issuer: "Anthropic",
    year: "2026",
    credentialUrl: "#",
  },
  {
    title: "Process Improvement",
    issuer: "Harvard Business Impact Enterprise",
    year: "2026 · Pursuing",
    credentialUrl: "#",
  },
];

export const aiTools = [
  "ChatGPT / Codex",
  "Claude",
  "GitHub Copilot",
  "Gemini",
  "Google Antigravity",
];

export const languages = ["English", "Hindi", "Gujarati", "Marathi"];
export const interests = ["Cricket", "Chess", "Music"];

export const leadership = [
  {
    role: "Member, Management Council",
    organization: "WeSchool",
    period: "Apr '26 – Present",
    impact:
      "Co-led planning and execution of a flagship industry-academia event, coordinating students, faculty, alumni, industry leaders, and volunteer teams.",
  },
  {
    role: "Management Co-head",
    organization: "Google Developer Student's Club",
    period: "Feb '23 – Sept '23",
    impact:
      "Planned and executed multi-stakeholder technical workshops — managed timelines, resources, and volunteer coordination across a student-run developer community.",
  },
  {
    role: "Technical Secretary",
    organization: "IT Department Student Council",
    period: "Feb '23 – Sept '23",
    impact:
      "Led execution of 6 large-scale events with 208 participants — coordinated cross-functional teams, managed logistics, and ensured smooth on-ground operations.",
  },
];

export const achievements = [
  "Runners-up — Global Deepfake Discovery Hackathon, Cyber Peace Foundation (Mar '24)",
  "Top 50 — SIH 2025 Internal Hackathon at WeSchool; advanced to National Round (Dec '25)",
  "Published: 'A Review Paper on Deepfake Voice Detection' — GIS Science Journal (Feb '24)",
  "Published: 'GenAI: A Survey of Security and Privacy Threats' — NFSU Journal of Cyber Security & Digital Forensics (Jun '24)",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];
