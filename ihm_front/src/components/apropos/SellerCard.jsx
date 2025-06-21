// SellerCard.jsx
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SellerCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
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
          Devenez Vendeur
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Pour vendre, créez un compte, ajoutez vos articles, et boostez votre visibilité auprès des milliers d'acheteurs.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/authentification")}
          sx={{
            backgroundColor: "#6A0DAD",
            color: "white",
            '&:hover': {
              backgroundColor: "#4B0082",
            },
          }}
        >
          Commencer à vendre
        </Button>
      </Box>
    </motion.div>
  );
};

export default SellerCard;
