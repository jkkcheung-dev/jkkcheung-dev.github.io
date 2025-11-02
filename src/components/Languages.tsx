// Languages.tsx

import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material';
import type { Resume } from '../types';

type LanguagesProps = {
    languages: Resume['languages'];
};

// Color mapping for proficiency levels
const getProficiencyColor = (idx: number): "success" | "primary" | "secondary" => {
    switch (idx) {
        case 0:
            return "success";
        case 1:
            return "primary";
        case 2:
            return "secondary";
        default:
            return "secondary";
    }
};

export const Languages = ({ languages }: LanguagesProps) => (
    <Box sx={{ my: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Languages
        </Typography>

        <Card sx={{ boxShadow: 2 }}>
            <CardContent>
                <Stack spacing={2}>
                    {Object.entries(languages).map(([level, langs], levelIndex) => (
                        <Box key={level}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                                sx={{ mb: 1 }}
                            >
                                {level}
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {langs.map((lang, idx) => (
                                    <Chip
                                        key={idx}
                                        label={lang}
                                        color={getProficiencyColor(levelIndex)}
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    </Box>
);
