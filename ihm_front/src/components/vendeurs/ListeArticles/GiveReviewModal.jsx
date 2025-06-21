import React, { useState } from "react";
import { Box, Typography, Modal, TextField, Rating, Button } from "@mui/material";
import { motion } from "framer-motion";
import CheckAcheteurGuard from "../../session/CheckacheteurGuard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "#FFF8DC",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const GiveReviewModal = ({ vendor, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ État pour le message d'erreur

  const handleSubmit = () => {
    if (rating === 0 && comment.trim() === "") {
      setErrorMessage("Un commentaire est requis si vous donnez une note de 0.");
      return;
    }
    // if (rating === 0 ) {
    //   setErrorMessage("veiller introduire une note plus de 0.");
    //   return;
    // }
    if (comment.trim() === "") {
      setErrorMessage("le commentaire est requis");
      return;
    }

    setErrorMessage(""); // ✅ Efface l'erreur s'il n'y en a plus

    const user = JSON.parse(localStorage.getItem("userlocal"));
    const acheteurId = user?.idpersonnelocal || "UNKNOWN";
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const idAvis = `AVIS-${acheteurId}-${now.getTime()}`;

    const newReview = {
      idAvis,
      dateAvis: formattedDate,
      idAcheteur: acheteurId,
      noteAvis: rating,
      idVendeur: vendor.idPersonne,
      commentaire: comment,
    };

    onSubmit(newReview);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckAcheteurGuard />
        <Box sx={style}>
          <Typography variant="h5" sx={{ mb: 2, color: "#6A0DAD", textAlign: "center" }}>
            Donner un avis à {vendor.nom}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Rating
              value={rating}
              precision={1}
              onChange={(e, newValue) => setRating(newValue)}
              sx={{ color: "#FFD700", fontSize: "2rem" }}
            />
          </Box>

          <TextField
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            label="Votre commentaire"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            error={Boolean(errorMessage)} // ✅ Affiche l'erreur en rouge
            helperText={errorMessage} // ✅ Message sous le champ
            sx={{
              mb: 3,
              "& label": {
                color: "#6A0DAD",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6A0DAD",
                },
                "&:hover fieldset": {
                  borderColor: "#6A0DAD",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6A0DAD",
                },
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: "#FFD700",
                color: "#6A0DAD",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Annuler
            </motion.button>

            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.1 }}
              style={{
                backgroundColor: "#6A0DAD",
                color: "#FFF8DC",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Envoyer
            </motion.button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default GiveReviewModal;
