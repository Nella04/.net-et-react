import React from "react";
import styled from "styled-components";
import {
  Typography, CardContent, Button, Grow,
  CardMedia, Box, Grid, Card
} from "@mui/material";

// --- C O M P O S A N T S ---
const ProductsCard = ({ article, onDetails, onDelete }) => {

  const getImageDataUrl = (base64String, type = "jpeg") => {
    if (!base64String) return null;
    return `data:image/${type};base64,${base64String}`;
  };

  return (
    <Box sx={{ pt: 1.5, pb: 1 }}>
      <Grid container spacing={1}>
        {article.map((article, index) => (
          <Grow in={true} key={index} timeout={500 + index * 100}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, bgcolor: '#FFF8DC', boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={article.image ? getImageDataUrl(article.image) : "Image introuvable"}
                alt={article.nomArticle}
                sx={{ width: { sm: 180 }, height: 180, objectFit: 'cover' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ pb: 0.2 }}>
                  <Typography variant="h6" color="#6A0DAD">{article.nomArticle}</Typography>
                  <Typography variant="body2">categorie: {article.categorie}</Typography>
                  <Typography variant="body2" color="text.secondary">Marque : {article.marque}</Typography>
                  <Typography variant="body1" color="#FFD700">Prix : {article.prix} Ar</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 1, gap: 2 }}>
                  <Button variant="outlined" color="secondary" onClick={() => onDetails(article)}>
                    détails
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#6A0DAD", "&:hover": { bgcolor: "#4B0082" } }}
                    onClick={() => onDelete(article.codeBar)}
                  >
                    Supprimer
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grow>
        ))}
      </Grid>
    </Box>
  );
};
export default ProductsCard;
