import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const CommandeFilterIcons = ({ filterEtat, setFilterEtat }) => {
  const filters = [
    {
      label: 'Tous',
      value: 'Tous',
      icon: <PlaylistAddCheckIcon sx={{ color: '#1976d2' }} />, // bleu
    },
    {
      label: 'Validée',
      value: 'Validée',
      icon: <CheckCircleIcon sx={{ color: '#2e7d32' }} />, // vert
    },
    {
      label: 'Rejetée',
      value: 'Rejetée',
      icon: <CancelIcon sx={{ color: '#d32f2f' }} />, // rouge
    },
    {
      label: 'En attente',
      value: 'En attente',
      icon: <HourglassTopIcon sx={{ color: '#ed6c02' }} />, // orange
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
      {filters.map(({ label, value, icon }) => {
        const isActive = filterEtat === value;
        return (
          <Stack
            key={value}
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              px: 2,
              py: 1,
              backgroundColor: isActive ? '#f0f0f0' : 'transparent',
              border: isActive ? '2px solid #1976d2' : '1px solid #ccc',
              transition: 'all 0.2s ease-in-out',
            }}
            onClick={() => setFilterEtat(value)}
          >
            {icon}
            <Typography variant="body2" fontWeight={isActive ? 'bold' : 'normal'}>
              {label}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
};

export default CommandeFilterIcons;