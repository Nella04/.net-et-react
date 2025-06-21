import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";

const Container = styled(Box)`
  max-width: 900px;
  margin: 15px auto 10px;
  padding: 0 10px;
`;

const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
  }
`;

const SectionTitle = styled(Typography)`
  font-weight: 700 !important;
  margin-bottom: 20px !important;
  color: #004d40;
`;

const BtnPrimary = styled(Button)`
  border-radius: 50px !important;
  padding: 10px 30px !important;
  font-weight: 600 !important;
  text-transform: none !important;
`;

const BtnSecondary = styled(Button)`
  border-radius: 50px !important;
  text-transform: none !important;
`;

const colors = {
  violet: "#6A0DAD",
  yellow: "#FFD700",
  lightYellow: "#FFF8DC",
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: colors.violet,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.violet,
    },
  },
  "&:hover .MuiInputLabel-root": {
    color: colors.violet,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.violet,
  },
};

const SecurityPage = () => {
  const [personne, setPersonne] = useState("");
  const [password, setPassword] = useState({
    motDePasse: "",
    nouveauMotDePasse: "",
    confirmerMoDePasse: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogConnected, setOpenDialogConnected] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const stored = localStorage.getItem("userlocal");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPersonne(parsed.idpersonnelocal);
    }
  }, []);

  const handleToggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.nouveauMotDePasse !== password.confirmerMoDePasse) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    axios
      .put(`https://localhost:7091/api/Vendeurs/password/${personne}`, password)
      .then(() => {
        toast.success("Mot de passe modifié avec succès !");
        setPassword({
          motDePasse: "",
          nouveauMotDePasse: "",
          confirmerMoDePasse: "",
        });
      })
      .catch(() => {
        toast.error("Erreur lors de la modification du mot de passe");
      });
  };

  const toggle2FA = () => {
    setIs2FAEnabled((prev) => !prev);
    toast.info(
      `Double authentification ${!is2FAEnabled ? "activée" : "désactivée"}`
    );
  };

  const devices = [
    { name: "iPhone 14", lastLogin: "Il y a 2 heures" },
    { name: "PC Windows", lastLogin: "Hier à 17h45" },
  ];

  const openLogoutDialog = (device) => {
    setSelectedDevice(device);
    setOpenDialog(true);
  };

  const confirmLogout = () => {
    toast.info(`Déconnecté de ${selectedDevice}`);
    setOpenDialog(false);
    setSelectedDevice("");
  };

  return (
    <Container style={{backgroundColor : '#FFF8DC'}}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 2, marginTop: 7 }}
      >
        Sécurité de mon compte
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          marginBottom: 3,
        }}
      >
        {/* Carte Changement mot de passe */}
        <StyledCard sx={{ flex: 1, padding: 3 }}>
          <SectionTitle variant="h6">Changer mon mot de passe</SectionTitle>
          <Box component="form" onSubmit={handlePasswordSubmit} noValidate>
            {[
              { name: "motDePasse", label: "Mot de passe actuel" },
              { name: "nouveauMotDePasse", label: "Nouveau mot de passe" },
              {
                name: "confirmerMoDePasse",
                label: "Confirmer nouveau mot de passe",
              },
            ].map(({ name, label }) => (
              <TextField
                key={name}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label={label}
                name={name}
                value={password[name]}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  endAdornment:
                    name === "confirmerMoDePasse" ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleShowPassword}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                }}
                sx={inputStyle}
              />
            ))}

            <Box textAlign="right" mt={2}>
              <BtnPrimary
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#6A0DAD" }}
              >
                Modifier
              </BtnPrimary>
            </Box>
          </Box>
        </StyledCard>

        {/* Carte Double Authentification */}
        <StyledCard
          sx={{
            flexBasis: isMobile ? "100%" : "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 3,
          }}
        >
          <SectionTitle variant="h6">Double authentification</SectionTitle>
          <Typography sx={{ mb: 3, color: "#555" }}>
            Activez la double authentification pour renforcer la sécurité de
            votre compte.
          </Typography>
          <BtnPrimary
            variant={is2FAEnabled ? "outlined" : "outlined"}
            color={is2FAEnabled ? "error" : "secondary"}
            onClick={toggle2FA}
          >
            {is2FAEnabled ? "Désactiver" : "Activer"}
          </BtnPrimary>
        </StyledCard>
      </Box>

      {/* Appareils connectés */}
      <StyledCard sx={{ padding: 1 }}>
        <Box textAlign="center" mt={2}>
          <BtnPrimary
            variant="contained"
            sx={{ bgcolor: "#6A0DAD" }}
            onClick={() => setOpenDialogConnected(true)}
          >
            Voir les appareils connectés
          </BtnPrimary>
        </Box>

        <Dialog
          open={openDialogConnected}
          onClose={() => {
            setOpenDialogConnected(false);
            setSelectedDevice("");
          }}
          fullWidth
          maxWidth="sm"
          scroll="paper"
        >
          <DialogTitle>Appareils connectés</DialogTitle>
          <DialogContent dividers>
            <List sx={{ maxHeight: 300 }}>
              {devices.map(({ name, lastLogin }) => (
                <ListItem
                  key={name}
                  divider
                  secondaryAction={
                    <BtnSecondary
                      variant="outlined"
                      color="error"
                      onClick={() => openLogoutDialog(name)}
                    >
                      Déconnecter
                    </BtnSecondary>
                  }
                >
                  <ListItemText primary={name} secondary={lastLogin} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button 
            onClick={() => setOpenDialogConnected(false)}
            sx={{
              color: colors.violet,
            }}
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </StyledCard>

      {/* Dialog confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Déconnexion de l'appareil</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir déconnecter <b>{selectedDevice}</b> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button color="error" variant="contained" onClick={confirmLogout}>
            Déconnecter
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3500} />
    </Container>
  );
};

export default SecurityPage;
