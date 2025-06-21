import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Avatar,
  IconButton,
  Modal,
  Backdrop,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const colors = {
  violet: "#6A0DAD",
  yellow: "#FFD700",
  lightYellow: "#FFF8DC",
};

const categories = [
  {value: "electronique", nom: "Électronique & High-Tech"},
  {value: "mode", nom: "Mode & Accessoires"},
  {value: "maison", nom: "Maison & Électroménager"},
  {value: "beaute", nom: "Beauté & Bien-être"},
  {value: "autre", nom: "Autres"},
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '75%', md: '55%' },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  backdropFilter: 'blur(5px)',
  maxHeight: '90vh',
  overflow: 'auto',
  border: `3px solid ${colors.violet}`,
};

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.violet,
    },
    "&:hover fieldset": {
      borderColor: colors.violet,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.violet,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.violet,
  },
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: colors.violet,
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#5a0b9a",
  },
}));

const DropZone = styled("div")(({ isDragActive }) => ({
  border: `2px dashed ${colors.violet}`,
  borderRadius: "8px",
  marginBottom: "48px",
  textAlign: "center",
  cursor: "pointer",
  height: "50%",
  backgroundColor: isDragActive ? "rgba(106, 13, 173, 0.1)" : "transparent",
  transition: "background-color 0.3s ease",
}));


const AjoutArticle = ({ open, user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    codeBar: "",
    nomArticle: "",
    description: "",
    marque: "",
    prix: "",
    categorie: "",
    vendeurId: user,
    image: null,
    previewImage: null,
  });
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData({
      codeBar: "",
      nomArticle: "",
      description: "",
      marque: "",
      prix: "",
      categorie: "",
      image: null,
      previewImage: null,
    });
  };

  // GESTION IMAGE
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 1048576) {
        alert("L'image doit être inférieure à 1 Mo");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Seuls les fichiers JPG, PNG sont autorisés");
        return;
      }
      handleImage(file);
    }
  }, []);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1048576) {
        alert("L'image doit être inférieure à 1 Mo");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Seuls les fichiers JPG, PNG sont autorisés");
        return;
      }
      handleImage(file);
    }
  };
  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result.split(",")[1],
        previewImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      previewImage: null,
    }));
  };

  if (!open) return null;


  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Box sx={style}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: 2,
          }}>
            <Typography
              variant="h6"
              sx={{
                color: colors.violet,
                textAlign: "center",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Ajouter un nouvel article
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'danger.main',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <StyledTextField
                  fullWidth
                  label="Code barre"
                  name="codeBar"
                  value={formData.codeBar}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <StyledTextField
                  fullWidth
                  label="Nom de l'article"
                  name="nomArticle"
                  value={formData.nomArticle}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel
                    sx={{
                      "&.Mui-focused": { color: colors.violet },
                    }}
                  >
                    Catégorie
                  </InputLabel>
                  <Select
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    required
                    label="Catégorie"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.violet,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.violet,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.violet,
                      },
                      mb: 0,
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <StyledTextField
                  fullWidth
                  label="Marque"
                  name="marque"
                  value={formData.marque}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ mb: 2, mt: 0 }}
                />
                <StyledTextField
                  fullWidth
                  label="Prix"
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: "Ar",
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <DropZone
                  isDragActive={dragActive}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/jpeg, image/png, image/jpg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {formData.previewImage ? (
                    <Box sx={{
                      position: "relative",
                      width: '100%',
                      height: 177,
                    }}>
                      <Avatar
                        src={formData.previewImage}
                        variant="rounded"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: 2,
                        }}
                      />
                      <IconButton
                        onClick={removeImage}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(255,255,255,0.7)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.9)",
                          },
                        }}
                      >
                        <CancelIcon color="error" />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <CloudUploadIcon
                        sx={{ fontSize: 60, color: colors.violet, mb: 1 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ color: colors.violet, mb: 1 }}
                      >
                        Glissez-déposez votre image ici ou
                      </Typography>
                      <label htmlFor="image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<AddPhotoAlternateIcon />}
                          sx={{
                            backgroundColor: colors.violet,
                            "&:hover": {
                              backgroundColor: "#5a0b9a",
                            },
                          }}
                        >
                          Parcourir
                        </Button>
                      </label>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1, color: "text.secondary" }}
                      >
                        Formats acceptés: JPG, PNG (max 1 Mo)
                      </Typography>
                    </>
                  )}
                </DropZone>
                <StyledTextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
              <StyledButton
                variant="contained"
                onClick={handleCancel}
                startIcon={<CancelIcon />}
                sx={{ mr: 2, backgroundColor: "grey" }}
              >
                Annuler
              </StyledButton>
              <StyledButton
                type="submit"
                variant="contained"
                sx={{backgroundColor: colors.violet}}
                startIcon={<AddPhotoAlternateIcon />}
              >
                Ajouter l'article
              </StyledButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
export default AjoutArticle; 