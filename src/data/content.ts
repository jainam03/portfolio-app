// ─── Central Content Data ─────────────────────────────────────
// Single source of truth. Edit here to update the entire site.

export const personalInfo = {
  name: 'Jainam Chheda',
  title: 'Operations · Analytics · Strategy',
  tagline: 'Engineering precision meets business design.',
  positionStatement:
    'I map operational systems, diagnose inefficiencies, and build structured solutions. From time-motion studies at QSR outlets to AI-enabled workflow prototypes — IT engineering taught me to think in systems, business design taught me to solve for people.',
  location: 'Mumbai, India',
  email: 'jbchheda03@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jainam-chheda',
  github: 'https://github.com/jainam03',
  resumeUrl: '/resume.pdf',
  openToWork: true,
  seekingRole: 'Summer Internship 2026',
};

export const about = {
  headline: 'Systems thinker. Process analyst. Structured executor.',
  paragraphs: [
    'I am a PGDM – Business Design student at WeSchool Mumbai (Batch 2025–27) with a B.E. in Information Technology. My work lives at the intersection of engineering rigour and business pragmatism.',
    'I approach problems by first mapping the system, then locating the highest-leverage intervention. Whether it\'s a service bottleneck at a QSR outlet, a coordination gap in a gifting platform, or a carbon tracking problem in construction — I build structured solutions, not one-off fixes.',
    'Track record: published researcher, hackathon finalist, and builder of real-world prototypes across operations, AI/ML, and sustainability.',
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

export const projects = [
  {
    id: 'p1',
    title: 'Service Operations & Process Analysis',
    domain: 'Operations',
    period: "Jul '25 – Dec '25",
    summary: "Time-motion study at McDonald's revealing a 4+ minute table allocation delay — diagnosed to 15% non-value-added time and fragmented handoffs.",
    tags: ['Lean', 'Time-Motion Study', 'Process Mapping', 'QSR'],
    impact: '15% NVA time uncovered; 4+ min delay root-caused',
    problem:
      "McDonald's table allocation had consistent delays exceeding 4 minutes due to fragmented handoffs between station staff and the absence of real-time table visibility — creating a measurable dip in customer throughput.",
    approach:
      'Conducted structured time-motion study across multiple service cycles at the outlet. Applied Lean value stream thinking to classify each activity as value-adding or non-value-adding. Root-cause mapped the delay to three compounding factors: reactive table allocation, no live seat display, and decoupled pre-ordering.',
    tools: ['Time-Motion Study', 'Lean / VSM', 'MS Excel', 'Process Mapping'],
    insights: [
      '15% of total service cycle time was non-value-added — concentrated in waiting and handoff transitions.',
      'Table allocation was reactive, not anticipatory — a structural flaw solvable with a simple pre-allocation rule.',
    ],
    outcome:
      'Proposed Lean-driven interventions: pre-allocation protocols, live seat display system, and integrated pre-ordering. Projected to eliminate the 4+ minute delay and improve table utilisation rate meaningfully.',
  },
  {
    id: 'p2',
    title: 'Customised Gifting Platform — UX Digitisation',
    domain: 'Product & UX',
    period: "Nov '25 – Jan '26",
    summary: 'Multi-stakeholder research and workflow mapping across a gifting platform\'s order lifecycle, resulting in an AI-enabled coordination prototype.',
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
      'Delivered an AI-enabled workflow prototype improving transparency, exception handling, and alignment across the 3-layer stakeholder chain — from order intake to final delivery.',
  },
  {
    id: 'p3',
    title: 'C&D Waste Lifecycle Analysis — Trace Carbon',
    domain: 'Sustainability & Analytics',
    period: "Nov '25 – Present",
    summary: 'Analysed construction & demolition waste workflows and built "Trace Carbon" — a prototype enabling carbon quantification and circularity decision-making.',
    tags: ['Carbon Tracking', 'Workflow Analysis', 'Sustainability', 'Prototype'],
    impact: 'C&D carbon tracking prototype aligned to compliance & circularity',
    problem:
      'C&D waste systems lacked structured carbon tracking and compliance monitoring — creating fragmented, non-transparent waste management with no clear basis for circularity decisions.',
    approach:
      'Analysed existing C&D waste workflows end-to-end to identify systemic gaps. Developed "Trace Carbon" — a workflow-led prototype that quantifies emissions at each lifecycle stage, maps waste handling, and enables data-driven circularity decisions aligned with sustainability frameworks.',
    tools: ['Workflow Analysis', 'Sustainability Frameworks', 'Carbon Calculation Logic', 'Prototype Design'],
    insights: [
      'Carbon tracking in C&D is largely manual and fragmented — a system problem, not a data problem.',
      'Quantifying emissions per lifecycle stage shifts teams from reactive compliance to proactive monitoring.',
    ],
    outcome:
      'Delivered "Trace Carbon" prototype enabling improved emissions visibility, compliance tracking, and decision support for stakeholders across the C&D waste ecosystem.',
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
    title: 'Prompt Engineering Basics',
    issuer: 'Coursera',
    year: '2025',
    credentialUrl: '#',
  },
  {
    title: 'Design Thinking for Innovators',
    issuer: 'Coursera',
    year: '2025',
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
