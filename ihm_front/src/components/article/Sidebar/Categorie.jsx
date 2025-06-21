// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Stack } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const Categorie = ({ onClick, active, selectedCategory }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get('https://localhost:7091/api/Articles')
//       .then(response => {
//         const uniqueCategories = [
//           ...new Set(response.data.map(article => article.categorie))
//         ];
//         setCategories(uniqueCategories);
//       })
//       .catch(error => {
//         console.error("Erreur lors de la récupération des catégories :", error);
//       });
//   }, []);

//   const categoriesvue = [
//   {value: "electronique", nom: "Électronique & High-Tech"},
//   {value: "mode", nom: "Mode & Accessoires"},
//   {value: "maison", nom: "Maison & Électroménager"},
//   {value: "beaute", nom: "Beauté & Bien-être"},
//   {value: "autre", nom: "Autres"},
// ];


//   return (
//     <Accordion defaultExpanded sx={{ bgcolor: '#FFF8DC' }}>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
//         <Typography sx={{ color: '#6A0DAD', fontWeight: 'bold' }}>Catégories</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Stack spacing={1}>
//           {categories.map((cat, index) => {
//             const isActive = active && selectedCategory === cat;

//             return (
//               <Button
//                 key={index}
//                 fullWidth
//                 variant={isActive ? 'contained' : 'outlined'}
//                 onClick={() => onClick(cat)}
//                 sx={{
//                   textTransform: 'capitalize',
//                   backgroundColor: isActive ? '#FFD700' : '#FFF8DC',
//                   color: '#6A0DAD',
//                   '&:hover': {
//                     backgroundColor: '#FFD700',
//                     color: '#6A0DAD',
//                   }
//                 }}
//               >
//                 {cat}
//               </Button>
//             );
//           })}
//         </Stack>
//       </AccordionDetails>
//     </Accordion>
//   );
// };


// export default Categorie;
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Categorie = ({ onClick, active, selectedCategory }) => {
  const categoriesvue = [
    { value: "electronique", nom: "Électronique & High-Tech" },
    { value: "mode", nom: "Mode & Accessoires" },
    { value: "maison", nom: "Maison & Électroménager" },
    { value: "beaute", nom: "Beauté & Bien-être" },
    { value: "autre", nom: "Autres" },
  ];

  return (
    <Accordion defaultExpanded sx={{ bgcolor: '#FFF8DC' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
        <Typography sx={{ color: '#6A0DAD', fontWeight: 'bold' }}>Catégories</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {categoriesvue.map((cat, index) => {
            const isActive = active && selectedCategory === cat.value;

            return (
              <Button
                key={index}
                fullWidth
                variant={isActive ? 'contained' : 'outlined'}
                onClick={() => onClick(cat.value)}
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: isActive ? '#FFD700' : '#FFF8DC',
                  color: '#6A0DAD',
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#6A0DAD',
                  }
                }}
              >
                {cat.nom}
              </Button>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Categorie;
