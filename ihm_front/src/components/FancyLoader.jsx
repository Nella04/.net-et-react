import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Animation pour effet de pulsation douce
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
`;

// Cercle externe animé
const OuterCircle = styled("div")({
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  border: "6px solid #FFD700",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  animation: `${pulse} 2s infinite`,
  backgroundColor: "#FFF8DC",
  boxShadow: "0 0 20px #6A0DAD",
});

// Texte animé au centre
const CenterText = styled(Typography)({
  position: "absolute",
  fontSize: "1.2rem",
  color: "#6A0DAD",
  fontWeight: "bold",
  animation: `${pulse} 2.5s infinite`,
});

// Loader principal
export default function FancyLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#FFF8DC"
      flexDirection="column"
      gap={3}
    >
      <Box position="relative">
        <OuterCircle>
          <CircularProgress
            size={100}
            thickness={4}
            sx={{
              color: "#6A0DAD",
              animationDuration: "2s",
            }}
          />
        </OuterCircle>
        <CenterText variant="body1">Chargement...</CenterText>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "#6A0DAD",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Veuillez patienter un instant
      </Typography>
    </Box>
  );
}
