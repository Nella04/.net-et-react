import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Accueil.css";
import "./AccueilCustom.css";

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <Box className="accueil-container">
      <Box className="overlay-content" component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        
        <Typography variant="body1" className="description">
          Bienvenue sur
        </Typography>
        <Typography variant="h3" className="titre-acceuil">
          <span className="e">e</span>
          <span className="plus">+</span>
          <span className="varotra">Varotra</span>
        </Typography>

        <Typography variant="subtitle1" className="sous-titre">
          Une plateforme d'achat et de vente d'articles.
        </Typography>

        <Typography variant="body1" className="description">
          Achetez des articles au meilleur prix,
        </Typography>

        <Typography variant="body1" className="description">
           ou devenez vendeur pour booster vos revenus !
        </Typography>

        <Button
          className="btn-savoir-plus"
          onClick={() => navigate("/apropos")}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          endIcon={
            <motion.span
              className="arrow"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              →
            </motion.span>
          }
        >
          En savoir plus
        </Button>
      </Box>
    </Box>
  );
};

export default Accueil;
