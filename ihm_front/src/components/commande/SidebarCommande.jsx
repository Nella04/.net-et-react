import React from "react";
import styled from "styled-components";
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortIcon from '@mui/icons-material/Sort';
import { Button } from "@mui/material";

// --- Styles ---
const SidebarContainer = styled.div`
  width: 250px;
  background-color: #6A0DAD;
  padding: 0.7rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top : 60px; 
`;

const Section = styled.div`
  background-color: white;
  padding: 0.4em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SidebarCommande = ({ onFilter, onReset }) => {
  return (
    <SidebarContainer>
      <Section>
        <h4>Filtrer par état</h4>
        <Button fullWidth startIcon={<FilterListIcon />} onClick={() => onFilter("En attente")}>
          En attente
        </Button>
        <Button fullWidth startIcon={<FilterListIcon />} onClick={() => onFilter("Validée")}>
          Validée
        </Button>
        <Button fullWidth startIcon={<FilterListIcon />} onClick={() => onFilter("Annulée")}>
          Annulée
        </Button>
        <Button fullWidth startIcon={<RefreshIcon />} onClick={onReset}>
          Réinitialiser
        </Button>
      </Section>

      <Section>
        <h4>Trier</h4>
        <Button fullWidth startIcon={<SortIcon />}>Par date</Button>
        <Button fullWidth startIcon={<SortIcon />}>Par quantité</Button>
      </Section>

      <Section>
        <h4>Statistiques</h4>
        <p>Total : 10</p>
        <p>Validées : 4</p>
        <p>En attente : 5</p>
        <p>Annulées : 1</p>
      </Section>
    </SidebarContainer>
  );
};

export default SidebarCommande;