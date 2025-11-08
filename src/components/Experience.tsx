// Experience.tsx

import { Box, Typography, Stack, useTheme, useMediaQuery, Paper } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from '@mui/lab';
import type { Experience as WorkExperience } from '@/types';

type ExperienceProps = {
    experiences: WorkExperience[];
};

export const Experience = ({ experiences }: ExperienceProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{ my: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                color="primary.textColor2"
                sx={{
                    mb: 2, textAlign: 'left',
                    // ...(isMobile && { display: 'none' })
                }}
            >
                Experience
            </Typography>

            <Timeline position="right" sx={{ ...(isMobile && { px: 0 }) }}>
                {experiences.map((exp, idx) => (
                    <TimelineItem key={idx}>
                        {/* Always render but hide below md screen size*/}
                        <TimelineOppositeContent
                            sx={{
                                m: '0',
                                py: '10px',
                                px: 1,
                                maxWidth: '190px',  // Limit maximum width
                                ...(isMobile && { display: 'none' })
                            }}
                        >
                            <Stack
                                direction="column" spacing={1} alignItems="flex-end"
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '1em' }}
                                >
                                    {/* <DateRange fontSize="small" /> */}
                                    {exp.period}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '1em' }}
                                >
                                    {exp.employmentType}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.9em' }}
                                >
                                    <LocationOn fontSize="small" />
                                    {exp.location}
                                </Typography>
                            </Stack>
                        </TimelineOppositeContent>


                        <TimelineSeparator>
                            <TimelineConnector sx={{ bgcolor: 'primary.main', width: 3, flex: 0 }} />
                            <TimelineDot
                                variant="outlined"
                                sx={{
                                    borderWidth: 3,
                                    borderColor: 'primary.main',
                                    bgcolor: 'background.paper',
                                    width: 16,
                                    height: 16,
                                    my: 1.5,
                                }}
                            />
                            <TimelineConnector sx={{ bgcolor: 'primary.main', width: 3 }} />
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', ...(isMobile ? { px: 1 } : { px: 2 }) }}>
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
                                {/* Role Title */}
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    {exp.role}
                                </Typography>

                                {/* Company Name */}
                                <Typography
                                    variant="subtitle1"
                                    color="primary.main"
                                    fontWeight={500}
                                    gutterBottom
                                >
                                    {exp.company}
                                </Typography>

                                {/* Always render but hide when above md screen size*/}
                                <Stack
                                    direction="row" spacing={1}
                                    sx={{
                                        ...(!isMobile && { display: 'none' })
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}
                                    >
                                        {/* <DateRange fontSize="small" /> */}
                                        {exp.period} | {exp.employmentType}
                                    </Typography>
                                    {/* 
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.875rem' }}
                                    >
                                        {exp.employmentType} |
                                    </Typography> */}

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem' }}
                                    >
                                        <LocationOn fontSize="small" />
                                        {exp.location}
                                    </Typography>
                                </Stack>

                                {/* Highlights/Responsibilities */}
                                <Box sx={{ mt: 2, }}>
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
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
};

