import React from "react";
import { Grid, Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BuyerImage from "../components/apropos/BuyerImage";
import BuyerCard from "../components/apropos/BuyerCard";
import SellerImage from "../components/apropos/SellerImage";
import SellerCard from "../components/apropos/SellerCard";
import AnimatedStats from "../components/apropos/StatsDisplay";

const Apropos = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ backgroundColor: "#FFF8DC", padding: 4, overflow: "hidden", minHeight: "100vh", mt: { xs: '56px', md: '64px' } }}>
      <Typography variant="h4" align="center" sx={{ color: "#6A0DAD", fontWeight: "bold", mb: 4 }}>
        À propos de e+Varotra
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 6, maxWidth: 800, mx: "auto" }}>
        e+Varotra est une plateforme pour acheter des produits aux meilleurs prix et vendre vos articles pour booster vos ventes.
      </Typography>

      {/* Section Acheteur */}
      <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <BuyerCard />
        </Grid>
        {!isMobile && (
          <Grid item xs={12} md={6}>
            <BuyerImage />
          </Grid>
        )}
      </Grid>

      {/* Section Vendeur */}
      <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 6 }}>
        {!isMobile && (
          <Grid item xs={12} md={6}>
            <SellerImage />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <SellerCard />
        </Grid>
      </Grid>

      {/* Stats animées */}
      <AnimatedStats />
    </Box>
  );
};

export default Apropos;
