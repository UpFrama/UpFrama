export interface WorkflowNode {
  id: string;
  category: 'erp' | 'ai' | 'automation' | 'output';
  title: string;
  subtitle: string;
  icon: string;
  status: 'active' | 'processing' | 'idle' | 'success';
  payload?: {
    source: string;
    target: string;
    latency: string;
    confidence: string;
    sampleData: Record<string, string | number>;
  };
}

export interface WorkflowPreset {
  id: string;
  name: string;
  industry: string;
  description: string;
  metrics: {
    timeReduction: string;
    errorRate: string;
    annualSavings: string;
  };
  nodes: WorkflowNode[];
}

export interface SolutionItem {
  id: string;
  title: string;
  industry: 'manufacturing' | 'warehousing' | 'logistics' | 'startups';
  headline: string;
  description: string;
  tags: string[];
  keyBenefits: string[];
  integrationList: string[];
  metrics: string;
  iconName: string;
  codeSnippet?: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logoText: string;
  challenge: string;
  solution: string;
  results: {
    metric1: { value: string; label: string };
    metric2: { value: string; label: string };
    metric3: { value: string; label: string };
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl?: string;
  };
  techStack: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialty: string;
  avatar: string;
  linkedIn?: string;
  github?: string;
  priorBackground: string;
}

export interface AuditFormData {
  industry: string;
  primaryBottleneck: string;
  currentErpStack: string[];
  weeklyManualHours: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}
