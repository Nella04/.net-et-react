// SellerImage.jsx
import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import sellerImg from "./Acceuil.png";

const SellerImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        component="img"
        src={sellerImg}
        alt="Vendeur sur la plateforme"
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          boxShadow: 3,
          display: { xs: "none", sm: "block" },
        }}
      />
    </motion.div>
  );
};

export default SellerImage;
