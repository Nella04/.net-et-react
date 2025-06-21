import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// --- S T Y L E S ---
const Container = styled.div`
  margin-top: 20px;
  padding: 0rem;
`;
const Table = styled.table`
  background-color: white;
  border-collapse: collapse;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
`;

const Th = styled.th`
  background-color: #6a0dad;
  color: white;
  font-weight: 600;
  padding: 0.95rem;
  text-align: left;
`;

const Td = styled.td`
  border-bottom: 1px solid #eaeaea;
  padding: 1rem;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f3f3f3;
  }
`;

// --- C O M P O S A N T S ---
const TableCommande = ({ onEdit, reloadFlag }) => {
  const [commandes, setCommandes] = useState([]);

  const fetchCommandes = () => {
    axios
      .get(`https://localhost:7091/api/Commande`)
      .then((res) => {
        setCommandes(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de l'appel de l'API", err);
      });
  };

  useEffect(() => {
    fetchCommandes();
  }, [reloadFlag]);

  const handleDelete = (idCommande) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette commande?")) {
      axios
        .delete(`https://localhost:7091/api/Commande/${idCommande}`)
        .then(() => {
          toast.success("Commande supprimée avec succés");
          setCommandes((prev) =>
            prev.filter((c) => c.idCommande !== idCommande)
          );
        })
        .catch((error) => {
          console.error("Erreur de suppression: ", error);
          toast.error("Echec de la suppression");
        });
    }
  };

  return (
    <Container>
      <Table>
        <thead>
          <Tr>
            <Th>Référence</Th>
            <Th>Date</Th>
            <Th>Etat</Th>
            <Th>Quantite</Th>
            <Th>Code Article</Th>
            <Th>Acheteur</Th>
            <Th>Vendeur</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {commandes.map((cmd) => (
            <Tr key={cmd.idCommande}>
              <Td>{cmd.idCommande}</Td>
              <Td>{cmd.dateCommande}</Td>
              <Td>{cmd.etatCommande}</Td>
              <Td>{cmd.quantite}</Td>
              <Td>{cmd.idArticle}</Td>
              <Td>{cmd.idAcheteur}</Td>
              <Td>{cmd.idVendeur}</Td>
              <Td>
                <Button
                  onClick={() => {
                    onEdit(cmd);
                  }}
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                ></Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleDelete(cmd.idCommande);
                  }}
                  color="error"
                  startIcon={<DeleteIcon />}
                ></Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};
export default TableCommande;
