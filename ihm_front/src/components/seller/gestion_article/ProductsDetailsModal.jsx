import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "60%" },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  backdropFilter: "blur(5px)",
  maxHeight: "90vh",
  overflow: "auto",
};

const ProductsDetailsModal = ({ open, onClose, article, onSave }) => {
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (article) {
      setForm({ ...article });
      setPreviewImage(null); // Clear preview when article changes
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImageChange = () => {
    setPreviewImage(null);
  };

  const handleSave = () => {
    const dataToSave = { ...form };
    if (previewImage) {
      dataToSave.image = previewImage.split(",")[1]; // Enleve le prefixe data:image/jpeg;base64,
    }

    onSave(dataToSave);
    setEditable(false);
    setPreviewImage(null); // Clear preview after saving
  };

  const getImageDataUrl = (base64String, type = "jpeg") => {
    if (!base64String || base64String.startsWith("data:image"))
      return base64String; // Already a data URL or null
    return `data:image/${type};base64,${base64String}`;
  };

  if (!article) return null;

  const currentImageSrc = previewImage || getImageDataUrl(form.image);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: colors.violet,
                textAlign: "center",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Détails de l'article
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: "danger.main",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              width: "100%",
            }}
          >
            {/* Left Column - Image, Barcode, Name */}
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Image Container with Icons */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 220,
                  bgcolor: "#f4f4f4",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={currentImageSrc}
                  alt={form.nomArticle}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/* Edit/Change Image Icon */}
                {editable && (
                  <IconButton
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      bgcolor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                      color: "primary.main",
                      p: "4px",
                    }}
                    size="medium"
                  >
                    <EditIcon fontSize="medium" />
                  </IconButton>
                )}

                {/* Cancel Image Change Icon */}
                {editable && previewImage && (
                  <IconButton
                    onClick={handleCancelImageChange}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 40,
                      bgcolor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                      color: "error.main",
                      p: "4px",
                    }}
                    size="medium"
                  >
                    <RotateLeftIcon fontSize="medium" />
                  </IconButton>
                )}
              </Box>

              <TextField
                fullWidth
                label="Codebar"
                name="codeBar"
                value={form.codeBar || ""}
                onChange={handleChange}
                // disabled={!editable}
                margin="dense"
                inputProps={{
                  readOnly: !editable,
                }}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                label="Nom"
                name="nomArticle"
                value={form.nomArticle || ""}
                onChange={handleChange}
                disabled={!editable}
                margin="dense"
                sx={inputStyle}
              />
            </Box>

            {/* Right Column - Other Details */}
            <Box
              sx={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                disabled={!editable}
                margin="dense"
                multiline
                rows={5}
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Marque"
                name="marque"
                value={form.marque || ""}
                onChange={handleChange}
                disabled={!editable}
                margin="dense"
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Catégorie"
                name="categorie"
                value={form.categorie || ""}
                onChange={handleChange}
                disabled={!editable}
                margin="dense"
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Prix"
                name="prix"
                type="number"
                value={form.prix || ""}
                onChange={handleChange}
                disabled={!editable}
                margin="dense"
                InputProps={{
                  endAdornment: <Typography variant="body2">Ar</Typography>,
                }}
                sx={inputStyle}
              />
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
            }}
          >
            <Button
              onClick={() => setEditable(!editable)}
              variant="outlined"
              color="secondary"
            >
              {editable ? "Annuler" : "Modification"}
            </Button>

            {editable && (
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  backgroundColor: colors.violet,
                }}
              >
                Enregistrer
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductsDetailsModal;
