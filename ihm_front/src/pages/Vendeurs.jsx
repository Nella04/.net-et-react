// import React from "react";
// import { motion } from "framer-motion";
// import "./Accueil.css";

// export default function Vendeurs() {
//     return (
//       <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <h2 className="title">Liste des vendeurs</h2>
//         <p className="text">Les vendeurs seront affichés ici prochainement.</p>
//       </motion.div>
//     );
//   }



import React, { useState } from 'react';
import { Box, Grid, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import Sidebar from '../components/article/Sidebar';
// import ListeArticles from '../components/article/ListeArticles';
import Sidebar from '../components/vendeurs/Sidebar';
import ListeArticles from '../components/vendeurs/ListeArticles';

const Vendeurs = () => {
  const [activeView, setActiveView] = useState('tous');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');




  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
  setActiveView("recherche");
};


  const handleItemClick = (view) => {
    setActiveView(view);
    setMobileOpen(false); // Fermer le Drawer sur mobile après clic
  };

  return (
    <Box>
      {/* Icône hamburger visible sur mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none'  }, position: 'fixed', top: 10, left: 10, zIndex: 1300 ,mt: { xs: '56px', md: '64px' } }}>
        <IconButton onClick={toggleDrawer} sx={{ color: '#6A0DAD', bgcolor: '#FFF8DC' }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Sidebar Drawer mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: '#6A0DAD',
            color: 'white',
            marginTop: '59px', 
          },
          
        }}
      >
        <Sidebar setActiveView={handleItemClick} activeView={activeView} setSelectedCategory={setSelectedCategory} 
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
           onSearchChange={handleSearchChange}
        />
      </Drawer>


        <Box display="flex" height="100vh" >
          {/* Sidebar fixe à gauche */}
          <Box width={{ xs: '100%', md: 300 }}   
          sx={{
              flexShrink: 0,
              bgcolor: '#f5f5f5',
              display: { xs: 'none', md: 'block' }, // takonana 
              mt: { xs: '56px', md: '64px' }
            }}
          >
            {/* <Sidebar /> */}
            <Sidebar setActiveView={handleItemClick} activeView={activeView}setSelectedCategory={setSelectedCategory} 
            selectedCategory={selectedCategory} 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />

          </Box>

          {/* Contenu principal, occupe le reste */}
          <Box flex={1} overflow="auto" sx={{ mt: { xs: '56px', md: '40px' } }}>
            <ListeArticles activeView={activeView} selectedCategory={selectedCategory}  searchTerm={searchTerm}/>
          </Box>
        </Box>

    </Box>
  );
};

export default Vendeurs;
