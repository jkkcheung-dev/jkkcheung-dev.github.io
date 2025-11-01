// Experience.tsx

import { Box, Typography, Card, CardContent, Chip, Stack, useTheme, useMediaQuery, Paper } from '@mui/material';
import { LocationOn, DateRange } from '@mui/icons-material';
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
                variant="h5"
                gutterBottom
                sx={{ mb: 2, fontWeight: 600, textAlign: 'left' }}
            >
                Experience
            </Typography>

            <Timeline position="right">
                {experiences.map((exp, idx) => (
                    <TimelineItem key={idx}>
                        {/* Always render but hide below md screen size*/}
                        <TimelineOppositeContent
                            sx={{
                                m: 'auto 0',
                                py: '10px',
                                px: 1,
                                maxWidth: '170px',  // Limit maximum width
                                ...(isMobile && { display: 'none' })
                            }}
                        >
                            <Stack
                                direction="column"
                                spacing={1}
                                sx={{ mt: 1, mb: 2 }}
                            >

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignSelf: 'center', gap: 0.5, fontSize: '1rem' }}
                                >
                                    {/* <DateRange fontSize="small" /> */}
                                    {exp.period}
                                </Typography>

                                <Chip
                                    label={exp.employmentType}
                                    size="small"
                                    variant="outlined"
                                    sx={{ alignSelf: 'flex-start' }}
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                    <LocationOn fontSize="small" />
                                    {exp.location}
                                </Typography>
                            </Stack>
                        </TimelineOppositeContent>


                        <TimelineSeparator>
                            <TimelineConnector sx={{ bgcolor: 'primary.main', width: 3 }} />
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

                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    backgroundColor: 'background.paper',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        elevation: 6,
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[8],
                                    },
                                }}
                            >
                                {/* Role Title */}
                                <Typography
                                    variant="h6"
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
                                    direction="column"
                                    spacing={1}
                                    sx={{
                                        mt: 1, mb: 2,
                                        ...(!isMobile && { display: 'none' })
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                    >
                                        {/* <DateRange fontSize="small" /> */}
                                        {exp.period}
                                    </Typography>

                                    <Chip
                                        label={exp.employmentType}
                                        size="small"
                                        variant="outlined"
                                        sx={{ alignSelf: 'flex-start' }}
                                    />

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
                                    <Stack spacing={1}>
                                        {exp.highlights.map((highlight, i) => (
                                            <Chip
                                                key={i}
                                                label={highlight}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    height: 'auto',
                                                    py: 1,
                                                    '& .MuiChip-label': {
                                                        display: 'block',
                                                        whiteSpace: 'normal',
                                                        textAlign: 'left',
                                                    },
                                                }}
                                            />
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

