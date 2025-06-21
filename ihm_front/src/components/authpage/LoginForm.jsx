import React, { useState } from "react";
import {
  TextField, Button, Divider, Typography, InputAdornment, IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Google from "./LoginForm/Google";
import LinkedIn from "./LoginForm/LinkedIn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

//a faire authentification google des deux vendeur et acheteur

const LoginForm = ({ switchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [motdepass, setmotdepass] = useState("");

  const navigate = useNavigate();

  const handleToggleCard = () => setShowCard(!showCard);


  const insertionbase = async () => {
  const payload = {
    email: email,
    motDePasse: motdepass,
  };

  try {
    // Étape 1 : Vérification de l'email
    const vermail = await axios.get(`https://localhost:7091/api/Vendeurs/Connexion/Google${payload.email}`);
    const resvermail = vermail.data;
    //console.log('aa:',resvermail);


    // Si aucune donnée ou réponse invalide => on arrête tout
    //if (!resvermail || Object.keys(resvermail).length === 0) {
    // if (!resvermail|| Object.keys(resvermail).length === 0) {
    //   Swal.fire({
    //     title: 'Échec de connexion !',
    //     text: 'Email non trouvé. Veuillez vérifier votre adresse.',
    //     icon: 'error',
    //     confirmButtonColor: '#6A0DAD',
    //     confirmButtonText: 'OK'
    //   });
    //   return; // empêche la suite
    // }

    // Étape 2 : Vérification du mot de passe (uniquement si l'email est correct)
    const response = await axios.post("https://localhost:7091/api/Vendeurs/Connexion", payload);

    // Enregistrement en localStorage et navigation
    const userDatalocal = {
      idpersonnelocal: response.data.idPersonne,
      emaillocal: response.data.email,
      rolelocal: "vendeur"
    };
    localStorage.setItem("userlocal", JSON.stringify(userDatalocal));
    navigate("/seller");

  } catch (error) {
    // Gestion des erreurs réseau ou backend
    //console.error("Erreur lors de la requête :", error);
    
    let messageErreur = "Une erreur est survenue.";
    if (error.response) {
      // Erreur serveur (ex : 404 ou 500)
      if (error.response.status === 404) {
        messageErreur = "Email ou mot de passe incorrect.";
      }
       else if(error.response.status === 400) {
        messageErreur = "verifiez le mail";
      }
       else if(error.response.status === 401) {
        messageErreur = "verifiez votre mot de passe";
      }
      else {
        messageErreur = `Erreur serveur (${error.response.status})`;
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      messageErreur = "Impossible de contacter le serveur.";
    }

    Swal.fire({
      title: 'Échec de connexion !',
      text: messageErreur,
      icon: 'error',
      confirmButtonColor: '#6A0DAD',
      confirmButtonText: 'OK'
    });
  }
};




  const handleSubmit = () => {
    // console.log("playload Email :", email);
    // console.log("playload motdepasse :", motdepass);
    insertionbase();
  };





  return (
    <motion.div
      key="login"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 400 }}
    >
     

       <TextField
              fullWidth
              margin="normal"a
              label="Adresse e-mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& label.Mui-focused": {
                  color: "#6A0DAD", // label violet quand focus
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#6A0DAD", // bordure violette
                  },
                },
              }}
            />
      
            <TextField
              fullWidth
              margin="normal"
              label="mot de passe "
              variant="outlined"
              type={showCard ? "text" : "password"}
              value={motdepass}
              onChange={(e) => setmotdepass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleCard}>
                      {showCard ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& label.Mui-focused": {
                  color: "#6A0DAD",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#6A0DAD",
                  },
                },
              }}
            />



        {/* <Typography variant="body2" mt={2} 
            sx={{
                color: "#6A0DAD",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
        >
            Mot de passe oublié ?
        </Typography> */}
      <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#6A0DAD" }} onClick={handleSubmit}>
        Connexion
      </Button>
       <Divider sx={{ my: 2 }}>ou</Divider>
       <Google/>
       {/* <LinkedIn/> */}
      {/*<Button fullWidth startIcon={<GoogleIcon />} sx={{ mb: 1, backgroundColor: "#FFF8DC", color: "#6A0DAD" }}>
        Continuer avec Google
      </Button>
      <Button fullWidth startIcon={<LinkedInIcon />} sx={{ backgroundColor: "#FFF8DC", color: "#6A0DAD" }}>
        Continuer avec LinkedIn
      </Button> */}
      
      <Typography variant="body2" mt={2}>
        Vous n'avez pas encore de compte ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={switchToRegister} sx={{ ml: 1, color: "#6A0DAD" }}>
          Créer
        </Button>
      </Typography>
    </motion.div>
  );
};

export default LoginForm;
