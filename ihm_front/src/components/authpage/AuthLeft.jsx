import React from "react";
import { Box, Typography } from "@mui/material";

const AuthLeft = () => {
  return (
    <Box
      sx={{
        width: "50%",
        backgroundColor: "#6A0DAD",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        p: 4,
      }}
    >
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Bienvenue sur
        </Typography>
        <Box
          sx={{
            backgroundColor: "#FFF8DC",
            display: "inline-block",
            borderRadius: 2,
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            <span style={{ color: "#6A0DAD" }}>e</span>
            <span style={{ color: "#FFD700" }}>+</span>
            <span style={{ color: "#6A0DAD" }}>Varotra</span>
          </Typography>
        </Box>
        <Typography variant="body1" mt={2}>
          Une plateforme d'achat et de vente d'articles.
          <br />
          Devenez vendeur et boostez votre vente !
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthLeft;
