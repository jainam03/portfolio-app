// ─── Central Content Data ─────────────────────────────────────
// Single source of truth. Edit here to update the entire site.

export const personalInfo = {
  name: 'Jainam Chheda',
  title: 'Operations · Analytics · Strategy',
  tagline: 'Engineering precision meets business design.',
  positionStatement:
    'I turn messy operational problems into clear workflows, decision tools, and practical prototypes.',
  location: 'Mumbai, India',
  email: 'jbchheda03@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jainam-chheda',
  github: 'https://github.com/jainam03',
  resumeUrl: '/resume-latest.pdf',
  openToWork: false,
  seekingRole: 'Placed @ Roquette · Summer 2026',
};

export const about = {
  headline: 'Systems thinker. Process analyst. Structured executor.',
  paragraphs: [
    'PGDM – Business Design student at WeSchool with a B.E. in Information Technology.',
    'I map systems, find the highest-leverage gap, and communicate the solution through crisp analysis, dashboards, and prototypes.',
  ],
  traits: ['Systems Thinker', 'Process Analyst', 'Lean Practitioner', 'Design Thinker'],
};

export const education = [
  {
    degree: 'PGDM – Business Design',
    institution: 'WeSchool (Prin. L.N. Welingkar Institute)',
    period: '2025 – 2027',
    location: 'Mumbai',
    grade: '8.22 / 10',
    highlights: [
      'Major: Design Thinking, Strategy & Consulting',
      'Functional Concentration: Operations',
      'Projects span QSR process analysis, gifting UX, and C&D carbon tracking',
    ],
  },
  {
    degree: 'B.E. – Information Technology',
    institution: 'Shah & Anchor Kutchhi Engineering College',
    period: '2020 – 2024',
    location: 'Mumbai',
    grade: '76.20%',
    highlights: [
      'Published 2 research papers in peer-reviewed journals',
      'Runners-up at Global Deepfake Discovery Hackathon (Cyber Peace Foundation)',
    ],
  },
];

export type ProjectArtifact = {
  type: 'presentation' | 'prototype';
  label: string;
  mode: 'pdf' | 'external' | 'iframe';
  url: string;
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
    id: 'p1',
    title: 'Service Operations & Process Analysis',
    domain: 'Operations',
    period: "Jul '25 – Dec '25",
    summary: "Mapped McDonald's QSR operations to expose process waste, customer lead time, and bottlenecks.",
    tags: ['Lean', 'Time-Motion Study', 'Process Mapping', 'QSR'],
    impact: '72.88% NVA time · 31 min lead time · 8.59% PCE',
    problem:
      "McDonald's service flow carried a 31-minute customer lead time, with waste concentrated in waiting, handoffs, and reactive table allocation.",
    approach:
      'Used a Gemba walk, time-motion study, value-stream analysis, and process redesign to locate bottlenecks and propose technology-enabled interventions.',
    tools: ['Time-Motion Study', 'Lean / VSM', 'MS Excel', 'Process Mapping'],
    insights: [
      '72.88% of observed activity was non-value-added.',
      'Process cycle efficiency was 8.59%, highlighting a large improvement opportunity.',
    ],
    outcome:
      'Proposed pre-allocation protocols, live seat visibility, and integrated pre-ordering to reduce avoidable movement and waiting.',
    artifacts: [
      { type: 'presentation', label: 'View Presentation', mode: 'pdf', url: '/projects/qsr-process-analysis/presentation.pdf', available: true },
    ],
  },
  {
    id: 'p2',
    title: 'Customised Gifting Platform — UX Digitisation',
    domain: 'Product & UX',
    period: "Nov '25 – Jan '26",
    summary: 'Mapped a gifting platform\'s order lifecycle and designed an AI-enabled coordination prototype.',
    tags: ['UX Research', 'Workflow Design', 'AI Prototype', 'Stakeholder Mapping'],
    impact: 'Coordination prototype reducing gaps across 3+ stakeholder layers',
    problem:
      'The platform had fragmented coordination across customers, vendors, and manufacturers — causing fulfilment delays, poor order visibility, and repeated alignment failures at handoff points.',
    approach:
      'Conducted multi-stakeholder primary research (customers, vendors, manufacturers) to map the full order lifecycle. Identified visibility gaps and coordination bottlenecks at each handoff. Designed an AI-enabled workflow prototype for real-time order tracking, exception handling, and cross-stakeholder communication.',
    tools: ['Stakeholder Interviews', 'Workflow Mapping', 'Figma', 'Notion', 'AI Prototype Design'],
    insights: [
      'Fulfilment failures clustered at handoff points — not in execution itself, but in transition ownership.',
      'Standard tracking tools lacked exception-awareness; alerts were reactive, not predictive.',
    ],
    outcome:
      'Delivered an AI-enabled workflow prototype for clearer order visibility, exception handling, and handoff ownership.',
    artifacts: [
      { type: 'presentation', label: 'View Presentation', mode: 'pdf', url: '/projects/gifting-platform/presentation.pdf', available: true },
      { type: 'prototype', label: 'View Prototype', mode: 'external', url: 'https://wrapcraft.lovable.app', available: true },
    ],
  },
  {
    id: 'p3',
    title: 'C&D Waste Lifecycle Analysis — Trace Carbon',
    domain: 'Sustainability & Analytics',
    period: "Nov '25 – Apr '26",
    summary: 'Mapped C&D waste workflows and developed a technology-enabled platform for carbon and circularity decisions.',
    tags: ['Carbon Tracking', 'Workflow Analysis', 'Sustainability', 'Prototype'],
    impact: 'Research-led platform for carbon visibility and circularity',
    problem:
      'C&D waste systems lacked structured carbon tracking and compliance monitoring — creating fragmented, non-transparent waste management with no clear basis for circularity decisions.',
    approach:
      'Combined primary and secondary research, stakeholder pain-point mapping, value-proposition design, and feasibility assessment into a technology-enabled platform concept.',
    tools: ['Workflow Analysis', 'Sustainability Frameworks', 'Carbon Calculation Logic', 'Prototype Design'],
    insights: [
      'Stakeholder pain points clustered around fragmented workflows and limited sustainability visibility.',
      'Adoption readiness and circularity value were treated as design requirements, not afterthoughts.',
    ],
    outcome:
      'Developed a technology-enabled platform concept and evaluated its business feasibility, circularity potential, and adoption readiness.',
    artifacts: [
      { type: 'presentation', label: 'View Presentation', mode: 'pdf', url: '/projects/trace-carbon/presentation.pdf', available: true },
      { type: 'prototype', label: 'View Prototype', mode: 'external', url: 'https://tracecarbon-sustainability.vercel.app/', available: true },
    ],
  },
  {
    id: 'p4',
    title: 'FakeBreaker — Audio Deepfake Detection',
    domain: 'AI / ML Research',
    period: "Aug '23 – May '24",
    summary: 'Built an RNN-based model to classify real vs AI-generated audio — trained on 3,695 samples and published in GIS Science Journal.',
    tags: ['Python', 'RNN', 'ML', 'Audio Processing', 'Research'],
    impact: 'Published research + Runners-up at Global Deepfake Hackathon',
    problem:
      'With the proliferation of AI-generated audio, distinguishing real from deepfake voice content is a high-stakes security challenge — yet accessible, accurate detection tools remain scarce.',
    approach:
      'Built an RNN-based binary classification model in Python. Curated and preprocessed 3,695 audio samples (real vs. deepfake). Evaluated model performance and documented findings in a structured research format for publication.',
    tools: ['Python', 'RNN / Deep Learning', 'Audio Preprocessing', 'Data Annotation'],
    insights: [
      'RNN architectures capture temporal audio patterns more effectively than frame-level classifiers.',
      'Dataset curation quality had a larger impact on model accuracy than architecture tuning.',
    ],
    outcome:
      'Functional deepfake detection model. Research published in GIS Science Journal (Feb \'24). Team placed Runners-up at the Global Deepfake Discovery Hackathon organised by Cyber Peace Foundation (Mar \'24).',
    artifacts: [
      { type: 'prototype', label: 'View Prototype', mode: 'external', url: 'https://fakebreaker.vercel.app/', available: true },
    ],
  },
  {
    id: 'p5',
    title: 'Evenix — Blockchain Ticketing System',
    domain: 'Tech & Blockchain',
    period: "Aug '23 – May '24",
    summary: 'Designed a Solidity-based blockchain ticketing platform with smart contracts to prevent duplication and enable tamper-proof traceability.',
    tags: ['Solidity', 'Blockchain', 'Smart Contracts', 'Systems Design'],
    impact: 'Smart contract logic eliminating ticket duplication risk',
    problem:
      'Ticket fraud, duplication, and resale manipulation are systemic issues in event-based transaction systems — undermining revenue integrity and user trust.',
    approach:
      'Developed a Solidity-based simulation of a blockchain ticketing platform. Designed smart contract logic to enforce ticket uniqueness, prevent duplication, and enable full transaction traceability from issuance to redemption.',
    tools: ['Solidity', 'Blockchain', 'Smart Contract Design', 'Systems Documentation'],
    insights: [
      "Blockchain's immutability is structurally well-suited to high-fraud-risk transactional systems.",
      'Feasibility for real-world deployment hinges on gas cost optimisation vs. fraud prevention ROI.',
    ],
    outcome:
      'Functional simulation with documented smart contract architecture. Feasibility assessment validated the approach for deployment in high-volume transactional ticketing environments.',
    artifacts: [
      { type: 'prototype', label: 'View Prototype', mode: 'external', url: 'https://myevenix.vercel.app/', available: true },
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
    role: 'Procurement Analyst Intern',
    organization: 'Roquette',
    period: 'May 2026 – Jul 2026',
    impact: [
      'Analysed maize price movements across NCDEX and mandi markets using supply, demand, crop, weather, trade, and end-use data.',
      'Built a Power BI decision-support model and documented monthly refresh checks without changing model relationships or calculated tables.',
    ],
    tools: ['Power BI', 'Market Analysis', 'Data Validation', 'Business Reporting'],
  },
];

export type Skill = {
  category: string;
  items: string[];
  icon: string;
};

export const skills: Skill[] = [
  {
    category: 'Operations & Process',
    icon: '⚙️',
    items: [
      'Process Analysis & Optimisation',
      'Workflow Design',
      'Time-Motion Study',
      'Lean Methodology',
      'Customer Journey Mapping',
      'Stakeholder Coordination',
    ],
  },
  {
    category: 'Data & Analytics',
    icon: '📊',
    items: [
      'Data Analysis & Visualisation',
      'Tableau',
      'Power BI',
      'MS Excel (Advanced)',
      'SQL (Basic)',
    ],
  },
  {
    category: 'Tech & Engineering',
    icon: '💻',
    items: [
      'Python (Basic)',
      'Solidity (Basic)',
      'RNN / ML (Basic)',
      'Figma',
      'Notion',
      'Canva',
    ],
  },
  {
    category: 'Business Design',
    icon: '🎯',
    items: [
      'Design Thinking',
      'Strategy & Consulting',
      'Structured Problem-Solving',
      'UX Research',
      'Stakeholder Mapping',
      'MS PowerPoint',
    ],
  },
];

export const certifications = [
  {
    title: 'Project Associate Certification Program',
    issuer: 'Reliance Foundation',
    year: '2026',
    credentialUrl: '#',
  },
  {
    title: 'Leading with Generative AI',
    issuer: 'Harvard Business Impact Enterprise',
    year: '2026',
    credentialUrl: '#',
  },
  {
    title: 'AI Fluency Framework & Foundation',
    issuer: 'Anthropic',
    year: '2026',
    credentialUrl: '#',
  },
];

export const leadership = [
  {
    role: 'Management Co-head',
    organization: "Google Developer Student's Club",
    period: "Feb '23 – Sept '23",
    impact:
      'Planned and executed multi-stakeholder technical workshops — managed timelines, resources, and volunteer coordination across a student-run developer community.',
  },
  {
    role: 'Technical Secretary',
    organization: 'IT Department Student Council',
    period: "Feb '23 – Sept '23",
    impact:
      'Led execution of 6 large-scale events with 208 participants — coordinated cross-functional teams, managed logistics, and ensured smooth on-ground operations.',
  },
];

export const achievements = [
  "Runners-up — Global Deepfake Discovery Hackathon, Cyber Peace Foundation (Mar '24)",
  "Top 50 — SIH 2025 Internal Hackathon at WeSchool; advanced to National Round (Dec '25)",
  "Published: 'A Review Paper on Deepfake Voice Detection' — GIS Science Journal (Feb '24)",
  "Published: 'GenAI: A Survey of Security and Privacy Threats' — NFSU Journal of Cyber Security & Digital Forensics (Jun '24)",
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];
