export interface Company {
  name: string;
  tagline: string;
  logo: string;
}

export interface About {
  title: string;
  text: string;
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

export interface Stats {
  projectsCompleted: number;
  happyClients: number;
  yearsExperience: number;
  teamSize: number;
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
  about: About;
  welcome: Welcome;
  services: Service[];
  team: TeamMember[];
  portfolio: Portfolio;
  beforeAfter: BeforeAfterItem[];
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

export interface ThemeConfig {
  colors: ColorScheme;
  fonts: {
    sans: string[];
    heading: string[];
  };
} 