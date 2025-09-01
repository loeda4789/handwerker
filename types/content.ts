export interface Company {
  name: string;
  tagline: string;
  logo: string;
}

export interface HeroBackgroundImages {
  desktop: string;
  mobile: string;
  desktopAlt: string;
  mobileAlt: string;
}

export interface Hero {
  title?: string;
  subtitle?: string;
  type?: 'single' | 'slider' | '3d' | 'split';
  backgroundImages: HeroBackgroundImages;
}

export interface About {
  title: string;
  text: string;
  image?: string;
}

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export interface Welcome {
  headline: string;
  subline: string;
  features: Feature[];
}

export interface ProjectStep {
  number: number;
  title: string;
  description: string;
}

export interface ProjectProcess {
  title: string;
  subtitle: string;
  steps: ProjectStep[];
}

export interface ServiceProject {
  title: string;
  image: string;
  description: string;
}

export interface Service {
  title: string;
  icon: string;
  description: string;
  image?: string;
  projects?: ServiceProject[];
}

export interface TeamMember {
  name: string;
  position: string;
  photo: string;
  specialization: string;
}

export interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface BeforeAfterItem {
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface Portfolio {
  title: string;
  subtitle: string;
  projects: Project[];
}

export interface Testimonial {
  name: string;
  text: string;
}

export interface Socials {
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
}

export interface Reviews {
  google?: string;
}

export interface StatItem {
  number: number;
  label: string;
  suffix: string;
  duration: number;
  decimal?: boolean;
}

export interface Stats {
  projectsCompleted: number;
  happyClients: number;
  yearsExperience: number;
  teamSize: number;
  projectsPerYear: number;
  starRating: number;
  customStats: StatItem[];
}

export interface Contact {
  address: string;
  phone: string;
  email: string;
  openingHours: string;
}

export interface Meta {
  language: string;
  generator: string;
  lastUpdated: string;
}

export interface ContentData {
  company: Company;
  hero: Hero;
  about: About;
  welcome: Welcome;
  projectProcess: ProjectProcess;
  services: Service[];
  team: TeamMember[];
  portfolio: Portfolio;
  beforeAfter: BeforeAfterItem[];
  faq: FAQ[];
  testimonials: Testimonial[];
  socials: Socials;
  reviews: Reviews;
  stats: Stats;
  contact: Contact;
  meta: Meta;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  dark: string;
  darkSecondary: string;
  light: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ThemeConfig {
  colors: ColorScheme;
  fonts: {
    sans: string[];
    heading: string[];
  };
} 
