import { Box, Typography, Stack } from '@mui/material';
import type { Education as TertiaryEducation } from '@/types';

type EducationProps = {
    education: TertiaryEducation;
};

export const Education = ({ education }: EducationProps) => {
    return (
        <Box sx={{ my: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                color="primary.textColor2"
                sx={{
                    mb: 1, textAlign: 'left',
                }}
            >
                Education
            </Typography>
            <Stack direction="column" spacing={1}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary.textColor1"
                >
                    {education.degree}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="primary.textColor3"
                >
                    {education.school} - {education.period}
                </Typography>
            </Stack>
        </Box>
    );
}