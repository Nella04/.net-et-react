import React, {useEffect,useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Divider,
  Stack,
  Pagination,
  useMediaQuery,
  Grow
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Commandeacheteur from './Commande';
import FancyLoader from '../../FancyLoader';
//import poketregris from './image/poketra.jpg';
import CheckAcheteurGuard from '../../session/CheckacheteurGuard';
import tronquerText from './TronquerText';


const Lesplusvendu = () => {
  const [articles, setArticles] = useState([]);
  const [vendeurs, setVendeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingVendeurs, setLoadingVendeurs] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = isMobile ? 3 : 6;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const handleOpen = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  // const getVendeur = (id) => vendeurs.find(v => v.id_vendeur === id);
  
  const getVendeur = (id) => vendeurs.find(v => v.idPersonne === id);

  

  useEffect(() => {
    axios.get('https://localhost:7091/api/Articles/MieuxVendu')
      .then(response => {
        setArticles(response.data);
        setLoading(false);
        //console.log(response);
      })
      .catch(error => {
        setErreur(error.message);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    axios.get('https://localhost:7091/api/Vendeurs')
      .then(response => {
        setVendeurs(response.data);
        setLoadingVendeurs(false);
        //console.log(response);
      })
      .catch(error => {
        console.error('Erreur vendeurs:', error);
        setLoadingVendeurs(false);
      });
  }, []);


  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedArticles = articles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // if (loading) return <p>Chargement des articles...</p>;
  if (loading || loadingVendeurs) return (<FancyLoader/>);
  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    
    <Box sx={{ pt: 1.5, pb: 1, px: 8}}>
      
      <Grid container spacing={1}>
        {/* {paginatedArticles.map((article, index) => (
          <Grow in={true} key={index} timeout={500 + index * 100}> */}
          {paginatedArticles.map((article) => (
  <Grow in={true} key={article.codeBar} >
            <Grid item xs={12}>
              <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, bgcolor: '#FFF8DC', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${article.image}`}
                  alt={article.nomArticle}
                  sx={{ width: { sm: 180 }, height: 180, objectFit: 'cover' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ pb: 0.2 }}>
                    <Typography variant="h6" color="#6A0DAD">{article.nomArticle}-{article.codeBar}</Typography>
                    <Typography variant="body2">{tronquerText(article.description)}</Typography>
                    <Typography variant="body2">categorie:{article.categorie}</Typography>
                    <Typography variant="body2" color="text.secondary">Marque : {article.marque}</Typography>
                    <Typography variant="body1" color="#FFD700">Prix : {article.prix} Ar</Typography>
                    {/* <Typography variant="body1" color="#FFD700">Prix : {article.codeBar} Ar</Typography> */}
                    {/* <Typography variant="body1" color="#FFD700">Prix : {article.vendeurId} Ar</Typography> */}
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb:1, gap: 2 }}>
                    <Button variant="outlined" color="secondary" onClick={() => handleOpen(article)}>
                      détails
                    </Button>
                    <Commandeacheteur vendeur={article.vendeurId} codebar={article.codeBar} key={`commande-${article.codeBar}`} />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color= "#6A0DAD"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: '60%' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            backdropFilter: 'blur(5px)',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
              <CloseIcon />
            </IconButton>
            {selectedArticle && (
  // <Box
  //   display="flex"
  //   flexDirection={{ xs: 'column', md: 'row' }}
  //   gap={4}
  //   alignItems="flex-start"
  // >
  //   {/* Infos de l'article */}
  //   <Box flex={1}>
  //     <Stack spacing={2}>
  //       <Typography variant="h5" color="#6A0DAD">{selectedArticle.nom_article}</Typography>
  //       <img
  //         src={`data:image/jpeg;base64,${selectedArticle.image}`}
  //         alt={selectedArticle.nom_article}
  //         style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 8 }}
  //       />
  //       <Typography>{selectedArticle.nomArticle}</Typography>
  //       <Typography>{selectedArticle.description}</Typography>
  //       <Typography>Marque : {selectedArticle.marque}</Typography>
  //       <Typography>Prix : {selectedArticle.prix} Ar</Typography>
  //       <Typography>nombre vendue : {selectedArticle.nbrVente}</Typography>
  //       <Commandeacheteur vendeur={selectedArticle.vendeurId} codebar={selectedArticle.codeBar} />
  //       <Divider />
  //     </Stack>
  //   </Box>

  //   {/* Infos du vendeur */}
  //   <Box flex={1}>
  //     <Typography variant="h6" color="#FFD700">Informations du vendeur</Typography>
  //     {(() => {
  //       const vendeur = getVendeur(selectedArticle.vendeurId);
  //       return vendeur ? (
  //         <Stack spacing={1}>
  //           <Typography>Nom : {vendeur.nom}</Typography>
  //           <Typography>Type : {vendeur.type}</Typography>
  //           <Typography>Email : {vendeur.email}</Typography>
  //         </Stack>
  //       ) : (
  //         <Typography color="error">Vendeur non trouvé</Typography>
  //       );
  //     })()}
  //   </Box>
  // </Box>
   <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={4}
      alignItems="flex-start"
    >
      {/* Infos de l'article */}
      <Box flex={1}
      mt={{xs:0,md:0}} >
        <Stack spacing={2}>
          <Typography variant="h5" color="#6A0DAD">{selectedArticle.nom_article}</Typography>
          <img
            src={`data:image/jpeg;base64,${selectedArticle.image}`}
            alt={selectedArticle.nom_article}
            style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 8 }}
          />
          <Typography>{selectedArticle.nomArticle}</Typography>
          <Typography>{selectedArticle.description}</Typography>
          <Typography>Marque : {selectedArticle.marque}</Typography>
          <Typography>Prix : {selectedArticle.prix} Ar</Typography>
          {/* <Typography>Prix : {selectedArticle.vendeur} Ar</Typography> */}
          <Typography>Prix : {selectedArticle.vendeurId} Ar</Typography>
          <Commandeacheteur vendeur={selectedArticle.vendeurId} codebar={selectedArticle.codeBar} />
          <Divider />
        </Stack>
      </Box>
  
      {/* Infos du vendeur */}
      <Box flex={1}>
        <Typography variant="h6" color="#FFD700">Informations du vendeur</Typography>
        {(() => {
          // const vendeur = getVendeur(selectedArticle.vendeur);
          const vendeur = getVendeur(selectedArticle.vendeurId);
          return vendeur ? (
            <Stack spacing={1}>
              <Typography>Nom : {vendeur.nom}</Typography>
              <Typography>Type : {vendeur.type}</Typography>
              <Typography>nom boutique : {vendeur.boutique}</Typography>
              <Typography>numéro télephone : {vendeur.phone}</Typography>
              <Typography>Email : {vendeur.email}</Typography>
              <img
            src={`data:image/jpeg;base64,${vendeur.profile}`}
            alt={vendeur.nom}
            style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 8 }}
          />
            </Stack>
          ) : (
            <Typography color="error">Vendeur non trouvé</Typography>
          );
        })()}
      </Box>
    </Box>
)}

          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Lesplusvendu;