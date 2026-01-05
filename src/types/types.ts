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