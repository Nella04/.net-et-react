import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, Slide } from "@mui/material";

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

export default function CheckAcheteurGuard() {
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] = useState("error");

  useEffect(() => {
    const userlocal = localStorage.getItem("userlocal");

    if (!userlocal) {
      setSnackMessage("veillez connecter pour effectuer cet action !");
      setSnackColor("error");
      setOpenSnack(true);
      setTimeout(() => navigate("/authentification%20acheteur"), 3000);
      return;
    }
    try {
      const userParsed = JSON.parse(userlocal);
      if (userParsed.rolelocal !== "acheteur") {
        setSnackMessage("Accès réservé au acheteur !");
        setSnackColor("warning");
        setOpenSnack(true);
        setTimeout(() => navigate("/authentification%20acheteur"), 2500);
      }
    } catch (error) {
      console.error("Erreur de parsing localStorage :", error);
      setSnackMessage("veillez connecter en tant que vendeur !");
      setSnackColor("error");
      setOpenSnack(true);
      setTimeout(() => navigate("/authentification%20acheteur"), 2500);
    }

  }, [navigate]);

  return (
    <Snackbar
  open={openSnack}
  autoHideDuration={2500}
  TransitionComponent={SlideTransition}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{ zIndex: (theme) => theme.zIndex.snackbar + 1000 }} // tsy cachena tompoko oooooo
>
  <Alert
    severity={snackColor}
    variant="filled"
    sx={{
      bgcolor:
        snackColor === "error"
          ? "red"
          : snackColor === "warning"
          ? "#FFD700"
          : "#FFF8DC",
      color: snackColor === "warning" ? "#6A0DAD" : "white",
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
    }}
  >
    {snackMessage}
  </Alert>
</Snackbar>

  );
}
