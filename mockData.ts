import {
  ChallengeCategory,
  ProblemStatement,
  EventTimelineItem,
  LeaderboardEntry,
  Announcement,
  HackathonConfig,
} from '../types';

export const INITIAL_CONFIG: HackathonConfig = {
  eventName: 'MINT',
  tagline: 'Imagine. Innovate. Inspire.',
  // Target date set to 28 days from now
  eventDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
  registrationOpen: true,
  submissionsOpen: true,
  totalPrizePool: '₹5,00,000 INR + Grants',
  demoModeActive: true,
};

export const CHALLENGE_CATEGORIES: {
  category: ChallengeCategory;
  tagline: string;
  description: string;
  accent: string;
  iconName: string;
  problemCount: number;
}[] = [
  {
    category: 'Cybersecurity & Digital Safety',
    tagline: 'Fortify digital perimeters against emerging zero-day threats',
    description: 'Design zero-trust architectures, automated incident triage, biometric fraud detection, and privacy-preserving cryptographic protocols for critical national infrastructure.',
    accent: 'emerald',
    iconName: 'ShieldAlert',
    problemCount: 3,
  },
  {
    category: 'Artificial Intelligence & Machine Learning',
    tagline: 'Autonomous reasoning, multimodal agents & ethical intelligence',
    description: 'Deploy fine-tuned agentic workflows, on-device SLMs, synthetic media detection, real-time computer vision, or neuro-symbolic reasoning to solve high-friction real-world workflows.',
    accent: 'teal',
    iconName: 'Cpu',
    problemCount: 4,
  },
  {
    category: 'Smart Automation',
    tagline: 'Autonomous robotics, IoT mesh & industrial intelligence',
    description: 'Develop next-generation smart supply chain tracking, robotic process telemetry, predictive hardware maintenance, and edge-connected sensor networks for modern smart cities.',
    accent: 'cyan',
    iconName: 'Boxes',
    problemCount: 3,
  },
  {
    category: 'Healthcare Technology',
    tagline: 'Clinical intelligence, remote triage & diagnostic accuracy',
    description: 'Construct decentralized health records, automated anomaly detection in medical imaging, low-cost wearable biosensors, or real-time rural telemedicine routing systems.',
    accent: 'emerald',
    iconName: 'Activity',
    problemCount: 3,
  },
  {
    category: 'Green Technology & Sustainability',
    tagline: 'Decarbonization analytics, clean energy & circular economy',
    description: 'Build hyper-local air quality prediction grids, carbon credit ledger verification, smart electrical grid balancing models, or AI-guided municipal waste sorting solutions.',
    accent: 'green',
    iconName: 'Leaf',
    problemCount: 3,
  },
  {
    category: 'FinTech & Digital Innovation',
    tagline: 'Next-gen settlement, micro-lending & fraud resilience',
    description: 'Engineer cross-border decentralized remittance rails, autonomous algorithmic risk scoring, programmable payments, or fraud graph analysis for high-volume transactions.',
    accent: 'mint',
    iconName: 'Banknote',
    problemCount: 3,
  },
  {
    category: 'Education Technology',
    tagline: 'Personalized pedagogy, multimodal tutoring & accessibility',
    description: 'Create adaptive learning environments that scaffold dyslexic learners, automated vernacular language transcribers, or offline-first interactive STEM learning micro-apps.',
    accent: 'teal',
    iconName: 'GraduationCap',
    problemCount: 3,
  },
  {
    category: 'Open Innovation',
    tagline: 'Unconstrained frontier exploration & cross-domain breakthroughs',
    description: 'Bring bold, uncategorized technological breakthroughs addressing urgent social, aerospace, quantum, or civic dilemmas that redefine conventional technological boundaries.',
    accent: 'cyan',
    iconName: 'Compass',
    problemCount: 2,
  },
];

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'MINT-PS-01',
    category: 'Cybersecurity & Digital Safety',
    title: 'Autonomous Real-time Deepfake & Synthetic Voice Interceptor',
    difficulty: 'Advanced',
    summary: 'Build an edge-compatible detector capable of intercepting synthetic audio and video streams during live financial video KYC or emergency authorization calls with sub-250ms latency.',
    problemScope: 'With the proliferation of diffusion-based real-time voice clones and frame-swapping deepfakes, conventional post-hoc forensic checks are obsolete. Teams must develop a multi-modal feature extractor measuring phoneme-viseme inconsistencies, temporal flicker in facial blood flow (rPPG), and spectral artifacts in voice spectrograms.',
    expectedDeliverables: [
      'Lightweight inference client (WebAssembly or Python C-extension)',
      'Real-time confidence scoring dashboard displaying extracted acoustic and facial anomaly vectors',
      'Benchmark test harness with synthetic vs authenticated benchmark footage'
    ],
    suggestedTech: ['WebRTC', 'PyTorch / ONNX Runtime', 'FastAPI', 'Wasm', 'TailwindCSS'],
    evaluationPointers: ['Latency (< 250ms)', 'False Positive Rate under adversarial noise', 'Cross-platform client footprint'],
    industryPartner: 'National Cyber Security Cell (Advisory)'
  },
  {
    id: 'MINT-PS-02',
    category: 'Artificial Intelligence & Machine Learning',
    title: 'Offline-First Multilingual Medical Diagnostic Assistant for Rural Health Workers',
    difficulty: 'Intermediate',
    summary: 'Develop a quantized on-device small language model (SLM) capable of taking patient symptoms in regional vernacular audio, providing triage suggestions and emergency red flags without internet.',
    problemScope: 'Primary healthcare centers in remote districts often lack stable internet and specialized doctors. Accredited Social Health Activists (ASHA workers) need an intuitive handheld tool that runs quantized speech-to-text and reasoning models directly on $100 smartphones.',
    expectedDeliverables: [
      'Progressive Web App or native mobile app running offline inference (WebGPU / ONNX Mobile)',
      'Audio recording & real-time vernacular symptom extraction interface',
      'ICD-11 compliant preliminary triage recommendation with certainty index'
    ],
    suggestedTech: ['Whisper-tiny', 'Llama-3.2-1B-Instruct (GGUF)', 'React / Vite PWA', 'IndexedDB'],
    evaluationPointers: ['Accuracy of red-flag symptom detection', 'Offline model load time and memory usage', 'User interface simplicity for non-technical workers'],
    industryPartner: 'Digital Health Research Institute'
  },
  {
    id: 'MINT-PS-03',
    category: 'Green Technology & Sustainability',
    title: 'Decentralized Microgrid Balancing & Local Renewable Energy Clearing',
    difficulty: 'Advanced',
    summary: 'Create an automated peer-to-peer energy exchange engine that aggregates rooftop solar telemetry and optimizes real-time power dispatch among neighborhood microgrids.',
    problemScope: 'Grid instability occurs when intermittent distributed rooftop photovoltaic installations dump uncoordinated surplus energy onto local transformers. An intelligent, automated local dispatch layer can forecast generation, match local commercial and residential demands, and clear energy micro-transactions without high transmission loss.',
    expectedDeliverables: [
      'Simulated smart meter telemetry consumer & producer pipeline',
      'Dynamic clearing price algorithm based on marginal cost and storage battery state-of-charge',
      'Interactive visual dashboard showing energy transfer vectors and grid stress minimization'
    ],
    suggestedTech: ['Node.js / Express', 'WebSockets', 'Chart.js / Recharts', 'PostgreSQL / TimescaleDB', 'TypeScript'],
    evaluationPointers: ['Peak-shaving efficiency percentage', 'Algorithmic fair pricing under localized spikes', 'Visual clarity of topology graph'],
    industryPartner: 'CleanEnergy Grid Tech'
  },
  {
    id: 'MINT-PS-04',
    category: 'FinTech & Digital Innovation',
    title: 'Privacy-Preserving Proof-of-Solvency & Credit Scoring for MSMEs',
    difficulty: 'Intermediate',
    summary: 'Architect a zero-knowledge credential system allowing small businesses to prove cash-flow health and revenue stability to lenders without disclosing sensitive customer invoices.',
    problemScope: 'Micro, Small, and Medium Enterprises (MSMEs) struggle to access formal credit due to lack of audited collateral, while hesitating to reveal confidential customer transaction books to third-party lenders. Zero-knowledge succinct non-interactive arguments of knowledge (zk-SNARKs) can verify that a balance sheet meets liquidity covenants without revealing raw ledger line items.',
    expectedDeliverables: [
      'Zk-proof generation circuit for cashflow thresholds (e.g., monthly volume > threshold)',
      'Borrower portal to upload anonymized transaction receipts and emit cryptographic proofs',
      'Lender verification interface providing instantaneous true/false proof confirmation'
    ],
    suggestedTech: ['Circom / SnarkJS', 'Next.js / Vite', 'Ethers.js / Web3', 'TailwindCSS'],
    evaluationPointers: ['Cryptographic soundness', 'Proof generation speed on standard laptop hardware', 'Developer experience and documentation'],
    industryPartner: 'National Open Banking Alliance'
  },
  {
    id: 'MINT-PS-05',
    category: 'Smart Automation',
    title: 'Autonomous Edge Telemetry & Predictive Failure Engine for Industrial Compressors',
    difficulty: 'Intermediate',
    summary: 'Formulate an edge acoustic and vibrational anomaly detection pipeline that flags mechanical wear in manufacturing motors before catastrophic bearing failure occurs.',
    problemScope: 'Unplanned industrial machine downtime causes massive economic losses. Using high-frequency accelerometer and audio telemetry, models must classify harmonic drift, cavitation, and bearing ball degradation with low false alarm rates.',
    expectedDeliverables: [
      'Feature engineering pipeline (Fast Fourier Transform, Mel-frequency spectrograms)',
      'Trained anomaly classifier with self-supervised reconstruction loss',
      'Fleet monitoring dashboard with real-time health score degradation curves'
    ],
    suggestedTech: ['Python', 'TensorFlow Lite', 'Express', 'React', 'Lucide React'],
    evaluationPointers: ['Lead time prior to failure warning', 'Robustness to ambient factory background noise', 'Extensible REST/WebSocket telemetry ingestion API'],
  },
  {
    id: 'MINT-PS-06',
    category: 'Education Technology',
    title: 'Universal Interactive Tactile & Auditory Geometry Explorer for Visually Impaired Students',
    difficulty: 'Beginner-Friendly',
    summary: 'Design an accessible web platform enabling visually impaired students to comprehend complex 2D and 3D spatial geometry through spatialized binaural soundscapes and haptic feedback.',
    problemScope: 'High-school geometry education heavily relies on visual diagrams, excluding students with visual disabilities from foundational mathematics and STEM careers. A multimodal accessible web environment using Web Audio API spatialization and screen-reader keyboard shortcuts can render geometric coordinates into immersive audio-spatial textures.',
    expectedDeliverables: [
      'Fully keyboard-accessible interactive canvas compliant with WCAG AAA',
      'Spatial audio sound synthesizer translating cursor coordinates, slope, and intersections into tones',
      'Library of 10 standard Euclidean geometric theorems with guided auditory proofs'
    ],
    suggestedTech: ['Web Audio API', 'React', 'ARIA Live regions', 'TailwindCSS'],
    evaluationPointers: ['Accessibility compliance and keyboard traversal velocity', 'Intuitive audio spatial mapping', 'Teacher pedagogical authoring tools'],
  },
  {
    id: 'MINT-PS-07',
    category: 'Healthcare Technology',
    title: 'Computer-Vision Assisted Fall & Tremor Tele-Monitoring for Eldercare',
    difficulty: 'Intermediate',
    summary: 'Build a privacy-first web-camera monitoring solution that extracts skeletal keypoints to monitor elderly gait stability and detect sudden falls without saving or transmitting raw video streams.',
    problemScope: 'Elderly individuals living independently face significant risks from falls. Cameras in living quarters trigger privacy concerns. By calculating skeletal vectors entirely client-side and discarding RGB frames instantly, the system guarantees 100% privacy while triggering instant caregiver alerts upon detecting abnormal downward acceleration.',
    expectedDeliverables: [
      'Client-side pose estimation running at 30 FPS in standard browser (MediaPipe / MoveNet)',
      'Instantaneous fall detection heuristic calculating torso velocity vector change',
      'Privacy compliance verification demonstrating zero video packet egress'
    ],
    suggestedTech: ['MediaPipe Pose', 'HTML5 Canvas', 'WebRTC DataChannel', 'React', 'TypeScript'],
    evaluationPointers: ['Inference frames-per-second', 'Detection accuracy during occlusions', 'Zero-data leak architectural design'],
  },
  {
    id: 'MINT-PS-08',
    category: 'Open Innovation',
    title: 'Resilient Decentralized Mesh Communications for Disaster Relief Teams',
    difficulty: 'Advanced',
    summary: 'Develop a browser-to-browser peer-to-peer relief coordination network that functions across ad-hoc local WiFi or Bluetooth without relying on active cellular towers or internet backhaul.',
    problemScope: 'When cyclones, earthquakes, or floods destroy telecom infrastructure, local rescue teams lose coordination channels. Utilizing WebRTC local peer discovery and Service Worker caching, devices can form opportunistic mesh networks to share victim triage locations, medical inventories, and survivor statuses.',
    expectedDeliverables: [
      'WebRTC mesh routing protocol handling node joins and disconnects',
      'Offline-cached GIS map interface with localized casualty and supply pin drops',
      'Conflict-free Replicated Data Types (CRDT) sync mechanism when peers re-establish contact'
    ],
    suggestedTech: ['WebRTC Mesh', 'IndexedDB / Yjs (CRDT)', 'Leaflet / OpenStreetMap', 'Service Workers'],
    evaluationPointers: ['Mesh resilience during node dropping', 'Data convergence consistency', 'Battery efficiency under continuous discovery'],
  }
];

export const INITIAL_TIMELINE: EventTimelineItem[] = [
  {
    id: 'phase-1',
    phase: 'Phase 01',
    title: 'National Registration Opens',
    dateString: 'October 15, 2026',
    description: 'Online registration opens nationwide for collegiate and young professional teams (2 to 4 members). Track selection and initial team onboarding.',
    status: 'completed',
    isConfigurable: true,
  },
  {
    id: 'phase-2',
    phase: 'Phase 02',
    title: 'Team Registration Deadline',
    dateString: 'November 10, 2026 · 11:59 PM IST',
    description: 'Final cutoff for submitting team rosters, institutional verification, and project concept abstracts.',
    status: 'current',
    isConfigurable: true,
  },
  {
    id: 'phase-3',
    phase: 'Phase 03',
    title: 'Problem Statements & Mentorship Briefing',
    dateString: 'November 12, 2026 · 10:00 AM IST',
    description: 'Official release of deep-dive industry challenge briefs, technical sandbox environments, and AMA sessions with national domain mentors.',
    status: 'upcoming',
    isConfigurable: true,
  },
  {
    id: 'phase-4',
    phase: 'Phase 04',
    title: 'Preliminary Submission Cutoff',
    dateString: 'November 18, 2026 · 06:00 PM IST',
    description: 'Teams submit architecture whitepaper, GitHub repository commit history, and a 3-minute video pitch walk-through.',
    status: 'upcoming',
    isConfigurable: true,
  },
  {
    id: 'phase-5',
    phase: 'Phase 05',
    title: 'National Shortlist & Evaluation Round',
    dateString: 'November 21, 2026',
    description: 'Jury panel of tech executives and researchers evaluates submissions across innovation, technical depth, and impact. Top 50 teams advance.',
    status: 'upcoming',
    isConfigurable: true,
  },
  {
    id: 'phase-6',
    phase: 'Phase 06',
    title: 'Grand Finale 36-Hour Hackathon',
    dateString: 'November 28 – 29, 2026',
    description: 'Intense 36-hour non-stop prototyping sprint with live judge check-ins, architectural stress-testing, and investor showcase.',
    status: 'upcoming',
    isConfigurable: true,
  },
  {
    id: 'phase-7',
    phase: 'Phase 07',
    title: 'Final Pitches & National Award Ceremony',
    dateString: 'November 30, 2026 · 04:00 PM IST',
    description: 'Top 10 finalists present live before a distinguished jury. Announcement of national champions, runner-ups, and deployment grant recipients.',
    status: 'upcoming',
    isConfigurable: true,
  },
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'LB-01',
    rank: 1,
    teamName: 'NeuralVortex',
    projectTitle: 'Deepfake Sentinel: Live Voice & Face Biometric Interceptor',
    institution: 'Indian Institute of Technology, Madras',
    category: 'Cybersecurity & Digital Safety',
    preliminaryScore: 96.5,
    semiFinalScore: 98.0,
    finalScore: 97.2,
    totalScore: 97.2,
    status: 'Champion',
    isSampleData: true,
  },
  {
    id: 'LB-02',
    rank: 2,
    teamName: 'BioSync Labs',
    projectTitle: 'PulseMesh: Quantized Edge Diagnostic Assistant for ASHA',
    institution: 'Birla Institute of Technology and Science, Pilani',
    category: 'Healthcare Technology',
    preliminaryScore: 94.0,
    semiFinalScore: 96.5,
    finalScore: 96.0,
    totalScore: 95.5,
    status: 'Runner Up',
    isSampleData: true,
  },
  {
    id: 'LB-03',
    rank: 3,
    teamName: 'AetherVolt',
    projectTitle: 'SolarP2P: Decentralized Neighborhood Grid Balancing',
    institution: 'National Institute of Technology, Trichy',
    category: 'Green Technology & Sustainability',
    preliminaryScore: 92.0,
    semiFinalScore: 94.0,
    finalScore: 93.8,
    totalScore: 93.3,
    status: 'Grand Finalist',
    isSampleData: true,
  },
  {
    id: 'LB-04',
    rank: 4,
    teamName: 'ZeroLedger',
    projectTitle: 'ZkSolvent: Zero-Knowledge MSME Credit Underwriting',
    institution: 'Delhi Technological University',
    category: 'FinTech & Digital Innovation',
    preliminaryScore: 91.5,
    semiFinalScore: 92.5,
    finalScore: 93.0,
    totalScore: 92.3,
    status: 'Grand Finalist',
    isSampleData: true,
  },
  {
    id: 'LB-05',
    rank: 5,
    teamName: 'TactileLogic',
    projectTitle: 'AudioGeo: Binaural Spatial Geometry for Blind Scholars',
    institution: 'College of Engineering, Guindy',
    category: 'Education Technology',
    preliminaryScore: 89.0,
    semiFinalScore: 91.0,
    finalScore: 92.0,
    totalScore: 90.7,
    status: 'Shortlisted',
    isSampleData: true,
  },
  {
    id: 'LB-06',
    rank: 6,
    teamName: 'KineticsAI',
    projectTitle: 'VibroEdge: Predictive Bearing Cavitation Predictor',
    institution: 'Vellore Institute of Technology',
    category: 'Smart Automation',
    preliminaryScore: 88.0,
    semiFinalScore: 90.0,
    finalScore: 89.5,
    totalScore: 89.2,
    status: 'Shortlisted',
    isSampleData: true,
  },
  {
    id: 'LB-07',
    rank: 7,
    teamName: 'ReliefMesh',
    projectTitle: 'AdHocResQ: Browser-to-Browser Disaster Mesh',
    institution: 'RV College of Engineering, Bengaluru',
    category: 'Open Innovation',
    preliminaryScore: 87.5,
    semiFinalScore: 88.0,
    finalScore: 89.0,
    totalScore: 88.2,
    status: 'In Review',
    isSampleData: true,
  },
  {
    id: 'LB-08',
    rank: 8,
    teamName: 'VisionCare',
    projectTitle: 'GuardianPose: Skeletal Fall Detection with Zero Video Storage',
    institution: 'International Institute of Information Technology, Hyderabad',
    category: 'Healthcare Technology',
    preliminaryScore: 86.0,
    semiFinalScore: 87.5,
    finalScore: 88.0,
    totalScore: 87.2,
    status: 'In Review',
    isSampleData: true,
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-01',
    title: 'Problem Statements & Evaluation Matrix Officially Published',
    content: 'All 8 challenge track briefs, dataset repositories, and grading rubrics are now available for registered teams. Please review the deliverables checklist carefully.',
    category: 'General',
    publishedAt: '2026-10-22T09:00:00Z',
    priority: 'normal',
    author: 'MINT Organizing Secretariat',
  },
  {
    id: 'ANN-02',
    title: 'Team Registration Phase Enters Final 10-Day Window',
    content: 'Colleges and universities have registered over 450 teams so far. Ensure all team member profiles and institutional verification letters are finalized before November 10th.',
    category: 'Deadline',
    publishedAt: '2026-10-24T14:30:00Z',
    priority: 'high',
    author: 'Admissions & Scrutiny Board',
  },
  {
    id: 'ANN-03',
    title: 'Upcoming National Masterclass: Scaling Edge AI & WebRTC Systems',
    content: 'Join leading cloud architects and AI researchers on October 29 at 05:00 PM IST for a live architectural walkthrough on low-latency inference pipelines.',
    category: 'Workshop',
    publishedAt: '2026-10-20T11:00:00Z',
    priority: 'normal',
    author: 'MINT Technical Committee',
  },
];

export const FAQ_ITEMS = [
  {
    category: 'Eligibility & Team Formation',
    question: 'Who is eligible to participate in MINT 2026?',
    answer: 'Any enrolled undergraduate, postgraduate, or diploma student from recognized higher education institutions, polytechnics, or universities across India is eligible. Early-career innovators and independent developers under 26 years of age may also apply under the Open Innovation track.'
  },
  {
    category: 'Eligibility & Team Formation',
    question: 'What is the required team size and composition?',
    answer: 'Teams must comprise 2 to 4 members. Cross-institutional teams (members from different colleges or universities) and interdisciplinary combinations (e.g. computer science, design, electrical, bio-engineering) are warmly encouraged.'
  },
  {
    category: 'Registration & Fees',
    question: 'Is there any registration fee to participate in MINT?',
    answer: 'No. Registration for MINT is completely free of charge. MINT is supported by national research partners, tech sponsors, and academic consortiums to foster equitable technological innovation.'
  },
  {
    category: 'Submissions & IP Rights',
    question: 'Who owns the intellectual property (IP) of the submitted project?',
    answer: 'The participating team retains 100% full intellectual property rights to their code, hardware schematics, and concepts. Neither the organizers nor sponsors claim any ownership over your prototype.'
  },
  {
    category: 'Submissions & IP Rights',
    question: 'Can we submit an existing project we previously built?',
    answer: 'Projects must represent substantial original development during the MINT hackathon timeline. You may leverage open-source libraries, pre-trained base models, and foundational scaffolding, provided all prior work is transparently declared in your project README.'
  },
  {
    category: 'Evaluation & Prizes',
    question: 'What are the evaluation criteria used by the jury?',
    answer: 'Projects are evaluated on: Technical Execution & Architecture (30%), Innovation & Originality (25%), Real-World Impact & Feasibility (25%), and Presentation & Demo Completeness (20%).'
  },
  {
    category: 'Grand Finale',
    question: 'Where will the Grand Finale take place?',
    answer: 'The preliminary rounds and technical sprints are conducted fully online. The Grand Finale is a hybrid showcase with in-person pitch stages hosted at our designated national technological hub and simultaneous live-streamed virtual stages for remote finalists.'
  }
];

export const PRIZE_TIERS = [
  {
    title: 'National Champion',
    amount: '₹2,50,000',
    perks: ['Cash Grant', 'MINT Grand Trophy & Gold Citations', 'Fast-Track Cloud Credits ($25,000)', 'Direct VC / Incubator Pitch Slot'],
    badge: '1st Place'
  },
  {
    title: 'First Runner-Up',
    amount: '₹1,50,000',
    perks: ['Cash Grant', 'Silver Trophy & Citations', 'Cloud Infrastructure Credits ($10,000)', 'Enterprise Mentorship Access'],
    badge: '2nd Place'
  },
  {
    title: 'Second Runner-Up',
    amount: '₹1,00,000',
    perks: ['Cash Grant', 'Bronze Trophy & Citations', 'Hardware Dev Kits & Cloud Credits', 'National Tech Fellowship Entry'],
    badge: '3rd Place'
  },
  {
    title: 'Category Innovation Awards (8 Tracks)',
    amount: '₹25,000 each',
    perks: ['Special Category Winner Citation', 'Direct Interview Rounds with Partner Firms', 'Patent Filing Guidance Support'],
    badge: '8 Special Honors'
  }
];
