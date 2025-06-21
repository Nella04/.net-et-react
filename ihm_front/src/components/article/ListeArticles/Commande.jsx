import React, { useState, useEffect } from "react";
import { 
  Button, 
  TextField, 
  IconButton, 
  Box, 
  Stack, 
  Fade,
  Slide,
  Typography
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import CheckAcheteurGuard from "../../session/CheckacheteurGuard";
import { useNavigate } from "react-router-dom";

export default function Commandeacheteur({ vendeur, codebar }) {
  const [etat, setEtat] = useState(1); // 1: initial, 2: saisie, 3: confirmé
  const [quantite, setQuantite] = useState(1);
  const [quantiteCommandee, setQuantiteCommandee] = useState(0);
  const [idCommande, setIdCommande] = useState(null);
  const [animation, setAnimation] = useState(true);
  const navigate = useNavigate();
  
  // Récupérer l'acheteur depuis le localStorage
  const userLocal = JSON.parse(localStorage.getItem("userlocal"));
  const idAcheteur = userLocal?.idpersonnelocal;
//   const idAcheteur = "1212";

  useEffect(() => {
    // Vérifier si une commande existe déjà pour cet article
    // Vous pourriez faire un appel API ici pour vérifier
  }, []);

  const handleAugmenterQuantite = () => {
    setQuantite(prev => prev + 1);
  };

  const handleDiminuerQuantite = () => {
    if (quantite > 1) {
      setQuantite(prev => prev - 1);
    }
  };

  const handleChangerQuantite = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantite(value);
    } else if (e.target.value === "") {
      setQuantite(1);
    }
  };

  const handleValiderCommande = async () => {
    setAnimation(false);
    console.log("essai envoi vendeur:", vendeur, "codebar", codebar, "acheteur", idAcheteur, "qnt", quantite);    
    console.log(Date.now);
    // Génération de l'idCommande (ex: "V" + Date.now())
    const idCommande = idAcheteur + Date.now(); 
  
    // Génération de la date au format "YYYY-MM-DD"
    const dateCommande = new Date().toISOString().split("T")[0];
  
    // Définir un état initial, par exemple "en attente"
    const etatCommande = "En attente";
  
    try {
      const response = await fetch('https://localhost:7091/api/Commande', {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCommande: idCommande,       // généré côté front
          dateCommande: dateCommande,   // date actuelle
          etatCommande: etatCommande,   // état par défaut
          idVendeur: vendeur,
          idAcheteur: idAcheteur,
          idArticle: codebar,
          quantite: quantite
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        setIdCommande(data.idCommande);  
        console.log("ajout resusit du commande " , idCommande);         // pour affichage ou suivi
        setQuantiteCommandee(data.quantite);
        setEtat(3);                                // succès
      } else {
        console.error("Erreur lors de la commande");
        setEtat(1);                                // échec
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setEtat(1);
    } finally {
      setAnimation(true);
    }
  };
  

  const handleAnnulerCommande = () => {
    setEtat(1);
    setQuantite(1);
  };

  // const handleModifierCommande = () => {
  //   // setEtat(2);
  //   navigate("/acheteur");
  //   console.log("redirection");
  // };


  const handleModifierCommande = async () => {
    setEtat(2);
  
    const dateCommande = new Date().toISOString().split("T")[0]; // date actuelle
    const etatCommande = "en attente"; // nataoko en attente ihnay aloha
    console.log("hanao modification");
  
    try {
      const response = await fetch(`https://localhost:7091/api/Commande/${idCommande}`, {
        method: 'PUT',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCommande: idCommande,
          dateCommande: dateCommande,
          etatCommande: etatCommande,
          idVendeur: vendeur,
          idAcheteur: idAcheteur,
          idArticle: codebar,
          quantite: quantite, // ta nouvelle quantité
          article: null // tu ne modifies pas l'article ici
        })
      });
  
      if (response.ok) {
        console.log("Commande modifiée avec succès");
        setQuantiteCommandee(quantite);
        setEtat(3); // succès
        console.log("nety le modification:",idCommande);
      } else {
        console.error("Erreur lors de la modification de la commande");
        setEtat(1); // erreur
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      setEtat(1); // erreur
    }
  };
  

  const passage4 = () => {
    setEtat(4);
    console.log("aler à etat 4");
  };


  const handleSupprimerCommande = async () => {
    if (!idCommande) return;
    
    try {
      const response = await fetch(`https://localhost:7091/api/Commande/${idCommande}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEtat(1);
        setQuantite(1);
        setQuantiteCommandee(0);
        console.log("suppresion resusit du commande " , idCommande);
        setIdCommande(null);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 300 }}>
      {etat === 1 && (
        <Slide direction="up" in={animation} mountOnEnter unmountOnExit>
          <Button 
            variant="contained" 
            fullWidth
            sx={{ 
              bgcolor: '#6A0DAD', 
              '&:hover': { bgcolor: '#4B0082' },
              py: 1,
              borderRadius: 2,
              boxShadow: 3
            }}
            onClick={() => setEtat(2)}
          >
            Passer commande
          </Button>
        </Slide>
      )}

      {etat === 2 && (
        
        <Fade in={animation}>
          
        <Box sx={{ bgcolor: '#6A0DAD', p: 0.1, borderRadius: 0.8 }}>
        <CheckAcheteurGuard/>
          <Stack 
        //   direction="row" 
        //   spacing={0.1} 
        //   alignItems="center"
        //   sx={{ bgcolor: '#FFF8DC' }} 
          direction="row" 
          spacing={0.5} 
          alignItems="center" 
          justifyContent="space-between" 
          sx={{ bgcolor: '#FFF8DC', p: 0.5, borderRadius: 0.8 }}
          >
            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#6A0DAD', 
                color: 'white',
                '&:hover': { bgcolor: '#4B0082' }
              }}
              onClick={handleDiminuerQuantite}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <TextField
              size="small"
              value={quantite}
              onChange={handleChangerQuantite}
              inputProps={{ 
                style: { 
                  textAlign: 'center',
                  width: 20
                } 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#6A0DAD',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4B0082',
                  },
                },
              }}
            />

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#6A0DAD', 
                color: 'white',
                '&:hover': { bgcolor: '#4B0082' }
              }}
              onClick={handleAugmenterQuantite}
            >
              <AddIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#FFD700', 
                color: '#6A0DAD',
                '&:hover': { bgcolor: '#FFF8DC' }
              }}
              onClick={handleValiderCommande}
            >
              <CheckIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: 'error.light', 
                color: 'white',
                '&:hover': { bgcolor: 'error.dark' }
              }}
              onClick={handleAnnulerCommande}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        </Fade>
      )}

      {etat === 3 && (
        <Slide direction="left" in={animation} mountOnEnter unmountOnExit>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" sx={{ color: '#6A0DAD', fontWeight: 'bold' }}>
              Commandé: {quantiteCommandee}
            </Typography>

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#FFD700', 
                color: '#6A0DAD',
                '&:hover': { bgcolor: '#FFF8DC' }
              }}
              onClick={passage4}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: 'error.light', 
                color: 'white',
                '&:hover': { bgcolor: 'error.dark' }
              }}
              onClick={handleSupprimerCommande}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Slide>
      )}

      {etat === 4 && (
        <Fade in={animation}>
          
        <Box sx={{ bgcolor: '#6A0DAD', p: 0.1, borderRadius: 0.8 }}>
        <CheckAcheteurGuard/>
          <Stack 
          direction="row" 
          spacing={0.5} 
          alignItems="center" 
          justifyContent="space-between" 
          sx={{ bgcolor: '#FFF8DC', p: 0.5, borderRadius: 0.8 }}
          >
            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#6A0DAD', 
                color: 'white',
                '&:hover': { bgcolor: '#4B0082' }
              }}
              onClick={handleDiminuerQuantite}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <TextField
              size="small"
              value={quantite}
              onChange={handleChangerQuantite}
              inputProps={{ 
                style: { 
                  textAlign: 'center',
                  width: 20
                } 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#6A0DAD',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4B0082',
                  },
                },
              }}
            />

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#6A0DAD', 
                color: 'white',
                '&:hover': { bgcolor: '#4B0082' }
              }}
              onClick={handleAugmenterQuantite}
            >
              <AddIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: '#FFD700', 
                color: '#6A0DAD',
                '&:hover': { bgcolor: '#FFF8DC' }
              }}
              onClick={handleModifierCommande}
            >
              <CheckIcon fontSize="small" />
            </IconButton>

            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: 'error.light', 
                color: 'white',
                '&:hover': { bgcolor: 'error.dark' }
              }}
              onClick={handleAnnulerCommande}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        </Fade>      )}
    </Box>
  );
}