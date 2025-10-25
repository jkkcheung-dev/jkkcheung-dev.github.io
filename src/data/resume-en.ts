import type { Resume } from '@/types';

export const resumeEN: Resume = {
    name: "Jack, Cheung Ka Kit",
    title: "Software Engineer",
    location: "HONG KONG",
    email: "jackcheungkk@gmail.com",
    github: "https://github.com/jkkcheung-dev",
    linkedin: "https://www.linkedin.com/in/jack-cheung-75a621149",
    about: "web developer with 7+ years of experience in back-end, 4+ years of full-stack development, cloud infrastructure, and DevOps practices. Skilled in frameworks like React and Spring Boot as well as tools like AWS, Kubernetes, GitHub Action. Passionate about building scalable, reliable applications and seeking to contribute to innovative tech solutions.",
    education: {
        school: "The University of Hong Kong",
        degree: "Bachelor of Engineering in Computer Science",
        location: "Hong Kong",
        period: "2013 - 2017"
    },
    experiences: [
        {
            company: "Government Public Dental Service",
            role: "Analyst Programmer",
            employmentType: "Secondment Contract",
            period: "2021 - Present",
            location: "Hong Kong",
            highlights: [
                "Developed and managed 3 out of 11 modules of critical patient record management system, supporting various patient records management and reports generation of about 6000 public dental service staff. Built the frontend using ReactJS and distributed backend with Spring boot Java, leveraging Redis caching and AWS services to enhance user experience",
                "Engaged with users to gather and analyze requirements, critically assessing their needs to distinguish essential changes from non-critical requests. Advised clients on necessary modifications while preventing over-complication on system architecture, then prioritized updates and implemented solutions, ensuring alignment with business goals, client satisfaction and technical stability",
                "Set up AWS EC2 instances to host containers instead of on-premise to greatly ease operational and admin overhead. Further evolved the dev and testing environment to EKS for high availability and auto scaling, diminishing infrastructure overhead. Also implemented CI/CD using GitHub Actions alongside the infra to automate building and deployment to target environment, ensuring a confident deployment, and saving the team's precious time",
                "Efficiently managed user-reported production issues by providing timely support, analyzing scenarios, and investigating logs from applications running on Kubernetes to troubleshoot and resolve problems",
                "Guided junior engineers in troubleshooting issues, writing code aligned with team coding style, and creating documentation, ensuring they understand team culture and relaying their feedback to managers  to foster growth and autonomy"
            ]
        },
        {
            company: "Orient Overseas Container Line Limited",
            role: "Assistant Technical Analyst",
            employmentType: "Full-time",
            period: "2019 - 2020",
            location: "Hong Kong",
            highlights: [
                "Contributed to migration of in-house shipping documents mapping system from legacy Tibco software to distributed Spring Boot services, reducing teams coordination overhead and improving components independent scalability",
                "Built microservices with best practice patterns such as service discovery, circuit breaker and external config to replace components of internal legacy systems. Adopted CI/CD pipelines to achieve quick and safe deployment. System maintainability and performance is improved",
                "Proposed adoption of standardized logging practices ( log framework & log format) to team members and log centralization for team troubleshooting efficiency, aiming for dropping a legacy solution with high overhead",
                "Set up ELK + Redis cluster infrastructure for log centralization from POC to on-prem production for more than 50 applications with over 90GB daily log size. Application reliability was greatly improved and time to handle production issues were drastically reduced by 60%, on average 120 mins per issue to  40 mins per issue",
                "Configured Prometheus and Grafana for real-time container monitoring and alerting, supporting operational staff and increasing efficiency"
            ]
        },
        {
            company: "IWT Solution",
            role: "Programmer",
            employmentType: "Full-time",
            period: "2017 - 2019",
            location: "Hong Kong",
            highlights: [
                "Designed and implemented RESTful API services using Java and Node.js to integrate with facial recognition algorithms, enabling secure enrollment of validated face images as templates with critical metadata. The system facilitated secure access and extracted facial characteristics for business analytics, enhancing operational insights and system security. The solution was processing over 10,000 face verifications daily",
                "Developed RESTful API server, from API documentation to full implementation, to enable communication between shopping mall car parking apps and parking systems, improving operational efficiency and enhancing user experience for mall patrons",
                "Led the development of a virtual reality (VR) fitness application from concept and hardware research to prototype, integrating a smart bicycle trainer with adjustable resistance and incline via API, alongside 360-degree panorama videos, using the Unity3D game engine. Delivered an innovative proof-of-concept for interactive fitness experiences."
            ]
        }
    ],
    skills: {
        "Programming Languages": ["JavaScript", "TypeScript", "Java", "Python", "Go", "Shell", "SQL"],
        "Frameworks": ["React", "Node.js", "Spring Boot"],
        "Storages": ["PostgreSQL", "MySQL", "Oracle SQL", "Kafka", "Redis"],
        "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Ansible"],
        "Other": ["Elasticsearch+Logstash+Kibana", "Prometheus", "Grafana"]
    },
    languages: {
        "Native": ["Cantonese"],
        "Buisiness": ["English", "Mandarin"],
        "Conversational": ["Japanese N2"]
    },
    certifications: {
        "Certified Kubernetes Administrator - CKA": "https://www.credly.com/badges/c17a77ef-f7ef-4bda-88b3-ec30d7192ebc/",
        "AWS Certified Solutions Architect – Professional": "https://www.credly.com/badges/2cef58e3-9eb1-4d4d-bfb4-99df9f3cd0b9/",
        "AWS Certified Developer – Associate": "https://www.credly.com/badges/10fbb3c8-3163-4c2e-ab04-8d2ee8b6767d/",
        "AWS Certified SysOps Administrator – Associate": "https://www.credly.com/badges/2add2378-b692-427c-bed8-4e52eca45caf/"
    }

};
