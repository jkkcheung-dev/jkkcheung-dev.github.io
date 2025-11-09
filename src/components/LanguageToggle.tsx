// LanguageToggle.tsx

import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from '@/App';

export const LanguageToggle = () => {
    const { language, toggleLanguage } = useContext(LanguageContext);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 14,
                right: 14,
                display: 'flex',
                border: 2,
                borderColor: 'primary.main',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                transform: 'scale(0.8)',  // 20% larger
                transformOrigin: 'top right',  // Scale from top-right corner (stays anchored)
            }}
        >
            {/* EN Button */}
            <Button
                onClick={() => language !== 'en' && toggleLanguage()}
                sx={{
                    px: 2,
                    py: 0.5,
                    minWidth: 50,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 0,
                    border: 'none',
                    bgcolor: language === 'en' ? 'primary.main' : 'transparent',
                    color: language === 'en' ? 'white' : 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: language === 'en'
                            ? 'primary.main'
                            : 'primary.dark',
                        border: 'none',
                    },
                }}
            >
                EN
            </Button>

            {/* JP Button */}
            <Button
                onClick={() => language !== 'jp' && toggleLanguage()}
                sx={{
                    px: 2,
                    py: 0.5,
                    minWidth: 50,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 0,
                    border: 'none',
                    bgcolor: language === 'jp' ? 'primary.main' : 'transparent',
                    color: language === 'jp' ? 'white' : 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: language === 'jp'
                            ? 'primary.main'
                            : 'primary.dark',
                        border: 'none',
                    },
                }}
            >
                JP
            </Button>
        </Box>
    );
};
