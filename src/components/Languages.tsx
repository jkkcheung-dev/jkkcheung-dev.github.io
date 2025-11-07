// Languages.tsx

import { Box, Typography, Chip, Stack } from '@mui/material';
import type { Resume } from '../types';

type LanguagesProps = {
    languages: Resume['languages'];
};

export const Languages = ({ languages }: LanguagesProps) => (
    <Box sx={{ my: 4 }}>
        <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="primary.textColor2"
        >
            Languages
        </Typography>

        {Object.entries(languages).map(([level, langs], levelIndex) => (
            <Box key={level}>
                <Typography
                    fontWeight="bold"
                    variant="subtitle1"
                    color="primary.textColor1"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                >
                    {level}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {langs.map((lang, idx) => (
                        <Chip
                            key={idx}
                            label={lang}
                            size="medium"
                            // variant="outlined"
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
