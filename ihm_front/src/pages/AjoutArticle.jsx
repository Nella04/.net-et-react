import React, { useState, useCallback } from 'react';
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
  styled,
  useTheme,
  Slide,
  Fade
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const colors = {
  violet: "#6A0DAD",
  yellow: "#FFD700",
  lightYellow: "#FFF8DC",
};

const categories = [
  "Électronique",
  "Vêtements",
  "Alimentation",
  "Maison",
  "Jardin",
  "Sport",
  "Loisirs",
  "Autre"
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  border: `2px solid ${colors.violet}`,
  boxShadow: `0 4px 20px 0 rgba(106, 13, 173, 0.2)`,
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: colors.lightYellow,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: colors.violet,
    },
    '&:hover fieldset': {
      borderColor: colors.violet,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.violet,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: colors.violet,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.violet,
  color: 'white',
  fontWeight: 'bold',
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#5a0b9a',
  },
}));

const DropZone = styled('div')(({ theme, isDragActive }) => ({
  border: `2px dashed ${colors.violet}`,
  borderRadius: '8px',
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: isDragActive ? 'rgba(106, 13, 173, 0.1)' : 'transparent',
  transition: 'background-color 0.3s ease',
  marginBottom: theme.spacing(3),
}));

function AjoutArticle() {
  const [formData, setFormData] = useState({
    codeBar: '',
    nomArticle: '',
    description: '',
    marque: '',
    prix: '',
    categorie: '',
    image: null,
    previewImage: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 1048576) { // 1MB
        alert("L'image doit être inférieure à 1 Mo");
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
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
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert("Seuls les fichiers JPG, PNG sont autorisés");
        return;
      }
      handleImage(file);
    }
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result.split(',')[1], // Base64 without prefix fa tsy aiko an
        previewImage: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      previewImage: null
    }));
  };


  const userLocal = JSON.parse(localStorage.getItem("userlocal"));
  const vendeurid = userLocal?.idpersonnelocal;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data ready for API:", {
      ...formData,
      prix: parseInt(formData.prix),
      vendeurId:  vendeurid //"V001" // Hardcoded as per your example fa ovao anle vendeur any fa miankina amle athentification ty sauf que iny anefa mbola tsy
    });
    
    // Here you would typically call your API
    fetch('https://localhost:7091/api/Articles', {
      method: 'POST',
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        prix: parseInt(formData.prix),
        vendeurId: vendeurid
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };

  const handleCancel = () => {
    setFormData({
      codeBar: '',
      nomArticle: '',
      description: '',
      marque: '',
      prix: '',
      categorie: '',
      image: null,
      previewImage: null,
    });
  };

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ 
        padding: { xs: 2, sm: 4 },
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.lightYellow} 0%, white 100%)`,
      }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <StyledPaper elevation={3}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                color: colors.violet, 
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Ajouter un nouvel article
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <StyledTextField
                    fullWidth
                    label="Code barre"
                    name="codeBar"
                    value={formData.codeBar}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />

                  <StyledTextField
                    fullWidth
                    label="Nom de l'article"
                    name="nomArticle"
                    value={formData.nomArticle}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel 
                      sx={{ 
                        '&.Mui-focused': { color: colors.violet } 
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
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.violet,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.violet,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.violet,
                        },
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
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
                      endAdornment: 'Ar',
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
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    {formData.previewImage ? (
                      <Box sx={{ position: 'relative' }}>
                        <Avatar
                          src={formData.previewImage}
                          variant="rounded"
                          sx={{ 
                            width: '100%', 
                            height: '200px',
                            mb: 2
                          }}
                        />
                        <IconButton
                          onClick={removeImage}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.9)',
                            },
                          }}
                        >
                          <CancelIcon color="error" />
                        </IconButton>
                      </Box>
                    ) : (
                      <>
                        <CloudUploadIcon sx={{ fontSize: 60, color: colors.violet, mb: 1 }} />
                        <Typography variant="body1" sx={{ color: colors.violet, mb: 1 }}>
                          Glissez-déposez votre image ici ou
                        </Typography>
                        <label htmlFor="image-upload">
                          <Button
                            variant="contained"
                            component="span"
                            startIcon={<AddPhotoAlternateIcon />}
                            sx={{
                              backgroundColor: colors.violet,
                              '&:hover': {
                                backgroundColor: '#5a0b9a',
                              },
                            }}
                          >
                            Parcourir
                          </Button>
                        </label>
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
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

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <StyledButton
                  variant="contained"
                  onClick={handleCancel}
                  startIcon={<CancelIcon />}
                  sx={{ mr: 2, backgroundColor: 'grey' }}
                >
                  Annuler
                </StyledButton>
                <StyledButton
                  type="submit"
                  variant="contained"
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  Ajouter l'article
                </StyledButton>
              </Box>
            </form>
          </StyledPaper>
        </Slide>
      </Box>
    </Fade>
  );
}

export default AjoutArticle;