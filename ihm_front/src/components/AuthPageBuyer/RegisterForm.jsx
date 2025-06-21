import React, { useState } from "react";
import {
  TextField, Button, Divider, IconButton, InputAdornment, Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FcGoogle } from "react-icons/fc"; 
import { FaLinkedin } from "react-icons/fa"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    carteBancaire: "",
    nomPrenom: "",
    motDePasse: "",
    confirmMotDePasse: "",
  });
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const insertionbase = async () => {
    try {
      const payload = {
        idPersonne: formData.carteBancaire, // tsy aiko hoe ty ve tokony atao auto incremente sa fa nataoko anio aloha
        compteBancaire: formData.carteBancaire,
        nom: formData.nomPrenom,
        email: formData.email,
        motDePasse: formData.motDePasse,
      };
  
      const response = await axios.post("https://localhost:7091/api/Acheteur/Inscription", payload);
  
      console.log("Réponse du backend :", response.data);
      navigate("/articles");
      const userDatalocal={
        idpersonnelocal: response.data.idPersonne,
        emaillocal: response.data.email,
        rolelocal: "acheteur"
    };
    localStorage.setItem("userlocal",JSON.stringify(userDatalocal));
      //alert("Inscription réussie !");
    } catch (error) {
      console.error("Erreur lors de l'envoi au backend :", error);
           Swal.fire({
              title: 'Erreur !',
              text: 'veilliez utiliser un autre carte bancaire celui-ci est déjà utiliser par un autre utilisateur!',
              icon: 'Warning',
              confirmButtonColor: '#6A0DAD',
              confirmButtonText: 'OK'
            });
    }
  };
  

  const handleSubmit = () => {
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      // alert("Les mots de passe ne correspondent pas.");
           Swal.fire({
              title: 'Erreur !',
              text: 'Les mots de passe ne correspondent pas.',
              icon: 'error',
              confirmButtonColor: '#6A0DAD',
              confirmButtonText: 'OK'
            });
      return;
    }
   // Fonction de validation du mot de passe
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

if (!formData.nomPrenom) {
  Swal.fire({
    title: 'Champ manquant',
    text: 'Le nom et prénom ne peuvent pas être vides.',
    icon: 'warning',
    confirmButtonColor: '#6A0DAD',
    confirmButtonText: 'OK'
  });
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!formData.email) {
  Swal.fire({
    title: 'Champ manquant',
    text: 'L\'adresse e-mail ne peut pas être vide.',
    icon: 'warning',
    confirmButtonColor: '#6A0DAD',
    confirmButtonText: 'OK'
  });
  return;
}

if (!emailRegex.test(formData.email)) {
  Swal.fire({
    title: 'Adresse e-mail invalide',
    text: 'Veuillez entrer une adresse e-mail valide (ex: exemple@mail.com).',
    icon: 'error',
    confirmButtonColor: '#6A0DAD',
    confirmButtonText: 'OK'
  });
  return;
}


if (!formData.carteBancaire) {
  Swal.fire({
    title: 'Champ manquant',
    text: 'Le numéro de carte bancaire est requis.',
    icon: 'warning',
    confirmButtonColor: '#6A0DAD',
    confirmButtonText: 'OK'
  });
  return;
}

if (!formData.motDePasse) {
  Swal.fire({
    title: 'Champ manquant',
    text: 'Le mot de passe est requis.',
    icon: 'warning',
    confirmButtonColor: '#6A0DAD',
    confirmButtonText: 'OK'
  });
  return;
}

if (!validatePassword(formData.motDePasse)) {
  Swal.fire({
    title: 'Mot de passe invalide',
    html: `<div style="text-align: left;">
             Le mot de passe doit contenir :
             <ul>
               <li>Au moins <strong>8 caractères</strong></li>
               <li>Au moins une <strong>majuscule</strong></li>
               <li>Au moins une <strong>minuscule</strong></li>
               <li>Au moins un <strong>caractère spécial</strong> (!@#$...)</li>
             </ul>
           </div>`,
    icon: 'error',
    confirmButtonColor: '#6A0DAD',
    confirmButtonText: 'OK'
  });
  return;
}


    console.log("Formulaire soumis :", formData);
    insertionbase();
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width: "90%", maxWidth: 400 }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Nom et Prénom"
        name="nomPrenom"
        value={formData.nomPrenom}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ style: { color: "#6A0DAD" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6A0DAD" },
            "&:hover fieldset": { borderColor: "#6A0DAD" },
            "&.Mui-focused fieldset": { borderColor: "#6A0DAD" },
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Adresse e-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ style: { color: "#6A0DAD" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6A0DAD" },
            "&:hover fieldset": { borderColor: "#6A0DAD" },
            "&.Mui-focused fieldset": { borderColor: "#6A0DAD" },
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Numéro carte bancaire"
        name="carteBancaire"
        type={showPassword ? "text" : "password"}
        value={formData.carteBancaire}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ style: { color: "#6A0DAD" } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff sx={{ color: "#6A0DAD" }} /> : <Visibility sx={{ color: "#6A0DAD" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6A0DAD" },
            "&:hover fieldset": { borderColor: "#6A0DAD" },
            "&.Mui-focused fieldset": { borderColor: "#6A0DAD" },
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Mot de passe"
        name="motDePasse"
        type={showPassword ? "text" : "password"}
        value={formData.motDePasse}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ style: { color: "#6A0DAD" } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff sx={{ color: "#6A0DAD" }} /> : <Visibility sx={{ color: "#6A0DAD" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6A0DAD" },
            "&:hover fieldset": { borderColor: "#6A0DAD" },
            "&.Mui-focused fieldset": { borderColor: "#6A0DAD" },
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Confirmation mot de passe"
        name="confirmMotDePasse"
        type={showPassword ? "text" : "password"}
        value={formData.confirmMotDePasse}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ style: { color: "#6A0DAD" } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff sx={{ color: "#6A0DAD" }} /> : <Visibility sx={{ color: "#6A0DAD" }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6A0DAD" },
            "&:hover fieldset": { borderColor: "#6A0DAD" },
            "&.Mui-focused fieldset": { borderColor: "#6A0DAD" },
          },
        }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{
          mt: 3,
          backgroundColor: "#6A0DAD",
          "&:hover": { backgroundColor: "#5a0bb5" }
        }}
      >
        S'inscrire
      </Button>
   </motion.div>
  );
};

export default RegisterForm;
