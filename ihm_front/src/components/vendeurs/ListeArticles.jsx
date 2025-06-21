import React from 'react';
import { Box, Typography } from '@mui/material';
import Tous from"./ListeArticles/Tous";
import FiltreVendeur from './ListeArticles/FiltreVendeur';
import VendeurCategori from './ListeArticles/VendeurCategori';
import Suggestion from './ListeArticles/Suggestion';
import TopVendeur from './ListeArticles/TopVendeur';
import MonVendeur from './ListeArticles/MonVendeur';

const ListeArticle = ({ activeView ,selectedCategory,searchTerm }) => {
  const renderView = () => {
    switch (activeView) {
      case 'tous':
        return <Tous/>;
      case 'recherche':
        return (<FiltreVendeur terme={searchTerm}/>
          // <>
          //   <Typography variant="h6" sx={{ mb: 2 }}>
          //     Résultats de recherche : "<strong>{searchTerm}</strong>"
          //   </Typography>
          //   {/* <ResultatsRecherche searchTerm={searchTerm} /> */}
          // </>
        );
      //eto ny catégorie
      case 'categorie': return(<VendeurCategori terme={selectedCategory}/>);
//         return           <>
//         <Typography variant="h6">
//           Liste de tous les articles dans <strong>{selectedCategory}</strong>
//         </Typography>
//         <Box mt={2}>
//           <Typography variant="body1">Catégorie : {selectedCategory}</Typography>
//           {/* Tu peux afficher ici les articles filtrés par catégorie */}
//         </Box>
//       </>
// ;
      case 'date':
        return (<TopVendeur/>);
      case 'vente':
        return (<MonVendeur/>);
      case 'suggestions':
        return <Suggestion/>;
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
