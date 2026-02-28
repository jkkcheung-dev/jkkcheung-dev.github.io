export interface Resume {
    greetings: string;
    cantonName: string;
    cantonDesc: string;
    role: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    about: string[];
    education: Education;
    experiences: ExperienceItem[];
    skills: Record<string, string[]>;
    languages: Record<string, string[]>;
    certifications?: Record<string, string>;
}

export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    location: string;
    employmentType: string;
    highlights: string[];
}

export interface Education {
    school: string
    degree: string
    location: string
    period: string
}
