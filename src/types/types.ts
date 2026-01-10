export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  images: string[]; 
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  skills: string[];
}