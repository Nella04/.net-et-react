import React from 'react';
import { Box, Typography } from '@mui/material';
import Tous from"./ListeArticles/Tous";
import CategorieArticle from "./ListeArticles/Categoriearticel";
import FiltreArticle from './ListeArticles/filtrearticle';
import Lesplusvendu from './ListeArticles/Lesplusvendu';
import MonLesplusvendu from './ListeArticles/MonLesplusvendu';
import Suggestion from './ListeArticles/Suggestion';

const ListeArticle = ({ activeView ,selectedCategory, searchTerm }) => {
  const renderView = () => {
    switch (activeView) {
      case 'tous':
        return <Tous/>;
      //eto ny catégorie
      case 'categorie':
        return (<CategorieArticle nomcategorie={selectedCategory}/>) ;
       case 'recherche':
        return (<FiltreArticle terme={searchTerm} />);
          
          // <>
          //   <Typography variant="h6" sx={{ mb: 2 }}>
          //     Résultats de recherche : "<strong>{searchTerm}</strong>"
          //   </Typography>
          //   {/* <ResultatsRecherche searchTerm={searchTerm} /> */}
          // </>
        
        // (<><p>{selectedCategory}</p></>);
      case 'date':
        return (<Lesplusvendu/>);
      case 'vente':
        return (<MonLesplusvendu/>);
      case 'suggestions':
        return (<Suggestion/>);
      default:
        return 'Liste de tous les articles aaaaaaaaaaaaaaaaaaaaaaaaaaaaVue inconnue';
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">{renderView()}</Typography>
    </Box>
  );
};

export default ListeArticle;
