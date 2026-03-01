import { Box, Typography, Stack, Paper, useTheme } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import type { ExperienceItem } from '@/types';

type ExperienceCardProps = {
    exp: ExperienceItem;
    isMobile: boolean;
};

export const ExperienceCard = ({ exp, isMobile }: ExperienceCardProps) => {
    const theme = useTheme();
    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                backgroundColor: 'background.paper',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    elevation: 6,
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[15],
                },
                borderRadius: 5,
            }}
        >
            <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                {exp.role}
            </Typography>

            <Typography variant="subtitle1" color="primary.main" fontWeight={500} gutterBottom>
                {exp.company}
            </Typography>

            {/* Mobile-only meta row: hidden above md breakpoint */}
            <Stack
                direction="row" spacing={1}
                sx={{ ...(!isMobile && { display: 'none' }) }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}
                >
                    {exp.period} | {exp.employmentType}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem' }}
                >
                    <LocationOn fontSize="small" />
                    {exp.location}
                </Typography>
            </Stack>

            {/* Highlights */}
            <Box sx={{ mt: 2 }}>
                <Stack spacing={1}>
                    {exp.highlights.map((highlight, i) => (
                        <Box
                            key={i}
                            sx={{
                                px: 1.5,
                                py: 1,
                                bgcolor: i % 2 === 0 ? 'background.exphighlight' : 'transparent',
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                                {highlight}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Paper>
    );
};
