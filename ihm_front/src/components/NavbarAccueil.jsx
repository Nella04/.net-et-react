import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment"; 
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; 
import GroupIcon from "@mui/icons-material/Group";
import WebIcon from "@mui/icons-material/Web";

const colors = {
  violet: "#6A0DAD",
  jaune: "#FFD700",
  jauneClair: "#FFF8DC",
};



export default function NavbarAccueil() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const navigate = useNavigate();
  //jerena aloha hoe miexiste ve ??
  const user = JSON.parse(localStorage.getItem("userlocal"));

  
 const handleLogout = () => {
    // Suppression du localStorage
    localStorage.removeItem("userlocal");

    // Redirection après un petit délai
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };


// anle mpivarotra
  if (user && user.rolelocal === "vendeur") {
    return (
      <AppBar position="fixed" sx={{ backgroundColor: colors.violet , zIndex: 1300 }}>
        <Toolbar className="toolbar">
          {/* LOGO */}
          <Box className="logo" sx={{ backgroundColor: colors.jauneClair }}>
            <span className="e">e</span>
            <span className="plus">+</span>
            <span className="varotra">Varotra</span>
          </Box>
  
          {/* NAVIGATION */}
          <Box className="nav-links">
            <NavLink to="/" className="nav-link">
              <HomeIcon />
              <span className="nav-text">Accueil</span>
            </NavLink>
            <NavLink to="/apropos" className="nav-link">
              <InfoIcon />
              <span className="nav-text">À propos</span>
            </NavLink>
            <NavLink to="/articles" className="nav-link">
              <ShoppingCartIcon />
              <span className="nav-text">Articles</span>
            </NavLink>
            <NavLink to="/vendeurs" className="nav-link">
              <GroupIcon />
              <span className="nav-text">Vendeurs</span>
            </NavLink>
            {/* <NavLink to="/commande" className="nav-link">
              <AssignmentIcon />
              <span className="nav-text">Commande</span>
            </NavLink> */}
            {/* <NavLink to="/acheteur" className="nav-link">
              <PersonIcon />
              <span className="nav-text">Mon Compte</span>
            </NavLink> */}
            <NavLink to="/seller" className="nav-link">
              <WebIcon />
              <span className="nav-text">Ma Page</span>
            </NavLink>
          </Box>
  
          {/* SEARCH */}
          {/* <Box className="search-box">
            <InputBase placeholder="Rechercher…" className="search-input" startAdornment={<SearchIcon />} />
          </Box> */}
  
          {/* MENU DE CONNEXION */}
          <IconButton color="inherit" onClick={openMenu} className="menu-button">
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem 
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
            >Deconnexion</MenuItem>
            {/* <MenuItem onClick={() => {
                  closeMenu();
                  //console.log("booooom");
                  navigate("/authentification acheteur");
                }}>Connexion Acheteur</MenuItem> */}
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }

//anle acheteur zay efa miexiste
  if (user && user.rolelocal === "acheteur") {
    return (
      <AppBar position="fixed" sx={{ backgroundColor: colors.violet , zIndex: 1300 }}>
        <Toolbar className="toolbar">
          {/* LOGO */}
          <Box className="logo" sx={{ backgroundColor: colors.jauneClair }}>
            <span className="e">e</span>
            <span className="plus">+</span>
            <span className="varotra">Varotra</span>
          </Box>
  
          {/* NAVIGATION */}
          <Box className="nav-links">
            <NavLink to="/" className="nav-link">
              <HomeIcon />
              <span className="nav-text">Accueil</span>
            </NavLink>
            <NavLink to="/apropos" className="nav-link">
              <InfoIcon />
              <span className="nav-text">À propos</span>
            </NavLink>
            <NavLink to="/articles" className="nav-link">
              <ShoppingCartIcon />
              <span className="nav-text">Articles</span>
            </NavLink>
            <NavLink to="/vendeurs" className="nav-link">
              <GroupIcon />
              <span className="nav-text">Vendeurs</span>
            </NavLink>
            <NavLink to="/acheteur" className="nav-link">
              <PersonIcon />
              <span className="nav-text">Mon Compte</span>
            </NavLink>
          </Box>
  
          {/* SEARCH */}
          {/* <Box className="search-box">
            <InputBase placeholder="Rechercher…" className="search-input" startAdornment={<SearchIcon />} />
          </Box> */}
  
          {/* MENU DE CONNEXION */}
          <IconButton color="inherit" onClick={openMenu} className="menu-button">
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
            {/* <MenuItem 
                onClick={() => {
                  closeMenu();
                  //console.log("booooom");
                  navigate("/authentification");
                }}
            >Connexion Vendeur</MenuItem> */}
            <MenuItem onClick={() => {
                  closeMenu();
                  handleLogout();
                }}>Deconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <AppBar position="fixed" sx={{ backgroundColor: colors.violet , zIndex: 1300 }}>
      <Toolbar className="toolbar">
        {/* LOGO */}
        <Box className="logo" sx={{ backgroundColor: colors.jauneClair }}>
          <span className="e">e</span>
          <span className="plus">+</span>
          <span className="varotra">Varotra</span>
        </Box>

        {/* NAVIGATION */}
        <Box className="nav-links">
          <NavLink to="/" className="nav-link">
            <HomeIcon />
            <span className="nav-text">Accueil</span>
          </NavLink>
          <NavLink to="/apropos" className="nav-link">
            <InfoIcon />
            <span className="nav-text">À propos</span>
          </NavLink>
          <NavLink to="/articles" className="nav-link">
            <ShoppingCartIcon />
            <span className="nav-text">Articles</span>
          </NavLink>
          <NavLink to="/vendeurs" className="nav-link">
            <GroupIcon />
            <span className="nav-text">Vendeurs</span>
          </NavLink>
        </Box>

        {/* SEARCH */}
        {/* <Box className="search-box">
          <InputBase placeholder="Rechercher…" className="search-input" startAdornment={<SearchIcon />} />
        </Box> */}

        {/* MENU DE CONNEXION */}
        <IconButton color="inherit" onClick={openMenu} className="menu-button">
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem 
              onClick={() => {
                closeMenu();
                //console.log("booooom");
                navigate("/authentification");
              }}
          >Connexion Vendeur</MenuItem>
          <MenuItem onClick={() => {
                closeMenu();
                //console.log("booooom");
                navigate("/authentification acheteur");
              }}>Connexion Acheteur</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );

  
}
