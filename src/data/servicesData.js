// Central source of truth for iFeX service content.
// Swap copy, icons (any lucide-react icon name works), and metrics here —
// every page (Services grid, ServiceTemplate detail pages) reads from this file.

export const services = [
  {
    slug: 'website-development',
    icon: 'Globe',
    category: 'Websites',
    title: 'Website Development',
    tagline: 'Fast, accessible, conversion-focused web experiences.',
    description:
      'We design and build custom websites and web apps on modern frameworks — architected for speed, SEO, and scale from the first commit.',
    features: [
      'Custom React / Next.js builds',
      'Headless CMS integration',
      'Core Web Vitals optimization',
      'E-commerce & booking systems',
      'Progressive Web App support',
      'WCAG-compliant accessibility',
    ],
    process: [
      { step: 'Discovery', detail: 'Audit goals, audience, and technical constraints.' },
      { step: 'Design', detail: 'Wireframes and high-fidelity UI in your brand system.' },
      { step: 'Build', detail: 'Component-driven development with continuous review.' },
      { step: 'Launch & Grow', detail: 'Performance tuning, analytics, and iteration.' },
    ],
    // TODO: swap in real client metrics before launch
    metric: { value: '2.4x', label: 'avg. conversion lift' },
  },
  {
    slug: 'erp-solutions',
    icon: 'LayoutGrid',
    category: 'ERP',
    title: 'ERP Solutions',
    tagline: 'Unify operations, finance, and inventory in one system.',
    description:
      'iFeX designs modular ERP platforms that connect procurement, HR, accounting, and inventory into a single source of operational truth.',
    features: [
      'Custom module architecture',
      'Multi-branch inventory sync',
      'Finance & payroll automation',
      'Role-based access control',
      'Real-time reporting dashboards',
      'Legacy system migration',
    ],
    process: [
      { step: 'Process Mapping', detail: 'Document current workflows across departments.' },
      { step: 'Architecture', detail: 'Design a modular schema built to scale with you.' },
      { step: 'Implementation', detail: 'Phased rollout with staff training included.' },
      { step: 'Support', detail: 'Ongoing maintenance and module expansion.' },
    ],
    metric: { value: '38%', label: 'avg. operational efficiency gain' },
  },
  {
    slug: 'mobile-app-development',
    icon: 'Smartphone',
    category: 'Mobile',
    title: 'Mobile App Development',
    tagline: 'Native-feel apps for iOS and Android from one codebase.',
    description:
      'We build cross-platform mobile applications using React Native and Flutter, engineered for performance, offline resilience, and app-store approval.',
    features: [
      'Cross-platform (iOS & Android)',
      'Offline-first data sync',
      'Push notification systems',
      'In-app payments',
      'Biometric authentication',
      'App Store & Play Store deployment',
    ],
    process: [
      { step: 'Prototype', detail: 'Clickable prototype validated with real users.' },
      { step: 'Development', detail: 'Sprint-based build with weekly demos.' },
      { step: 'QA & Devices', detail: 'Testing across device matrix and OS versions.' },
      { step: 'Release', detail: 'Store submission, monitoring, and updates.' },
    ],
    metric: { value: '4.8★', label: 'avg. store rating delivered' },
  },
  {
    slug: 'ai-business-automation',
    icon: 'BrainCircuit',
    category: 'AI',
    title: 'AI & Business Automation',
    tagline: 'Put repetitive work on autopilot with applied AI.',
    description:
      'From intelligent document processing to custom LLM-powered assistants, we embed automation where it removes the most manual hours from your team.',
    features: [
      'Workflow & RPA automation',
      'Custom chatbots & copilots',
      'Document intelligence (OCR/NLP)',
      'Predictive analytics models',
      'Third-party API orchestration',
      'Human-in-the-loop review tools',
    ],
    process: [
      { step: 'Opportunity Audit', detail: 'Identify highest-ROI automation targets.' },
      { step: 'Model Selection', detail: 'Choose the right model/tooling for the task.' },
      { step: 'Integration', detail: 'Connect automation into existing systems.' },
      { step: 'Monitor & Refine', detail: 'Track accuracy and retrain over time.' },
    ],
    metric: { value: '120+', label: 'hours saved / month, typical client' },
  },
  {
    slug: 'cloud-solutions',
    icon: 'CloudCog',
    category: 'Cloud',
    title: 'Cloud Solutions',
    tagline: 'Infrastructure that scales as fast as you do.',
    description:
      'We architect, migrate, and manage cloud infrastructure on AWS, Azure, and GCP — built for uptime, cost efficiency, and effortless scaling.',
    features: [
      'Cloud migration & modernization',
      'Auto-scaling infrastructure',
      'CI/CD pipeline setup',
      'Cost optimization audits',
      'Disaster recovery planning',
      'Containerization (Docker/K8s)',
    ],
    process: [
      { step: 'Assessment', detail: 'Audit current infra and cost structure.' },
      { step: 'Architecture', detail: 'Design resilient, scalable cloud topology.' },
      { step: 'Migration', detail: 'Zero-downtime migration in controlled stages.' },
      { step: 'Optimize', detail: 'Continuous cost and performance tuning.' },
    ],
    metric: { value: '99.98%', label: 'avg. uptime achieved' },
  },
  {
    slug: 'cybersecurity',
    icon: 'ShieldCheck',
    category: 'Security',
    title: 'Cybersecurity',
    tagline: 'Protect your systems, data, and reputation.',
    description:
      'iFeX secures applications and infrastructure with penetration testing, compliance frameworks, and 24/7 monitoring designed for enterprise risk profiles.',
    features: [
      'Penetration testing',
      'Security audits & compliance (SOC 2, ISO 27001)',
      'Endpoint & network monitoring',
      'Identity & access management',
      'Incident response planning',
      'Employee security training',
    ],
    process: [
      { step: 'Risk Assessment', detail: 'Map attack surface and vulnerabilities.' },
      { step: 'Remediation', detail: 'Patch and harden critical systems.' },
      { step: 'Monitoring', detail: 'Deploy continuous threat detection.' },
      { step: 'Response Plan', detail: 'Document and rehearse incident response.' },
    ],
    metric: { value: '0', label: 'critical breaches across client base' },
  },
  {
    slug: 'api-integration',
    icon: 'Plug',
    category: 'Integration',
    title: 'API Integration',
    tagline: 'Connect every tool in your stack, reliably.',
    description:
      'We design and integrate REST, GraphQL, and webhook-based APIs so your platforms — CRM, payments, logistics — speak to each other in real time.',
    features: [
      'REST & GraphQL API design',
      'Third-party integrations (Stripe, Twilio, etc.)',
      'Webhook orchestration',
      'API gateway & rate limiting',
      'Legacy system connectors',
      'Comprehensive API documentation',
    ],
    process: [
      { step: 'Mapping', detail: 'Define data contracts between systems.' },
      { step: 'Build', detail: 'Develop secure, versioned API layers.' },
      { step: 'Testing', detail: 'Load and failure-mode testing.' },
      { step: 'Handover', detail: 'Documentation and monitoring dashboards.' },
    ],
    metric: { value: '99.9%', label: 'API request success rate' },
  },
  {
    slug: 'ui-ux-design',
    icon: 'PenTool',
    category: 'UI/UX',
    title: 'UI/UX Design',
    tagline: 'Interfaces people enjoy using twice.',
    description:
      'Our design team crafts research-backed interfaces — from design systems to high-fidelity prototypes — that make complex products feel effortless.',
    features: [
      'User research & journey mapping',
      'Design systems & component libraries',
      'High-fidelity prototyping',
      'Usability testing',
      'Accessibility (WCAG 2.1 AA)',
      'Design-to-dev handoff',
    ],
    process: [
      { step: 'Research', detail: 'Interviews, journey maps, competitive audit.' },
      { step: 'Wireframe', detail: 'Low-fidelity flows validated early.' },
      { step: 'Visual Design', detail: 'High-fidelity UI and design system.' },
      { step: 'Handoff', detail: 'Dev-ready specs and component docs.' },
    ],
    metric: { value: '46%', label: 'avg. task-completion improvement' },
  },
];

// Additional micro-services referenced across the site grid (16 total),
// grouped under their parent core category for the Services page.
export const microServices = [
  { parent: 'website-development', name: 'Landing Page Design' },
  { parent: 'website-development', name: 'E-commerce Development' },
  { parent: 'erp-solutions', name: 'Inventory Management Systems' },
  { parent: 'erp-solutions', name: 'HR & Payroll Systems' },
  { parent: 'mobile-app-development', name: 'Cross-Platform Apps' },
  { parent: 'mobile-app-development', name: 'App Maintenance & Support' },
  { parent: 'ai-business-automation', name: 'Custom AI Chatbots' },
  { parent: 'ai-business-automation', name: 'Workflow Automation' },
  { parent: 'cloud-solutions', name: 'Cloud Migration' },
  { parent: 'cloud-solutions', name: 'DevOps & CI/CD' },
  { parent: 'cybersecurity', name: 'Penetration Testing' },
  { parent: 'cybersecurity', name: 'Compliance Audits' },
  { parent: 'api-integration', name: 'Payment Gateway Integration' },
  { parent: 'api-integration', name: 'Third-Party API Development' },
  { parent: 'ui-ux-design', name: 'Design Systems' },
  { parent: 'ui-ux-design', name: 'Usability Testing' },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
