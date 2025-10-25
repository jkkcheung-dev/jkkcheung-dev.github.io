// Skills.tsx

import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import type { Resume } from '@/types';

type SkillsProps = {
    skills: Resume['skills'];
};

export const Skills = ({ skills }: SkillsProps) => (
    <Box sx={{ my: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Skills
        </Typography>

        {Object.entries(skills).map(([category, items]) => (
            <Card key={category} sx={{ mb: 1, boxShadow: 5 }}>
                <CardContent>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                        sx={{ mb: 0 }}
                    >
                        {category}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        {items.map((skill, idx) => (
                            <Chip
                                key={idx}
                                label={skill}
                                size="medium"
                                sx={{ mb: 0 }}
                            />
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        ))}
    </Box>
);
