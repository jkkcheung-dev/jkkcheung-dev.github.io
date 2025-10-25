// Experience.tsx

import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import { LocationOn, DateRange } from '@mui/icons-material';
import type { Experience as WorkExperience } from '@/types';

type ExperienceProps = {
    experiences: WorkExperience[];
};

export const Experience = ({ experiences }: ExperienceProps) => (
    <Box sx={{ my: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            Experience
        </Typography>

        {experiences.map((exp, idx) => (
            <Card key={idx} sx={{ mb: 3, boxShadow: 2 }}>
                <CardContent>
                    {/* Role Title */}
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {exp.role}
                    </Typography>

                    {/* Company Name */}
                    <Typography variant="subtitle1" fontWeight="medium">
                        {exp.company}
                    </Typography>

                    {/* Meta Information: Type, Period, Location */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 0.5, sm: 2 }}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        <Chip
                            label={exp.employmentType}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                            <DateRange fontSize="small" />
                            {exp.period}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                            <LocationOn fontSize="small" />
                            {exp.location}
                        </Typography>
                    </Stack>

                    {/* Highlights/Responsibilities */}
                    <Box sx={{ mt: 2 }}>
                        {exp.highlights.map((highlight, i) => (
                            <Typography
                                key={i}
                                variant="body2"
                                sx={{ mb: 1, pl: 2, position: 'relative' }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: '0.5em',
                                        width: 6,
                                        height: 6,
                                        bgcolor: 'primary.main',
                                        borderRadius: '50%'
                                    }}
                                />
                                {highlight}
                            </Typography>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        ))}
    </Box>
);

