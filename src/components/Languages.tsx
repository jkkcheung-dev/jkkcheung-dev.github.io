import type { Resume } from '@/types';
import { ChipGroup } from './ChipGroup';

type LanguagesProps = {
    languages: Resume['languages'];
};

export const Languages = ({ languages }: LanguagesProps) => (
    <ChipGroup heading="Languages" groups={languages} />
);
