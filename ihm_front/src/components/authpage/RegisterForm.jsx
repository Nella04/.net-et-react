import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    compteBancaire: "",
    motDePasse: "",
    confirmPassword: "",
    nom: "",
    type: "particulier", // valeur par défaut
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Réinitialiser l'erreur à la saisie
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est obligatoire.";
    }

    if (!["particulier", "entreprise"].includes(formData.type)) {
      newErrors.type = "Type invalide.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Adresse e-mail invalide.";
    }

    if (formData.compteBancaire.length < 4) {
      newErrors.compteBancaire = "Numéro de carte bancaire invalide.";
    }

    if (!passwordRegex.test(formData.motDePasse)) {
      newErrors.motDePasse =
        "Mot de passe faible (8+ caractères, majuscule, minuscule, caractère spécial).";
    }

    if (formData.motDePasse !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      idPersonne: formData.email,
      compteBancaire: formData.compteBancaire,
      nom: formData.nom,
      email: formData.email,
      motDePasse: formData.motDePasse,
      type: formData.type,
      statut: "actif",
    };

    try {
      const response = await axios.post(
        "https://localhost:7091/api/Vendeurs/Inscription",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
        }
      );
      const userDatalocal = {
        idpersonnelocal: response.data.idPersonne,
        emaillocal: response.data.email,
        rolelocal: "vendeur",
      };
      localStorage.setItem("userlocal", JSON.stringify(userDatalocal));
      navigate("/articles");
    } catch (error) {
      console.error("Erreur API:", error);
      // alert("Erreur lors de l'inscription.");
      Swal.fire({
              title: 'Erreur !',
              text: 'veilliez utiliser un autre adresse email! \n cet adresse email est déja utiliser par un autre utilisateur!',
              icon: 'error',
              confirmButtonColor: '#6A0DAD',
              confirmButtonText: 'OK'
            });
    }
  };

  return (
    <motion.div
      key="register"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 400 }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Nom"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        error={!!errors.nom}
        helperText={errors.nom}
        variant="outlined"
        sx={inputStyle}
      />
      <TextField
        select
        fullWidth
        margin="normal"
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        error={!!errors.type}
        helperText={errors.type}
        variant="outlined"
        sx={inputStyle}
      >
        <MenuItem value="particulier">Particulier</MenuItem>
        <MenuItem value="entreprise">Entreprise</MenuItem>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        label="Adresse e-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        variant="outlined"
        sx={inputStyle}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Numéro carte bancaire"
        name="compteBancaire"
        value={formData.compteBancaire}
        onChange={handleChange}
        error={!!errors.compteBancaire}
        helperText={errors.compteBancaire}
        variant="outlined"
        sx={inputStyle}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Mot de passe"
        name="motDePasse"
        type={showPassword ? "text" : "password"}
        value={formData.motDePasse}
        onChange={handleChange}
        error={!!errors.motDePasse}
        helperText={errors.motDePasse}
        variant="outlined"
        sx={inputStyle}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        variant="outlined"
        sx={inputStyle}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: "#6A0DAD" }}
        onClick={handleSubmit}
      >
        Inscription
      </Button>
    </motion.div>
  );
};

const inputStyle = {
  "& label.Mui-focused": {
    color: "#6A0DAD",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#6A0DAD",
    },
  },
};

export default RegisterForm;
