// src/components/Sidebar.jsx
import React from 'react';
import { Box, Stack, TextField, InputAdornment, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import Tous from './sidebar/Tous';
import Categorie from './Sidebar/Categorie';
import TrierDate from './sidebar/TrierDate';
import TrierVente from './sidebar/TrierVente';
import Suggestions from './sidebar/Suggestions';

const Sidebar = ({ setActiveView, activeView , setSelectedCategory , selectedCategory ,searchTerm, onSearchChange}) => {
  return (
    <Box 
      sx={{
        position: { md: 'sticky' },  
        top: { md: '64px' },
        width: { xs: '100%', md: '250px' },
        height: 'calc(100vh - 98px)',
        bgcolor: '#6A0DAD',
        p: 2,
        borderRight: { md: '1px solid #ccc' },
        overflowY: 'auto',
      }}
    >
      <Stack spacing={2}>
        

        {/* Champ de recherche : Vendeur */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <TextField
            placeholder="Rechercher un vendeur"
            variant="outlined"
            fullWidth
              value={searchTerm}
             onChange={onSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6A0DAD' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: '#FFF8DC',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#FFD700',
                },
                '&:hover fieldset': {
                  borderColor: '#6A0DAD',
                },
              },
            }}
          />
        </motion.div>

        {/* Divider facultatif pour séparation */}
        <Divider sx={{ borderColor: '#FFF8DC' }} />

        {/* Liens de tri / catégories */}
        <Tous onClick={() => setActiveView('tous')} active={activeView === 'tous'} />
        <Categorie 
          onClick={(categoryName) => {
            setActiveView('categorie');
            setSelectedCategory(categoryName);
          }} 
          active={activeView === 'categorie'}
          selectedCategory={selectedCategory}
        />

        <TrierDate onClick={() => setActiveView('date')} active={activeView === 'date'} />
        <TrierVente onClick={() => setActiveView('vente')} active={activeView === 'vente'} />
        <Suggestions onClick={() => setActiveView('suggestions')} active={activeView === 'suggestions'} />
      </Stack>
    </Box>
  );
};

export default Sidebar;
