import { Box, Typography, IconButton, Stack } from '@mui/material';
import { GitHub, LinkedIn, Email, Language, LocationOn } from '@mui/icons-material';
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
                <Language /> {language === 'en' ? 'JP' : 'EN'}
            </IconButton>

            <Typography variant="h3" fontWeight="bold">{data.name}</Typography>
            <Typography variant="h6" color="text.secondary">
                {data.title}
                <LocationOn fontSize="small" sx={{ mx: 1 }} />
                {data.location}
            </Typography>
            <Typography variant="body1" color="text.secondary">{data.about}</Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <IconButton href={data.github} target="_blank"><GitHub /></IconButton>
                <IconButton href={data.linkedin} target="_blank"><LinkedIn /></IconButton>
                <IconButton href={`mailto:${data.email}`}><Email /></IconButton>
            </Stack>
        </Box>
    );
};
