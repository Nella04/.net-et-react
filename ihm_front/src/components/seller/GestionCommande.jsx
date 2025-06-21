import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Chip,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommandeFilterIcons from "./CommandeFilter";
import CommandeSearchBar from "./CommandeSearchBar";
import axios from "axios";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
  minWidth: 300,
  textAlign: "center",
};

export default function CommandeTable() {
  const [user, setUser] = useState("");
  const [commandes, setCommandes] = useState([]);
  const [filterEtat, setFilterEtat] = useState("Tous");

  const [openModal, setOpenModal] = useState(false);
  const [actionInfo, setActionInfo] = useState({});

  const [searchValue, setSearchValue] = useState("");

  const handleConfirmAction = () => {
    const { id, type } = actionInfo;
    const nCommande = commandes.find((cmd) => cmd.idCommande === id);
    const mCommande = {
      ...nCommande,
      etatCommande: type === "valider" ? "Validée" : "Rejetée",
    };

    axios
      .put(`https://localhost:7091/api/Commande/${id}`, mCommande)
      .then(() => {
        
        setOpenModal(false);
        getCommandes();
        toast.success(
          `Commande ${type === "valider" ? "validée" : "rejetée"} !`
        );
      })
      .catch((err) => {
        console.log("Une erreur s'est produit lors de la mise à jour: ", err);
        toast.error("Echec de l'opération");
      });
  };

  const filteredCommandes = commandes.filter((cmd) => {
    if (filterEtat === "Tous") return true;
    return (
      cmd.etatCommande.trim().toLowerCase() === filterEtat.trim().toLowerCase()
    );
  });

  const getEtatChip = (etat) => {
    const colors = {
      Validée: { label: "Validée", color: "#2e7d32", bg: "#e8f5e9" },
      Rejetée: { label: "Rejetée", color: "#d32f2f", bg: "#fdecea" },
      "En attente": { label: "En attente", color: "#ed6c02", bg: "#fff4e5" },
    };
    const { label, color, bg } = colors[etat] || {};
    return (
      <Chip
        label={label}
        sx={{ bgcolor: bg, color: color, fontWeight: "bold" }}
      />
    );
  };

  const getCommandes = () => {
    axios
      .get(`https://localhost:7091/api/Commande/GroupByPerson${user}`)
      .then((response) => {
        setCommandes(response.data);
      })
      .catch((error) => {
        console.error("Echec de la récuperation des commandes: ", error);
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

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper sx={{ p: 2, marginTop: 8, overflow: "hidden", maxWidth: "100%", backgroundColor : '#FFF8DC' }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          gap={2}
          mb={2}
        >
          <CommandeFilterIcons
            filterEtat={filterEtat}
            setFilterEtat={setFilterEtat}
          />
          <CommandeSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#6A0DAD", color: "white" }}>
              <TableCell align="center" sx={{ color: "white" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Quantité
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Acheteur
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Vendeur
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                État
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCommandes.map((cmd) => (
              <TableRow key={cmd.idCommande}>
                <TableCell align="center">{cmd.idCommande}</TableCell>
                <TableCell align="center">{cmd.dateCommande}</TableCell>
                <TableCell align="center">{cmd.quantite}</TableCell>
                <TableCell align="center">{cmd.idAcheteur}</TableCell>
                <TableCell align="center">{cmd.idVendeur}</TableCell>
                <TableCell align="center">
                  {getEtatChip(cmd.etatCommande)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setActionInfo({ id: cmd.idCommande, type: "valider" });
                      setOpenModal(true);
                    }}
                    disabled={cmd.etatCommande !== "En attente"}
                    sx={{ mr: 1 }}
                  >
                    Valider
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setActionInfo({ id: cmd.idCommande, type: "rejeter" });
                      setOpenModal(true);
                    }}
                    disabled={cmd.etatCommande !== "En attente"}
                  >
                    Rejeter
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={styleModal}>
            <Typography variant="h6" gutterBottom>
              Confirmation
            </Typography>
            <Typography sx={{ mb: 2 }}>Confirmer cette action ?</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmAction}
              sx={{ mr: 1 }}
            >
              Confirmer
            </Button>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Annuler
            </Button>
          </Box>
        </Modal>
      </Paper>
    </>
  );
}
