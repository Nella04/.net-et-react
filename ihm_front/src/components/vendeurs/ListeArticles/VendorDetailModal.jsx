import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Rating,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "#FFF8DC",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const VendorDetailModal = ({ vendor, reviews, onClose }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  // Corriger les clés pour correspondre à la réponse API fa tsy hoe inona
  const vendorReviews = reviews
    .filter((r) => r.idVendeur === vendor.idPersonne)
    .sort((a, b) => new Date(b.dateAvis) - new Date(a.dateAvis));

  const displayedReviews = vendorReviews.slice(0, visibleCount);

  const averageRating =
    vendorReviews.length > 0
      ? vendorReviews.reduce((sum, r) => sum + r.noteAvis, 0) / vendorReviews.length
      : 0;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{ mb: 2, color: "#6A0DAD", textAlign: "center" }}>
            {vendor.nom}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
            {vendor.statut}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Rating value={averageRating} precision={0.5} readOnly sx={{ color: "#FFD700" }} />
          </Box>

          <Grid container spacing={2}>
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ backgroundColor: "#FFF8DC", boxShadow: 2, borderRadius: 2 }}>
                    <CardContent>
                      <Rating value={review.noteAvis} readOnly sx={{ color: "#FFD700" }} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {review.commentaire}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.dateAvis).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>Aucun avis pour ce vendeur.</Typography>
            )}
          </Grid>

          {visibleCount < vendorReviews.length && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                onClick={handleSeeMore}
                variant="outlined"
                sx={{
                  borderColor: "#6A0DAD",
                  color: "#6A0DAD",
                  "&:hover": { backgroundColor: "#6A0DAD", color: "#FFF8DC" },
                }}
              >
                Voir plus
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <motion.button
              onClick={onClose}
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
              Fermer
            </motion.button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default VendorDetailModal;

