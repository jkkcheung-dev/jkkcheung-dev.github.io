// Certifications.tsx (Compact Version)

import { Box, Typography, Link, List, ListItem, ListItemText } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import type { Resume } from '../types';

type CertificationsProps = {
    certifications?: Resume['certifications'];
};

export const Certifications = ({ certifications }: CertificationsProps) => {
    if (!certifications || Object.keys(certifications).length === 0) {
        return null;
    }

    return (
        <Box sx={{ my: 3 }}>
            <Typography
                variant="h4"
                gutterBottom
                color="primary.textColor2"
                sx={{ display: 'flex', gap: 1 }}
            >
                Certifications
            </Typography>


            <List disablePadding>
                {Object.entries(certifications).map(([name, url], idx, arr) => (
                    <ListItem
                        key={name}
                        disablePadding
                        sx={{
                            alignItems: 'flex-start',
                            width: 'fit-content',  // Only as wide as content
                            borderBottom: idx < arr.length - 1 ? 1 : 0,
                            borderColor: 'primary.textColor2',
                        }}
                    >
                        <ListItemText
                            primary={
                                <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="hover"
                                    color="primary.textColor1"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        fontWeight: 'medium'
                                    }}
                                >
                                    {name}
                                    <OpenInNew fontSize="small" />
                                </Link>
                            }
                            secondary="Verified on Credly"
                        />
                    </ListItem>
                ))}
            </List>

        </Box>
    );
};
