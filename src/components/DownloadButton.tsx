// DownloadButton.tsx

import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DescriptionIcon from '@mui/icons-material/Description';

const DOCUMENTS = [
    {
        label: 'English Resume',
        url: 'https://docs.google.com/document/d/1zsmKRDbtOGP42R8e8Vsk2p2Q5HDsS4CQZUlJQUGlQcs/export?format=pdf',
    },
    {
        label: '職務経歴書',
        url: 'https://docs.google.com/document/d/1XXnwUOyEIqvOrmHBHXJ4M4o2BLiqSfre/export?format=pdf',
    },
    {
        label: '履歴書',
        url: 'https://docs.google.com/spreadsheets/d/1cvJtRNkSL6yiKTFhXL8Mo2p7S1LmQABt/export?format=pdf&size=A3&portrait=false&scale=3',
    },
] as const;

export const DownloadButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? 'download-menu' : undefined}
                startIcon={<FileDownloadIcon />}
                onClick={handleOpen}
                sx={{
                    px: 2,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 2,
                    border: 2,
                    borderColor: 'primary.main',
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        border: 2,
                        borderColor: 'primary.main',
                    },
                }}
            >
                CV/職務経歴書
            </Button>
            <Menu
                id="download-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { mt: 1 } } }}
            >
                {DOCUMENTS.map(({ label, url }) => (
                    <MenuItem
                        key={label}
                        component="a"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                    >
                        <ListItemIcon>
                            <DescriptionIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
