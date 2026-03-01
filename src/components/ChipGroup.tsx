import { Box, Typography, Chip, Stack } from '@mui/material';

type ChipGroupProps = {
    heading: string;
    groups: Record<string, string[]>;
    chipSpacing?: number;
    chipMb?: number;
};

export const ChipGroup = ({ heading, groups, chipSpacing = 1, chipMb = 1 }: ChipGroupProps) => (
    <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom color="primary.textColor2">
            {heading}
        </Typography>

        {Object.entries(groups).map(([category, items]) => (
            <Box key={category}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary.textColor1"
                    gutterBottom
                    sx={{ mb: 0.5 }}
                >
                    {category}
                </Typography>

                <Stack direction="row" spacing={chipSpacing} flexWrap="wrap" useFlexGap>
                    {items.map((item, idx) => (
                        <Chip
                            key={idx}
                            label={item}
                            size="medium"
                            sx={{
                                bgcolor: 'background.exphighlight',
                                color: 'text.secondary',
                                mb: chipMb,
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        ))}
    </Box>
);
