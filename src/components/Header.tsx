import { Box, Typography, IconButton, Stack } from '@mui/material';
import { GitHub, LinkedIn, Email, LocationOn } from '@mui/icons-material';
import { useContext } from 'react';
import { LanguageContext } from '@/App';
import type { Resume } from '@/types';

type HeaderProps = {
    data: Resume;
};

export const Header = ({ data }: HeaderProps) => {
    const { language, toggleLanguage } = useContext(LanguageContext);

    return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
            <IconButton onClick={toggleLanguage} sx={{ position: 'absolute', top: 10, right: 10 }}>
                {language === 'en' ? 'JP' : 'EN'}
            </IconButton>

            <Typography variant="h3" fontWeight="bold" color="primary.textColor1" sx={{ fontFamily: 'Indie Flower', "font-weight": 400, textAlign: 'left', }}>
                {data.greetings}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, textAlign: 'left', fontFamily: 'dynapuff', }}>
                {data.role}
                <LocationOn fontSize="small" sx={{ mx: 1 }} />
                {data.location}
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 3 }}>
                {data.about.map((lines, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                        color="primary.chipBorderColor1"
                        sx={{
                            lineHeight: 1.7,
                            textAlign: 'left',
                            fontFamily: 'dynapuff', fontSize: '1.1em',
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
