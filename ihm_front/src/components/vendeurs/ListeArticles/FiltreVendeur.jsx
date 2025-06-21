import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Rating, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import VendorDetailModal from "./VendorDetailModal";
import GiveReviewModal from "./GiveReviewModal";
import { useEffect } from "react";
import axios from "axios";
import VendorArticlesModal from "./VendorArticlesModal";
import FancyLoader from "../../FancyLoader";


const FiltreVendeur = ({terme}) => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingavis, setLoadingavis] = useState(true);
  const [error, setError] = useState(null);


const [openArticles, setOpenArticles] = useState(false);
const [selectedArticlesVendor, setSelectedArticlesVendor] = useState(null);
const [vendorArticles, setVendorArticles] = useState([]);

//article des vendeurs
const handleOpenArticles = async (vendor) => {
  try {
    const response = await axios.get(`https://localhost:7091/api/Articles/ParVendeur/${vendor.idPersonne}`);
    //const articles = Array.isArray(response.data) ? response.data[0] : []; // car c’est un tableau de tableau
    const articles=response.data;
    setVendorArticles(articles);
    setSelectedArticlesVendor(vendor);
    setOpenArticles(true);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
  }
};

const handleCloseArticles = () => {
  setOpenArticles(false);
  setVendorArticles([]);
};


  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 6;

  const handleOpenDetail = (vendor) => {
    const vendorReviews = reviews.filter((r) => r.idVendeur === vendor.idPersonne);
    setSelectedVendor({ ...vendor, reviews: vendorReviews });
    setOpenDetail(true);
  };

  //alefa any amin'ny base de données
 const handleSubmitReview = async (review) => {
  console.log("Requête POST envoyée : ", review);

  try {
    const response = await axios.post(
      "https://localhost:7091/api/AvisAcheteur",
      review,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      }
    );

   // console.log("✅ Avis ajouté avec succès :", response.data);
    console.log("✅ Avis ajouté avec succès ");
    // alert("Avis envoyé avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'avis :", error);
    alert("Erreur lors de l'envoi de l'avis.");
  }
};
  

  const handleOpenReview = (vendor) => {
    setSelectedVendor(vendor);
    setOpenReview(true);
  };

  const handleCloseModal = () => {
    setOpenDetail(false);
    setOpenReview(false);
    setSelectedVendor(null);
  };

  const vendorsFiltres = vendors.filter(v => {
  const lowerTerme = terme.toLowerCase();
  return (
    v.nom?.toLowerCase().includes(lowerTerme) ||
    v.email?.toLowerCase().includes(lowerTerme) ||
    v.statut?.toLowerCase().includes(lowerTerme) ||
    v.type?.toLowerCase().includes(lowerTerme)
  );
});




  // Pagination logique
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor -vendorsPerPage;
  const currentVendors = vendorsFiltres.slice(indexOfFirstVendor, indexOfLastVendor);
 // const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

 const highlight = (text, terme) => {
  if (!terme) return text;

  const parts = text.split(new RegExp(`(${terme})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === terme.toLowerCase() ? (
      <span key={i} style={{ backgroundColor: "#FFD700", fontWeight: "bold" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getAverageRating = (id_vendeur) => {
    const vendorReviews = reviews.filter(r => r.idVendeur === id_vendeur);
    if (vendorReviews.length === 0) return 0;
    const total = vendorReviews.reduce((sum, r) => sum + r.noteAvis, 0);
    return total / vendorReviews.length;
  };
  


  useEffect(() => {
      axios.get('https://localhost:7091/api/AvisAcheteur')
        .then(response => {
          setreviews(response.data);
          setLoadingavis(false);
         // console.log(response.data)
        })
        .catch(error => {
          setErreur(error.message);
          setLoadingavis(false);
        });
    }, []);


  useEffect(() => {
    axios.get("https://localhost:7091/api/Vendeurs")
      .then(response => {
        setVendors(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Erreur lors du chargement des vendeurs.");
        setLoading(false);
        console.log(error);
      });
  }, []);

// console.log(currentVendors);
//console.log(articles);


  if (loading || loadingavis) return (<FancyLoader/>);
  if (error) return <p>{error}</p>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ padding: "2rem", backgroundColor: "#FFF8DC", minHeight: "70vh" }}
    >
      <Grid container spacing={3}>
        {currentVendors.map((vendor) => (
          <Grid item xs={12} sm={6} md={4} key={vendor.id_vendeur}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ backgroundColor: "#FFF8DC", boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#6A0DAD" }}>
                    {highlight(vendor.nom, terme)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {highlight(vendor.type, terme)} - {highlight(vendor.statut, terme)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Email : {highlight(vendor.email, terme)}
                  </Typography>
                  <Rating
                    value={getAverageRating(vendor.idPersonne)}
                    precision={0.5}
                    readOnly
                    sx={{
                      color: "#FFD700",
                    }}
                  />

                  <Grid container spacing={0.1} sx={{ mt: 2, alignItems: "center" }}>
                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenArticles(vendor)}
                        sx={{
                          backgroundColor: "#6A0DAD",
                          "&:hover": { backgroundColor: "#5e0cc2" },
                        }}
                      >
                        Liste article
                      </Button>
                    </Grid>

                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenDetail(vendor)}
                        sx={{
                          color: "#6A0DAD",
                          borderColor: "#6A0DAD",
                          "&:hover": {
                            backgroundColor: "#6A0DAD",
                            color: "#FFF8DC",
                          },
                        }}
                      >
                        Voir détail
                      </Button>
                    </Grid>

                    <Grid item xs={4}>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenReview(vendor)}
                        sx={{
                          backgroundColor: "#6A0DAD",
                          "&:hover": { backgroundColor: "#5e0cc2" },
                        }}
                      >
                        Donner avis
                      </Button>
                    </Grid>
                  </Grid>


                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(vendors.length / vendorsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 4, display: "flex", justifyContent: "center", "& .MuiPaginationItem-root": { color: "#6A0DAD" } }}
      />


      {openArticles && selectedArticlesVendor && (
        <VendorArticlesModal
          vendor={selectedArticlesVendor}
          articles={vendorArticles}
          onClose={handleCloseArticles}
        />
      )}
      {openDetail && selectedVendor && (
        <VendorDetailModal vendor={selectedVendor} reviews={reviews} onClose={handleCloseModal} />
      )}

      {openReview && selectedVendor && (
        <GiveReviewModal vendor={selectedVendor} onClose={handleCloseModal} onSubmit={handleSubmitReview} />
      )}
    </motion.div>
  );
};

export default FiltreVendeur;
