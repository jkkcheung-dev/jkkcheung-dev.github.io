import type { Resume } from '@/types';
import { ChipGroup } from './ChipGroup';

type SkillsProps = {
    skills: Resume['skills'];
};

export const Skills = ({ skills }: SkillsProps) => (
    <ChipGroup heading="Skills" groups={skills} chipSpacing={1.5} chipMb={0.5} />
);
