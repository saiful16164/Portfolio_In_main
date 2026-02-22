// ===== TYPE DEFINITIONS =====
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink?: string;
  image: string;
  status: "Completed" | "Ongoing";
  featured: boolean;
  tags: string[];
  features: string[];
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  publicationName: string;
  pdfLink?: string;
  doiLink?: string;
  status: "Published" | "Under Review" | "In Progress";
}

export interface Skill {
  id: string;
  name: string;
  category: "Programming Languages" | "Technologies" | "Tools";
  proficiency: number;
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "Competition" | "Hackathon" | "Award" | "Certification";
  date?: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: "Published" | "Draft";
  createdAt: string;
  readTime: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  profileImage: string;
  resumeLink: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  education: {
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }[];
  careerGoals: string;
  technicalInterests: string[];
  personalStory: string;
}

// ===== PERSONAL INFO (edit this directly or manage via admin settings) =====

export const personalInfo: PersonalInfo = {
  name: "Saiful Islam",
  title: "CSE Undergraduate • Developer • Problem Solver",
  bio: "Passionate Computer Science & Engineering student with a knack for building elegant solutions to complex problems. I specialize in mobile development with Flutter, explore AI/ML, and love competitive programming.",
  email: "saiful1616.islam@gmail.com",
  phone: "+880 1707-224860",
  location: "Bangladesh",
  profileImage: "/profile.jpg",
  resumeLink: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/saiful16164",
    linkedin: "https://www.linkedin.com/in/saiful1616/",
  },
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Sylhet Engineering College",
      year: "2022 – Present",
      details: "Focusing on software engineering, algorithms, and AI/ML coursework.",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "BAF Shaheen College, Shamshernagar",
      year: "2020 – 2022",
      details: "Science group with distinction.",
    },
  ],
  careerGoals:
    "My goal is to become a skilled software engineer capable of building impactful, scalable products. I'm particularly drawn to mobile development, AI-driven applications, and open-source contribution.",
  technicalInterests: [
    "Mobile App Development (Flutter)",
    "Artificial Intelligence & Machine Learning",
    "Competitive Programming",
    "System Design",
    "Open Source",
  ],
  personalStory:
    "I started coding in my freshman year and immediately fell in love with the problem-solving aspect of computer science. From building simple console apps to developing full-stack mobile applications, every project has taught me something new. When I'm not coding, you'll find me solving problems on Codeforces or exploring the latest in AI research.",
};

// ===== HELPER DATA =====
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const projectCategories = [
  "All", "Web", "Mobile", "AI", "Backend", "CLI", "Flutter",
];
