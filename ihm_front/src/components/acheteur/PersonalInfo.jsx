import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { EditIcon, SaveIcon, UndoIcon } from "lucide-react";
import { Button } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// --- S T Y L E S ---

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  color: #555;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Value = styled.span`
  color: #374151;
  font-size: 16px;
  background-color: #fff;
  padding: 8px 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? "#f7f7f7" : "white")};
  color: ${({ disabled }) => (disabled ? "#888" : "#000")};
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #7a42f4;
    box-shadow: 0 0 0 2px rgba(122, 66, 244, 0.2);
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-left: 0;

  button {
    margin-left: 0 !important;
  }

  @media (min-width: 769px) {
    justify-content: flex-start;
    margin-left: 250px;
    button {
      margin-left: 20px !important;
    }
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const ProfilePicture = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 700px;
  max-width: 90vw;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    margin-top: 30px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  flex-direction: column;
  gap: 15px;
  display: flex;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
  color: #333;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 30px;
    font-size: 20px;
  }
`;

const colors = {
  violet: "#6A0DAD",
  yellow: "#FFD700",
  lightYellow: "#FFF8DC",
};

//--- C  O M P O S A N T S ---
const defaultData = {
  nom: "",
  email: "",
  phone: "",
  compteBancaire: "",
  profile: null,
  previewImage: null,
};

const PersonalInfo = () => {
  const fields = ["nom", "email", "compteBancaire", "phone"];
  const [user, setUser] = useState("");
  const [info, setInfo] = useState([]);
  const [formData, setFormData] = useState({ ...defaultData, ...info });
  const [originalData, setOriginalData] = useState({
    ...defaultData,
    ...info,
  });
  const [isEditing, setIsEditing] = useState(false);
  const profileInput = useRef(null);

  useEffect(() => {
    const personneString = localStorage.getItem("userlocal");
    if (personneString) {
      const personne = JSON.parse(personneString);
      const id = personne.idpersonnelocal;
      setUser(id);
      axios
        .get(`https://localhost:7091/api/Acheteur/${id}`)
        .then((res) => {
          const response = res.data;
          setInfo(response);
          const imageBase64 = response.profile
            ? `data:image/jpeg;base64,${response.profile}`
            : null;
          setOriginalData({
            ...response,
            previewImage: imageBase64,
          });
          setFormData({
            ...response,
            previewImage: imageBase64,
          });
        })
        .catch((error) => {
          console.error("Erreur lors de la chargement des commandes: ", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleEditProfilePic = () => {
    if (profileInput.current) {
      profileInput.current.click();
    }
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profile: reader.result.split(",")[1],
        previewImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
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

  const handleSave = () => {
    axios
      .put(`https://localhost:7091/api/Acheteur/${user}`, formData)
      .then(() => {
        setInfo(formData);
        setOriginalData(formData);
        setIsEditing(false);
        toast.success("Modification enregistrée");
      })
      .catch((error) => {
        console.error("Erreur: ", error);
        toast.error("Echec de la modification");
      });
  };
  return (
    <div style={{ backgroundColor : '#FFF8DC'}}>
      <Title>Informations personnelles</Title>
      <ProfileCard>
        <ProfilePicture>
          <ProfileImage src={formData.previewImage} alt="Photo de profil" />
          {isEditing && (
            <Button variant="cancel" onClick={handleEditProfilePic}>
              <EditIcon />
            </Button>
          )}
        </ProfilePicture>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          style={{ display: "none" }}
          ref={profileInput}
          onChange={handleImageChange}
        />

        <ProfileInfo>
          {fields.map((field) => (
            <InfoGroup key={field}>
              <Label>
                {" "}
                {
                  {
                    nom: "Nom complet",
                    email: "Email",
                    phone: "Téléphone",
                    compteBancaire: "Nº Compte bancaire",
                  }[field]
                }{" "}
              </Label>
              {isEditing ? (
                <Input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <Value>{formData[field]}</Value>
              )}
            </InfoGroup>
          ))}
        </ProfileInfo>
      </ProfileCard>

      <ButtonGroup>
        {isEditing ? (
          <>
            <Button
              style={{ marginLeft: "150px" }}
              variant="contained"
              sx={{
                backgroundColor: colors.violet,
              }}
              onClick={handleSave}
            >
              <SaveIcon />
              Enregistrer
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              <UndoIcon />
              Annuler
            </Button>
          </>
        ) : (
          <Button
            style={{ marginLeft: "150px" }}
            variant="contained"
            sx={{
              backgroundColor: colors.violet,
            }}
            onClick={handleEdit}
          >
            <EditIcon />
            Modifier les informations
          </Button>
        )}
      </ButtonGroup>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default PersonalInfo;
