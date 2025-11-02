// Certifications.tsx (Compact Version)

import { Box, Typography, Card, CardContent, Link, List, ListItem, ListItemText } from '@mui/material';
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
        <Box sx={{ my: 4 }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
                Certifications
            </Typography>

            <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                    <List disablePadding>
                        {Object.entries(certifications).map(([name, url], idx, arr) => (
                            <ListItem
                                key={name}
                                disablePadding
                                sx={{
                                    py: 0.8,
                                    borderBottom: idx < arr.length - 1 ? 1 : 0,
                                    borderColor: 'divider'
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Link
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            underline="hover"
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
                </CardContent>
            </Card>
        </Box>
    );
};
