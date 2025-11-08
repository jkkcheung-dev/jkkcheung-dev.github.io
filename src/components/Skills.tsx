// Skills.tsx

import { Box, Typography, Chip, Stack } from '@mui/material';
import type { Resume } from '@/types';

type SkillsProps = {
    skills: Resume['skills'];
};

export const Skills = ({ skills }: SkillsProps) => (
    <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom color="primary.textColor2">
            Skills
        </Typography>

        {Object.entries(skills).map(([category, items]) => (
            <Box key={category}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary.textColor1"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                >
                    {category}
                </Typography>

                <Stack
                    direction="row" spacing={1.5} flexWrap="wrap" useFlexGap
                >
                    {items.map((skill, idx) => (
                        <Chip
                            key={idx}
                            label={skill}
                            size="medium"
                            sx={{
                                // Customize the outline (border) color
                                // borderColor: 'primary.textColor1',
                                // Customize the background color inside the outline (only visible on hover/focus if no bgcolor is set)
                                bgcolor: 'background.exphighlight',
                                // Customize the text color
                                color: 'text.secondary',
                                mb: 1,
                            }}
                        />
                    ))}
                </Stack>

            </Box>
        ))}
    </Box>
);
