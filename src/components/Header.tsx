import { Box, Typography, IconButton, Stack } from '@mui/material';
import { GitHub, LinkedIn, Email, LocationOn } from '@mui/icons-material';
import type { Resume } from '@/types';
import { LanguageToggle } from './LanguageToggle';  // Add this import
import { useContext } from 'react';
import { LanguageContext } from '@/App';

type HeaderProps = {
    data: Resume;
};

export const Header = ({ data }: HeaderProps) => {
    const { language } = useContext(LanguageContext);
    return (
        <Box sx={{ py: 4, }}>
            <LanguageToggle />

            <Typography
                variant="h3" fontWeight="bold" color="primary.textColor1"
                sx={{
                    mt: 2,
                    fontFamily: 'Indie Flower',
                    fontSize: language == 'jp' ? '2.3rem' : '2.7rem',
                }}>
                {data.greetings}
            </Typography>
            <Typography
                variant="h6"
                sx={{ mt: 2, fontFamily: 'dynapuff', fontSize: '1.1em' }}>
                {data.role}
                <LocationOn fontSize="small" sx={{ mx: 1 }} />
                {data.location}
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 3 }}>
                {data.about.map((lines, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                        color="primary.textColor3"
                        sx={{
                            lineHeight: 1.7,
                            fontFamily: 'dynapuff', fontSize: '1.05em',
                        }}
                    >
                        {lines}
                    </Typography>
                ))}
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <IconButton href={data.github} target="_blank"><GitHub /></IconButton>
                <IconButton href={data.linkedin} target="_blank"><LinkedIn /></IconButton>
                <IconButton href={`mailto:${data.email}`}><Email /></IconButton>
            </Stack>
        </Box >
    );
};
