import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AjoutCommande from "../../components/commande/AjoutCommande";
import TableCommande from "../../components/commande/TableCommande";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// --- S T Y L E S ---
const Container = styled.div`
  margin-top: 60px;
  padding: 2rem;
`;

const Overlay = styled.div`
  align-items: center;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Dialog = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  padding: 2rem;
  width: 500px;
`;

const PageCommande = ({ filtreEtat }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleOpenEditDialog = (commande) => {
    setSelectedCommande({
      id_commande: commande.id_commande,
      dateCommande: new Date(commande.dateCommande),
      etatCommande: commande.etatCommande,
      quantiteArticle: commande.quantiteArticle,
      codebar: commande.codebar,
      id_acheteur: commande.id_acheteur,
      id_vendeur: commande.id_vendeur,
    });
    setSelectedCommande(commande);
    setShowDialog(true);
  };

  const triggerReload = () => {
    setReloadFlag((prev) => !prev);
  };

  const handleOpenAddDialog = () => {
    setSelectedCommande(null);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCommande(null);
    setShowDialog(false);
  };

  const handleAddOrEditCommande = (newCommande, mode) => {
    if (mode === "edit") {
      triggerReload();
      setShowDialog(true);
    } else {
      triggerReload();
      setShowDialog(true);
    }
  };

  return (
    <Container>
      <Header>
        <Button
          onClick={() => setShowDialog(true)}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#5e35b1",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#864fb1",
            },
            ml: 0.2,
          }}
        >
          Ajouter
        </Button>
      </Header>

      {showDialog && (
        <Overlay onClick={() => setShowDialog(false)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <AjoutCommande //onAdd = {handleAddCommande}
              onCancel={() => setShowDialog(false)}
              open={showDialog}
              onClose={handleCloseDialog}
              onSubmit={handleAddOrEditCommande}
              selectedCommande={selectedCommande}
            />
          </Dialog>
        </Overlay>
      )}
      <TableCommande
        onEdit={handleOpenEditDialog}
        onAdd={handleOpenAddDialog}
        reloadFlag={reloadFlag}
      />
    </Container>
  );
};
export default PageCommande;
