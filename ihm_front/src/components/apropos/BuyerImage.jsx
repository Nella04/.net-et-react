// BuyerImage.jsx
import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import buyerImg from "./Acceuil.png"; 

const BuyerImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        component="img"
        src={buyerImg}
        alt="Acheteur heureux"
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

export default BuyerImage;
