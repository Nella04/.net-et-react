import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import styled from "styled-components";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import { Box, Button, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const Container = styled.div`
  padding: 20px;
  background-color: #FFF8DC;
  min-height: 80vh;
  overflow: hidden;
  margin-top: 55px;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }

  .profile-card {
    background-color: transparent;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    gap: 30px;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .left {
    flex: 1;
    text-align: center;
  }

  .right {
    flex: 2;
    margin-right: 25px;
    display: flex;
    gap: 40px;
  }

  .profile-pic {
    width: 350px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
  }

  input[type="file"] {
    margin-top: 10px;
  }

  .inputStyled {
    width: "auto";
    padding: "10px";
    marginTop: "5px";
    borderTop: "0px";
    borderLeft: "0px";
    borderRight: "0px";
    fontSize: "16px";
    backgroundColor: "transparent";
    outline: "none";
  }
`;

const colors = {
  violet: "#6A0DAD",
  yellow: "#FFD700",
  lightYellow: "#FFF8DC",
};

const defaultData = {
  nom: "",
  email: "",
  compteBancaire: "",
  phone: "",
  boutique: "",
  type: "",
  profile: null,
  previewImage: null,
};

const SellerProfile = () => {
  const [user, setUser] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [vendeur, setVendeur] = useState([]);
  const [formData, setFormData] = useState({ ...defaultData, ...vendeur });
  const [originalData, setOriginalData] = useState({
    ...defaultData,
    ...vendeur,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getInformations = () => {
    axios
      .get(`https://localhost:7091/api/Vendeurs/${user}`)
      .then((res) => {
        const vendeur = res.data;
        setVendeur(vendeur);
        const imageBase64 = vendeur.profile
          ? `data:image/jpeg;base64,${vendeur.profile}`
          : null;
        setOriginalData({
          ...vendeur,
          previewImage: imageBase64,
        });
        setFormData({
          ...vendeur,
          previewImage: imageBase64,
        });
      })
      .catch((err) => {
        console.log("Erreur: ", err);
      });
  };

  useEffect(() => {
    const personneString = localStorage.getItem('userlocal');
    if (personneString) {
      const personne = JSON.parse(personneString);
      setUser(personne.idpersonnelocal);
    }
  }, []);


  useEffect(() => {
    if (user) {
      getInformations();
      setPreviewImage(null);
    }
  }, [user]);

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData);
  };

  const handleCancelProfileChange = () => {
    setPreviewImage(null);
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        alert("L'image doit être inférieure à 1 Mo");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const currentImageSrc = previewImage || formData.previewImage;

  const handleSave = () => {
    const dataToSave = { ...formData };
    if (previewImage) {
      dataToSave.profile = previewImage.split(",")[1]; // Enleve le prefixe data:image/jpeg;base64,
    }

    update(dataToSave);
    setIsEditing(false);
    setPreviewImage(null);
  };

  const update = (data) => {
    axios
      .put(`https://localhost:7091/api/Vendeurs/${user}`, data)
      .then(() => {
        setOriginalData(data);
        setIsEditing(false);
        getInformations();
        toast.success("Modification enregistrée");
      })
      .catch((error) => {
        console.error("Erreur: ", error);
        toast.error("Echec de la modification");
      });
  }

  return (
    <Container style={{height : '80vh'}}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        mb: 3,
      }}>
        <Typography variant="h6"
          sx={{
            color: colors.violet,
            textAlign: "center",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}>
          Informations personnelles
        </Typography>
      </Box>
      <div className="profile-card">
        {/* Partie gauche - Photo */}
        <Box sx={{
          display: 'flex',
          gap: 3,
          width: '100%'
        }}>
          {/* Left Column - Image, Barcode, Name */}
          <Box sx={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <Box sx={{
              position: 'relative',
              width: '100%',
              height: "100%",
              bgcolor: '#f4f4f4',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Box
                component="img"
                src={currentImageSrc}
                alt="Photo de profile"
                sx={{
                  maxWidth: '70%',
                  maxHeight: '70%',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleProfileChange}
              />

              {/* Edit/Change Image Icon */}
              {isEditing && (
                <IconButton
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                    color: 'primary.main',
                    p: '4px'
                  }}
                  size="medium"
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
              )}

              {/* Cancel Image Change Icon */}
              {isEditing && previewImage && (
                <IconButton
                  onClick={handleCancelProfileChange}
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 40,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                    color: 'error.main',
                    p: '4px'
                  }}
                  size="medium"
                >
                  <RotateLeftIcon fontSize="medium" />
                </IconButton>
              )}
            </Box>
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}>
              {isEditing ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{
                      bgcolor: colors.violet,
                    }}>
                    <FaSave /> Sauvegarder
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    color="error">
                    <FaTimes /> Annuler
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  sx={{
                    display: "flex",
                    color: colors.violet,
                  }}
                >
                  <FaEdit /> Modifier mes informations
                </Button>
              )}
            </div>
          </Box>

          {/* Partie droite - Infos */}
          <Box sx={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "end",
            gap: 1,
            marginLeft: "12px",
          }}>
            <div style={{ marginBottom: "15px", width: "100%" }}>
              <span style={{ fontWeight: "bold" }}><FaUser /> Nom :  </span>
              <input
                type="text"
                name="name"
                value={formData.nom}
                onChange={handleChange}
                style={inputStyle}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold" }}><FaPhone /> Téléphone : </span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold" }}><FaStore /> Boutique : </span>
              <input
                type="text"
                name="boutique"
                value={formData.boutique}
                onChange={handleChange}
                style={inputStyle}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold" }}><FaEnvelope /> Compte bancaire : </span>
              <input
                type="text"
                name="text"
                value={formData.compteBancaire}
                onChange={handleChange}
                style={inputStyle}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold" }}><FaEnvelope /> Email : </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold" }}><FaStore /> Type de vendeur : </span>
              <select
                value={formData.type}
                name="type"
                onChange={handleChange}
                style={selectStyle}
                disabled={!isEditing}
              >
                <option value="Particulier">Particulier</option>
                <option value="Entreprise">Entreprise</option>
              </select>
            </div>
          </Box>
        </Box>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container >
  );
};

// Styles
const inputStyle = {
  width: "95%",
  padding: "5px",
  paddingTop: "10px",
  marginTop: "0px",
  borderTop: "0px",
  borderLeft: "0px",
  borderRight: "0px",
  fontSize: "16px",
  backgroundColor: "transparent",
  outline: "none",
};

const selectStyle = {
  width: "97%",
  padding: "5px",
  paddingTop: "10px",
  appearance: "none",
  border: "2px solid #000",
  backgroundImage: "none",
  fontSize: "16px",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  backgroundColor: "transparent",
  outline: "none",
}

export default SellerProfile;
