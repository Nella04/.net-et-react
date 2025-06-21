import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Chip,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentIcon from "@mui/icons-material/Payment";
import PaiementForm from "./PaiementForm";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { InfoIcon } from "lucide-react";

const colors = {
  violet: "#6A0DAD",
  yellow: "#FFD700",
  lightYellow: "#FFF8DC",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: "90%",
  maxWidth: 450,
  maxHeight: "90vh",
  overflowY: "auto",
};

const styleModal = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: "90%",
  maxWidth: 450,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function CommandeTableActions() {
  const [commandes, setCommandes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPaiement, setOpenPaiement] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [user, setUser] = useState("");

  const isMobile = useMediaQuery("(max-width:1230px)");

  const getCommandes = () => {
    axios
      .get(`https://localhost:7091/api/Commande/GroupByPerson${user}`)
      .then((res) => {
        const cmd = res.data;
        setCommandes(cmd);
      })
      .catch((error) => {
        console.error("Echec de la récupération des commandes: ", error);
      });
  };

  useEffect(() => {
    const personneString = localStorage.getItem("userlocal");
    if (personneString) {
      const personne = JSON.parse(personneString);
      setUser(personne.idpersonnelocal);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getCommandes();
    }
  }, [user]);

  const handleOpenPaiement = (row) => {
    setSelectedRow(row);
    setOpenPaiement(true);
  };

  const handleClosePaiement = () => {
    setOpenPaiement(false);
    setSelectedRow(null);
  };

  const handleDeleteClick = (commande) => {
    setSelectedCommande(commande);
    setOpenDeleteModal(true);
    setAnchorEl(null);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `https://localhost:7091/api/Commande/${selectedCommande.idCommande}`
      )
      .then(() => {
        setCommandes((prevCommande) =>
          prevCommande.filter(
            (commandes) => commandes.idCommande !== selectedCommande.idCommande
          )
        );
        toast.success("Commande supprimée avec succès");
      })
      .catch((err) => {
        console.error("Erreur de la suppression de la commande:", err);
        toast.error("Erreur lors de la suppression de la commande");
      });
    setOpenDeleteModal(false);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  const handleOpenModal = (row) => {
    setSelectedCommande({ ...row });
    setOpenModal(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCommande(null);
  };

  const handleChange = (e) => {
    setSelectedCommande({
      ...selectedCommande,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    axios
      .put(
        `https://localhost:7091/api/Commande/${selectedCommande.idCommande}`,
        selectedCommande
      )
      .then(() => {
        getCommandes();
        toast.success("Commande mise à jour avec succés");
      })
      .catch((err) => {
        console.error("Echec de la mise à jour: ", err);
        toast.error("Echec de la mise à jour de la commande");
      });
    handleCloseModal();
  };

  const renderBadge = (etat) => {
    const color =
      etat === "Validée"
        ? "success"
        : etat === "Rejetée"
        ? "error"
        : etat === "En attente"
        ? "warning"
        : "default";
    return <Chip label={etat} color={color} variant="outlined" />;
  };

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedDetailsCommande, setSelectedDetailsCommande] = useState(null);

  const handleOpenDetails = (row) => {
    setSelectedDetailsCommande(row);
    setOpenDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setSelectedDetailsCommande(null);
    setOpenDetailsModal(false);
  };

  return (
    <Box p={2} marginTop={7} sx={{ bgcolor : '#FFF8DC'}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#6A0DAD" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "white" }}>
                Article
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Date
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Vendeur
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Code Barre
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Quantité
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Prix Unitaire
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Montant Total
                  </TableCell>
                </>
              )}
              <TableCell align="center" sx={{ color: "white" }}>
                État
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {commandes.map((row) => (
              <TableRow key={row.idCommande}>
                <TableCell sx={{ display: "none" }}>{row.idCommande}</TableCell>
                <TableCell align="center">{row.nomArticle}</TableCell>
                <TableCell align="center">{row.dateCommande}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell align="center">{row.nomVendeur}</TableCell>
                    <TableCell align="center">{row.idArticle}</TableCell>
                    <TableCell align="center">{row.quantite}</TableCell>
                    <TableCell align="center">{row.prix}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                  </>
                )}

                <TableCell align="center">
                  {renderBadge(row.etatCommande)}
                </TableCell>

                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                  {isMobile ? (
                    <>
                      <IconButton
                        aria-label="détails"
                        color="info"
                        onClick={() => handleOpenDetails(row)}
                      >
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        aria-label="gérer"
                        sx={{
                          backgroundColor: colors.violet,
                        }}
                        onClick={(e) => handleMenuOpen(e, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="secondary"
                        aria-label="payer"
                        onClick={() => handleOpenPaiement(row)}
                      >
                        <PaymentIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        endIcon={<MoreVertIcon />}
                        sx={{
                          backgroundColor: colors.violet,
                        }}
                        onClick={(e) => handleMenuOpen(e, row)}
                      >
                        Gérer
                      </Button>

                      <Button
                        onClick={() => handleOpenPaiement(row)}
                        variant="outlined"
                        color="secondary"
                        sx={{ ml: 1 }}
                      >
                        Payer
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MENU GÉRER */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        disableScrollLock
      >
        <MenuItem onClick={() => handleOpenModal(menuRow)}>
          <EditIcon sx={{ mr: 1 }} /> Modifier
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(menuRow)}>
          <DeleteIcon sx={{ mr: 1 }} /> Supprimer
        </MenuItem>
      </Menu>

      {/* MODAL MODIFICATION */}
      <Modal open={openModal} onClose={handleCloseModal} disableScrollLock>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Modifier la commande
          </Typography>

          {selectedCommande && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="ID Commande"
                value={selectedCommande.idCommande}
                disabled
                fullWidth
              />
              <TextField
                label="Quantité"
                name="quantite"
                value={selectedCommande.quantite}
                onChange={handleChange}
                fullWidth
              />

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button onClick={handleCloseModal}>Annuler</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Enregistrer
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      {/* TOAST */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <SnackbarContent
          message={snackbar.message}
          style={{
            backgroundColor: snackbar.color || "#2196f3",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      </Snackbar>

      {/* Delete modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette commande ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de paiement */}
      <Modal open={openPaiement} onClose={handleClosePaiement}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: 450,
          }}
        >
          <PaiementForm
            montant={selectedRow}
            onSubmit={(paiementData) => {
              console.log(
                "Paiement effectué :",
                paiementData,
                "pour la commande :",
                selectedRow
              );
              handleClosePaiement();
            }}
          />
        </Box>
      </Modal>
      {/* MODAL DÉTAILS COMMANDE */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseDetails}
        disableScrollLock
      >
        <Box sx={styleModal}>
          <Typography variant="h6" gutterBottom>
            Détails de la commande
          </Typography>

          {selectedDetailsCommande && (
            <>
              <Typography>
                <strong>Article:</strong> {selectedDetailsCommande.nom_article}
              </Typography>
              <Typography>
                <strong>Date:</strong> {selectedDetailsCommande.dateCommande}
              </Typography>
              <Typography>
                <strong>Vendeur:</strong> {selectedDetailsCommande.nom_vendeur}
              </Typography>
              <Typography>
                <strong>Code Barre:</strong> {selectedDetailsCommande.codebar}
              </Typography>
              <Typography>
                <strong>Quantité:</strong>{" "}
                {selectedDetailsCommande.quantiteArticle}
              </Typography>
              <Typography>
                <strong>Prix Unitaire:</strong>{" "}
                {selectedDetailsCommande.prix_unitaire}
              </Typography>
              <Typography>
                <strong>Montant Total:</strong>{" "}
                {selectedDetailsCommande.montant}
              </Typography>
              <Typography>
                <strong>État:</strong> {selectedDetailsCommande.etatCommande}
              </Typography>
              {/* Ajoute ici d'autres champs si besoin */}
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseDetails}>Fermer</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
