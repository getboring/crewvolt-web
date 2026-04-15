export const rolesWeStaff = [
  "Inspectors",
  "Superintendents",
  "Project Managers",
  "Construction Managers",
  "QA/QC",
  "Safety",
  "Environmental",
] as const;

export const ownerSideRoles = [
  {
    title: "Project Manager",
    description:
      "Your representative on the project. Manages schedule, budget, contractor coordination, and reporting. Ensures the project is delivered on time, on budget, and to specification.",
  },
  {
    title: "Electrical Inspector",
    description:
      "Quality oversight for all electrical construction including transformers, bus work, cable terminations, grounding systems, control wiring, relay panel wiring, conduit, and cable tray.",
  },
  {
    title: "Civil Inspector",
    description:
      "Quality oversight for foundations, structural steel, grading, drainage, underground utilities, fencing, and site work. Verifies concrete placement and structural details against drawings.",
  },
  {
    title: "High Voltage Inspector",
    description:
      "Specialized oversight for high voltage equipment and connections, including transformers, circuit breakers, disconnect switches, bus systems, and surge arresters.",
  },
  {
    title: "Structural Inspector",
    description:
      "Inspection of steel structures, lattice towers, support systems, equipment foundations, and structural connections with close coordination on welds and bolt torque verification.",
  },
] as const;

export const contractorSideRoles = [
  {
    title: "Construction Manager",
    description:
      "Overall field leadership. Coordinates all trades, manages the construction schedule, runs coordination meetings, and interfaces with the owner's representative.",
  },
  {
    title: "Electrical Superintendent",
    description:
      "Directs electrical construction activities, manages manpower and material flow, and keeps electrical scope on schedule and built to drawings and specifications.",
  },
  {
    title: "Civil Superintendent",
    description:
      "Directs civil and structural work, manages earthwork and foundations, and coordinates sequencing with the electrical superintendent in shared work areas.",
  },
  {
    title: "QA/QC Manager",
    description:
      "Leads quality from mobilization through turnover. Develops inspection and test plans, manages submittals, tracks NCRs, and ensures records are audit-ready.",
  },
  {
    title: "QA/QC Inspector",
    description:
      "Performs field inspections against the ITP, documents test results, manages punch lists, and works directly with field leaders to resolve issues in real time.",
  },
] as const;

export const projectSpecificRoles = [
  {
    title: "Mechanical Inspector",
    description:
      "Inspection of mechanical systems and rotating equipment. Common on wind and generation projects.",
  },
  {
    title: "Safety Manager",
    description:
      "Site safety program leadership, orientations, audits, incident investigation, and OSHA compliance.",
  },
  {
    title: "Environmental Compliance Professional",
    description:
      "Environmental permit management, SWPPP and SPCC compliance, agency coordination, and documentation.",
  },
  {
    title: "Site Administrator",
    description:
      "Project documentation management, coordination support, daily reporting, and administrative operations.",
  },
  {
    title: "Transportation Engineer",
    description:
      "Logistics for oversize loads, haul route coordination, equipment mobilization, and site access management.",
  },
] as const;

export const industries = [
  {
    id: "substations",
    title: "Substations",
    description:
      "Transmission and distribution substations are the backbone of the grid. CrewVolt was built around the people who oversee substation construction.",
    currentlySeeking:
      "electrical inspectors, civil inspectors, and project managers for active substation programs",
    status: "Active",
  },
  {
    id: "wind",
    title: "Wind",
    description:
      "Utility-scale wind projects need oversight teams that ramp fast, work remote sites, and execute against tight commissioning timelines.",
    currentlySeeking:
      "electrical inspectors, high voltage inspectors, and safety managers for active wind projects",
    status: "Hiring",
  },
  {
    id: "solar",
    title: "Solar",
    description:
      "IRA timelines, PPA commitments, and interconnection deadlines leave no room for staffing delays. We place teams that keep solar projects on schedule.",
    currentlySeeking:
      "QA/QC managers, construction managers, and project controls support",
    status: "Active",
  },
  {
    id: "bess",
    title: "Battery Energy Storage",
    description:
      "BESS projects require specialized safety, quality, and commissioning oversight including thermal management and high-voltage DC systems.",
    currentlySeeking:
      "high voltage inspectors, safety managers, and environmental compliance support",
    status: "Hiring",
  },
  {
    id: "transmission",
    title: "Transmission",
    description:
      "Transmission upgrades are accelerating with data center load growth and interconnection requirements. We staff leadership and inspection roles that keep execution clean.",
    currentlySeeking:
      "civil inspectors, structural inspectors, and construction managers",
    status: "Active",
  },
  {
    id: "grid-modernization",
    title: "Grid Modernization",
    description:
      "Utilities are running multi-year hardening and automation programs across multiple sites. Experienced project leadership keeps reliability work moving.",
    currentlySeeking:
      "project managers, QA/QC inspectors, and field leadership for program expansion",
    status: "Active",
  },
] as const;

export const howItWorksClientSteps = [
  {
    title: "You call us with a need.",
    body: "Tell us the roles, location, and timeline. We ask the right questions because we already understand the work.",
  },
  {
    title: "We find the right people.",
    body: "We source from a network of proven professionals and vet for real field capability, not resume keywords.",
  },
  {
    title: "We handle the employment.",
    body: "Workers are CrewVolt employees. We handle payroll, taxes, workers comp, onboarding compliance, and screening.",
  },
  {
    title: "Your people show up ready.",
    body: "You direct the work on site. We handle the employment side and adjust quickly if your timeline shifts.",
  },
  {
    title: "You get one invoice.",
    body: "Agreed hourly rates, one vendor relationship, one AP line item.",
  },
] as const;

export const howItWorksWorkerSteps = [
  {
    title: "You reach out.",
    body: "Tell us your roles, projects, and regions. Call, email, or submit the form.",
  },
  {
    title: "We have a real conversation.",
    body: "You talk with people who understand your work and what a strong field fit looks like.",
  },
  {
    title: "We vet you the way the jobsite would.",
    body: "We check references with people who have actually worked alongside you.",
  },
  {
    title: "You get into our network.",
    body: "When projects match your experience and availability, we call with the details.",
  },
  {
    title: "You go to work as a CrewVolt employee.",
    body: "W-2 employment, taxes withheld, workers comp covered. You focus on the field work.",
  },
  {
    title: "Before your project wraps, we line up what is next.",
    body: "We stay in touch and work the next placement before demobilization.",
  },
] as const;

export const whyCrewVoltFaq = [
  {
    id: "client-engineering-firm",
    audience: "For clients",
    question: "Why not use a full-service engineering firm for staffing?",
    answer:
      "Large engineering firms do excellent work, but their staffing rates include full corporate overhead. CrewVolt provides experienced field professionals without the enterprise wrapper, which keeps rates tighter while preserving quality.",
  },
  {
    id: "client-direct-hire",
    audience: "For clients",
    question: "Why not hire direct?",
    answer:
      "For 12 to 18 month projects, direct hiring adds recruiting cycles, onboarding burden, and reduction-in-force decisions at closeout. CrewVolt gives you project-timeline staffing without permanent headcount risk.",
  },
  {
    id: "client-general-agency",
    audience: "For clients",
    question: "Why not use a general staffing agency?",
    answer:
      "General agencies work across many industries and often learn energy terminology during intake. CrewVolt only staffs energy infrastructure and vets against real field performance standards.",
  },
  {
    id: "worker-1099",
    audience: "For workers",
    question: "Why not go 1099 independent?",
    answer:
      "1099 can look flexible until weekends become payroll, tax estimates, insurance, and invoice chasing. CrewVolt gives you W-2 employment, taxes withheld, insurance covered, and continuity between projects.",
  },
  {
    id: "worker-general-agency",
    audience: "For workers",
    question: "Why not work with a general staffing agency?",
    answer:
      "General agencies often cannot advocate for specialized field roles because they do not live in this space. CrewVolt understands your role, fights for fair pay, and stays engaged after placement.",
  },
  {
    id: "worker-direct-hire",
    audience: "For workers",
    question: "Why not just take a direct hire?",
    answer:
      "Direct hire is a great path for many people. If you prefer project variety with business-side support and consistent transitions, CrewVolt contract staffing gives you that model.",
  },
] as const;
