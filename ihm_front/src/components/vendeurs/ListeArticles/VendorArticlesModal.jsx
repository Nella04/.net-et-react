import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Modal, 
  Card, 
  CardContent, 
  Grid, 
  Pagination,
  Divider,
  Chip,
  Avatar,
  Paper,
  IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import Commandeacheteur from "../../article/ListeArticles/Commande";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  maxHeight: "90vh",
  bgcolor: "#FFF8DC",
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#6A0DAD",
    borderRadius: 4,
  },
};

const itemsPerPage = 4;

const VendorArticlesModal = ({ vendor, articles, onClose }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(articles.length / itemsPerPage);
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedArticles = articles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
//console.log(articles);
  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" sx={{ color: "#6A0DAD", fontWeight: "bold" }}>
              Articles de {vendor.nom}
            </Typography>
            <IconButton 
              onClick={onClose}
              sx={{ color: "#6A0DAD" }}
              component={motion.div}
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3, borderColor: "#6A0DAD" }} />

          {articles.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {/* {paginatedArticles.map((article, index) => (
                  <Grid item xs={12} sm={6} key={index}> */}
                    
                      {paginatedArticles.map((article) => (
                  <Grid item xs={12} sm={6} key={article.codeBar}>
                   
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      // transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        sx={{ 
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          backgroundColor: "white", 
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6
                          }
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: "bold",
                                color: "#6A0DAD"
                              }}
                            >
                              {article.nomArticle}
                            </Typography>
                            <Chip 
                              label={`${article.prix} Ar`} 
                              color="primary" 
                              sx={{ 
                                backgroundColor: "#6A0DAD",
                                color: "#FFD700",
                                fontWeight: "bold"
                              }} 
                            />
                          </Box>

                          <Typography variant="body2" sx={{ mb: 1.5 }}>
                            {article.description}
                          </Typography>

                          <Divider sx={{ my: 1 }} />

                          <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", mr: 1 }}>
                                  Marque:
                                </Typography>
                                <Chip 
                                  label={article.marque} 
                                  size="small" 
                                  variant="outlined" 
                                  sx={{ borderColor: "#6A0DAD" }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", mr: 1 }}>
                                  Catégorie:
                                </Typography>
                                <Chip 
                                  label={article.categorie} 
                                  size="small" 
                                  variant="outlined" 
                                  sx={{ borderColor: "#6A0DAD" }}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                         
                          {article.image && (
                            <Box sx={{ mt: 2, textAlign: "center" }}>
                              <Paper 
                                elevation={2} 
                                sx={{ 
                                  display: "inline-flex", 
                                  p: 1,
                                  backgroundColor: "#FFF8DC"
                                }}
                              >
                                <Avatar 
                                  variant="square" 
                                  src={`data:image/jpeg;base64,${article.image}`} 
                                  sx={{ 
                                    width: 80, 
                                    height: 80,
                                    borderRadius: 1
                                  }} 
                                />
                              </Paper>
                            </Box>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <Commandeacheteur 
                              vendeur={vendor.idPersonne} 
                              codebar={article.codeBar}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {pageCount > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#6A0DAD",
                        "&:hover": {
                          backgroundColor: "#FFF8DC"
                        }
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#6A0DAD !important",
                        color: "#FFD700",
                        "&:hover": {
                          backgroundColor: "#5A0B9D"
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            <Box 
              sx={{ 
                textAlign: "center", 
                py: 4,
                backgroundColor: "#FFF8DC",
                borderRadius: 2
              }}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Aucun article disponible pour ce vendeur
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "#6A0DAD",
                color: "#FFD700",
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              Fermer
            </motion.button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default VendorArticlesModal;