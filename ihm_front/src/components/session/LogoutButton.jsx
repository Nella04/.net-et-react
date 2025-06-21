import React from "react";
import { Button, Snackbar, Slide } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SlideUpTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function LogoutButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Suppression du localStorage
    localStorage.removeItem("userlocal");

    // Affiche une snackbar
    setOpen(true);

    // Redirection après un petit délai
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{
          backgroundColor: "#6A0DAD",
          color: "#FFD700",
          "&:hover": {
            backgroundColor: "#4B0082",
          },
          px: 2,
          py: 1,
          fontWeight: "bold",
          borderRadius: 2,
          textTransform: "none",
          fontSize: { xs: "0.8rem", sm: "1rem" },
        }}
        fullWidth
      >
        Se déconnecter
      </Button>

      <Snackbar
        open={open}
        TransitionComponent={SlideUpTransition}
        message="Déconnexion réussie !"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1400}
        ContentProps={{
          sx: {
            bgcolor: "#6A0DAD",
            color: "#FFD700",
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
}
