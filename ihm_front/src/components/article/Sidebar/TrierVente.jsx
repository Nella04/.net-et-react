import React from 'react';
import { Button } from '@mui/material';

const TrierVente = ({ onClick, active }) => (
  <Button
    fullWidth
    variant={active ? 'contained' : 'outlined'}
    onClick={onClick}
    sx={{
        backgroundColor: active ? '#FFD700' : '#FFF8DC', 
        color: active ? '#6A0DAD' : '#6A0DAD', 
        '&:hover': {
        backgroundColor: '#FFD700', 
        color: '#6A0DAD' 
        }
    }}
  >
    Mes articles
  </Button>
);

export default TrierVente;
