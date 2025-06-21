import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";

// --- S T Y L E S ---
const DialogWraper = styled.div`
  animation: fadeIn 0.3s ease;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: auto;
  padding: 2rem;
  position: relative;
  width: 450px;
  z-index: 20;
  @keyframes fadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Div = styled.div`
  display: flex;
  gap: 5%;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #3c3b9c;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.6rem;
`;

const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.6rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #4e4cb8;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  &:hover {
    background-color: #3c3b9c;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 2px solid #4e4cb8;
  border-radius: 6px;
  color: #4e4cb8;
  cursor: pointer;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const CloseIcon = styled.div`
  color: #555;
  cursor: pointer;
  font-size: 1.4rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  &:hover {
    background-color: #000;
  }
`;

const StyledDatePickerInput = styled.input`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #333;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem;
  width: 80%;

  &:focus {
    border-color: #4e4cb8;
    box-shadow: 0 0 0 2px rgba(78, 76, 184, 0.2);
    outline: none;
  }
`;

// --- C O M P O S A N T S ---
const AjoutCommande = ({
  selectedCommande,
  open,
  onclose,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    idCommande: "",
    dateCommande: new Date(),
    etatCommande: "En attente",
    quantite: "",
    idArticle: "",
    idAcheteur: "",
    idVendeur: "",
  });

  useEffect(() => {
    if (selectedCommande) {
      setForm({
        idCommande: selectedCommande.idCommande,
        dateCommande: selectedCommande.dateCommande
          ? new Date(selectedCommande.dateCommande)
          : new Date(),
        etatCommande: selectedCommande.etatCommande,
        quantite: selectedCommande.quantite,
        idArticle: selectedCommande.idArticle,
        idAcheteur: selectedCommande.idAcheteur,
        idVendeur: selectedCommande.idVendeur,
      });
    } else {
      resetForm();
    }
  }, [selectedCommande]);

  const resetForm = () => {
    setForm({
      idCommande: "",
      dateCommande: new Date(),
      etatCommande: "En attente",
      quantite: "",
      idArticle: "",
      idAcheteur: "",
      idVendeur: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, dateCommande: date });
    console.log("date:", form.dateCommande);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commandeData = {
      idCommande: form.idCommande,
      dateCommande: format(form.dateCommande, 'yyyy-MM-dd'),
      etatCommande: form.etatCommande,
      quantite: form.quantite,
      idArticle: form.idArticle,
      idAcheteur: form.idAcheteur,
      idVendeur: form.idVendeur,
    };

    try {
      if (selectedCommande) {
        await axios.put(`https://localhost:7091/api/Commande/${form.idCommande}`, commandeData);
        toast.success("Commande modifiée avec succés!");
      } else {
        await axios.post(`https://localhost:7091/api/Commande`, commandeData);
        toast.success("Commande ajoutée avec succés!");
      }
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement: ", error);
      toast.error("Echec de l'enregistrement!");
    } finally {
      resetForm();
    }

    if (!form.idAcheteur.trim()) {
      toast.error("Le client est obligatoire");
      return;
    }
  };

  if (!open) return null;

  return (
    <>
      <>
        {" "}
        {/* Mettre DialogWrapper dans la balise en cas de changement d'avis */}
        <CloseIcon onClick={onCancel}>&times;</CloseIcon>
        <h2>{selectedCommande ? "Modifier" : "Ajouter"}</h2>
        <Form onSubmit={handleSubmit}>
          <Div>
            <Input
              name="idCommande"
              type="hidden"
              value={form.idCommande || ""}
              onChange={handleChange}
            />

            <FieldGroup>
              <Label>Date de commande</Label>
              <DatePicker
                name="dateCommande"
                selected={form.dateCommande}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={<StyledDatePickerInput />}
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Etat de la commande</Label>
              <Select
                name="etatCommande"
                type="text"
                value={form.etatCommande || ""}
                onChange={handleChange}
                required
              >
                <option value="en attente">En attente</option>
                <option value="validee">Validée</option>
                <option value="annulee">Annulée</option>
                <option value="expediee">Expédiée</option>
              </Select>
            </FieldGroup>
          </Div>

          <Div>
            <FieldGroup>
              <Label>Quantité article</Label>
              <Input
                name="quantite"
                type="number"
                value={form.quantite || ""}
                onChange={handleChange}
                required
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Code barre</Label>
              <Input
                name="idArticle"
                type="text"
                value={form.idArticle || ""}
                onChange={handleChange}
                required
              />
            </FieldGroup>
          </Div>
          <Div>
            <FieldGroup>
              <Label>Id_Acheteur</Label>
              <Input
                name="idAcheteur"
                type="text"
                value={form.idAcheteur || ""}
                onChange={handleChange}
                required
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Id_Vendeur</Label>
              <Input
                name="idVendeur"
                type="text"
                value={form.idVendeur || ""}
                onChange={handleChange}
                required
              />
            </FieldGroup>
          </Div>

          <ButtonRow>
            <CancelButton type="button" onClick={onCancel}>
              Annuler
            </CancelButton>
            <SubmitButton type="submit" onClick={onSubmit}>
              {selectedCommande ? "Modifier" : "Ajouter"}
            </SubmitButton>
          </ButtonRow>
        </Form>
      </>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
export default AjoutCommande;
