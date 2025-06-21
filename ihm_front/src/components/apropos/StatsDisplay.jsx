import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  "Plus de 5000 articles vendus",
  "Plus de 3000 acheteurs actifs",
  "Plus de 500 vendeurs"
];

const StatsDisplay = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMobile ? "center" : "flex-end",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        mt: 4,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              backgroundColor: "#FFD700",
              color: "#6A0DAD",
              borderRadius: 3,
              padding: 3,
              width: 250,
              textAlign: "center",
              fontWeight: "bold",
              boxShadow: 4,
              fontSize: "1rem",
            }}
          >
            <Typography variant="body1">{stats[index]}</Typography>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Deuxième rectangle fixe pour ancrer visuellement l'animation */}
      <Box
        sx={{
          backgroundColor: "#FFF8DC",
          color: "#6A0DAD",
          borderRadius: 3,
          padding: 3,
          width: 250,
          textAlign: "center",
          boxShadow: 2,
          fontSize: "0.9rem",
        }}
      >
        <Typography variant="body2">
          voici notre impact actuelle !
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsDisplay;
