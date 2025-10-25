export interface Resume {
    name: string;
    title: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    about: string;
    education: Education;
    experiences: Experience[];
    skills: Record<string, string[]>;
    languages: Record<string, string[]>;
    certifications?: Record<string, string>;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    employmentType: string;
    highlights: string[];
}

export type Education = {
    school: string
    degree: string
    location: string
    period: string
}
// export interface Skills {
//     [category: string]: string[];
// }

// export interface Languages {
//     [category: string]: string[];
// }

// export interface Certifications {
//     [name: string]: string;
// }