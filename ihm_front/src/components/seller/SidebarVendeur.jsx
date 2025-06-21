import React from "react";
import styled from "styled-components";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecurityIcon from "@mui/icons-material/Security";

// ---  S T Y L E S ---
const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #6a0dad;
  padding: 20px;
  box-sizing: border-box;
  border-right: 2px solid #ddd;
  height: 100vh;
`;

const Title = styled.h2`
  color: #6a0dad;
  font-size: 25px;
  margin-bottom: 25px;
  margin-top: 60px;
  border-radius: 4px;
  background-color: #ffd700;
  height: 6vh;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 16px;
  align-items: center;
  line-height: 2.5;
  gap: 12px;
  background-color: ${({ $active }) => ($active ? "#FFD700" : "transparent")};
  color: ${({ $active }) => ($active ? "#4c1d95" : "white")};
  cursor: pointer;
  padding: 10px 15px;
  border: 1px solid rgb(127, 106, 248);
  border-radius: 8px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #ffd700;
    color: #4c1d95;
  }
  svg {
    vertical-align: middle;
  }
  span {
    display: inline-block;
    line-height: 1;
  }
`;

// --- C O M P O S A N T S ---
const SidebarVendeur = ({ onNavigate, activePage }) => {
  return (
    <SidebarWrapper>
      <Title>Ma Page</Title>
      <NavList>
        <NavItem
          $active={activePage === "dashboard"}
          onClick={() => onNavigate("dashboard")}
        >
          <DashboardIcon />
          Espace admin
        </NavItem>

        <NavItem
          $active={activePage === "article"}
          onClick={() => onNavigate("article")}
        >
          <ShoppingCartIcon />
          Mes produits
        </NavItem>

        <NavItem
          $active={activePage === "commande"}
          onClick={() => onNavigate("commande")}
        >
          <ReceiptLongIcon />
          Commandes
        </NavItem>

        <NavItem
          $active={activePage === "profile"}
          onClick={() => onNavigate("profile")}
        >
          <PersonIcon />
          Espace personnel
        </NavItem>

        <NavItem
          $active={activePage === "security"}
          onClick={() => onNavigate("security")}
        >
          <SecurityIcon />
          securité
        </NavItem>

        <NavItem
          $active={activePage === "logout"}
          onClick={() => onNavigate("logout")}
        >
          <LogoutIcon />
          Deconnexion
        </NavItem>
      </NavList>
    </SidebarWrapper>
  );
};
export default SidebarVendeur;
