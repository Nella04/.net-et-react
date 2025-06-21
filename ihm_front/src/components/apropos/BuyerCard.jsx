import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BuyerCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          backgroundColor: "#FFF8DC",
          borderRadius: 4,
          padding: 4,
          maxWidth: 400,
          margin: "auto",
          boxShadow: 4,
        }}
      >
        <Typography variant="h6" sx={{ color: "#6A0DAD", fontWeight: "bold", mb: 2 }}>
          Devenez Acheteur
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Pour acheter, cherchez l'article dans n'importe quelle catégorie, ajoutez-le au panier et passez une commande rapidement en quelques clics.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/articles")}
          sx={{
            backgroundColor: "#6A0DAD",
            color: "white",
            '&:hover': {
              backgroundColor: "#4B0082",
            },
          }}
        >
          Commencer vos achats
        </Button>
      </Box>
    </motion.div>
  );
};

export default BuyerCard;
