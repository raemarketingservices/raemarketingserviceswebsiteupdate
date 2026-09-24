export type ServiceId = 
  | 'diseno-web'
  | 'marketing-digital'
  | 'redes-sociales'
  | 'automatizacion'
  | 'diseno-grafico';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: ServiceId;
  orderNumber: string;
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  heroDescription: string;
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  features: string[];
  deliverables: ServiceFeature[];
  benefits: {
    title: string;
    description: string;
    iconName: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: ServiceFAQ[];
  icon: string;
  accentColor: string;
}

export type ProjectCategory = 'Todos' | 'Web Design' | 'Social Media' | 'Branding' | 'Marketing' | 'Automation';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Design' | 'Social Media' | 'Branding' | 'Marketing' | 'Automation';
  tagline: string;
  client: string;
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  resultsHeadline: string;
  servicesProvided: string[];
  gradient?: string;
  imageBg: string;
  accentBadge: string;
  visible?: boolean;
}
