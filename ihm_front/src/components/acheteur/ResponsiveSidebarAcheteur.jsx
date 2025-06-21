import React, { useState } from "react";
import styled from "styled-components";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecurityIcon from "@mui/icons-material/Security"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

// --- STYLES ---
const SidebarWrapper = styled(Box)`
  width: 250px;
  background-color: #6a0dad;
  padding: 1rem;
  box-sizing: border-box;
  border-right: 2px solid #ddd;
  height: 92vh;
  margin-top : 57px;
`;

const Title = styled.h2`
  color: #6a0dad;
  font-size: 25px;
  margin-bottom: 25px;
  margin-top: 30px;
  border-radius: 4px;
  background-color: #ffd700;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

const MenuButton = styled(IconButton)`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1301;
  background-color: white;
  border: 1px solid #ccc;
`;

const ResponsiveSidebarAcheteur = ({ onNavigate, activePage }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Gérer le clic sur un item
  const handleNavClick = (page) => {
    onNavigate(page);
    if (isMobile) setOpen(false);
  };

  const SdAcheteur = (
    <SidebarWrapper>
      <Typography
        sx={{
            bgcolor : '#ffd700',
            color : '#6a0dad',  
            textAlign : 'center', 
            marginTop : 3, 
            padding : 1.6, 
            borderRadius : 1.5
        }} >
        Espace Client
      </Typography>
      <NavList>
        <NavItem
          $active={activePage === "dashboard"}
          onClick={() => handleNavClick("dashboard")}
        >
          <DashboardIcon />
          Tableau de bord
        </NavItem>

        <NavItem
          $active={activePage === "info"}
          onClick={() => handleNavClick("info")}
        >
          <AccountCircleIcon />
          Espace personnel
        </NavItem>

        <NavItem
          $active={activePage === "orders"}
          onClick={() => handleNavClick("orders")}
        >
          <ReceiptLongIcon />
          Mes commandes
        </NavItem>

        <NavItem
          $active={activePage === "security"}
          onClick={() => handleNavClick("security")}
        >
          <SecurityIcon />
          Securité
        </NavItem>

      </NavList>
    </SidebarWrapper>
  );

  return (
    <>
      {isMobile && (
        <MenuButton 
            onClick={() => setOpen(!open)}
            sx={{
                position : "fixed", 
                top : "60px", 
                left : "2px", 
                zIndex : 1400, 
            }} 
            >
                {open ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
      )}

      {isMobile ? (
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          {SdAcheteur}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: "250px",
            flexShrink: 0,
          }}
        >
          {SdAcheteur}
        </Box>
      )}
    </>
  );
};

export default ResponsiveSidebarAcheteur;