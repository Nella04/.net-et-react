import React from "react";
import { useLocation } from "react-router-dom";
import NavbarAccueil from "./NavbarAccueil";

function Navbar() {
  const location = useLocation();

  const visiblePaths = ["/apropos", "/articles", "/vendeurs", "/commande", "/acheteur", "/seller"];

  return visiblePaths.includes(location.pathname) ? <NavbarAccueil /> : null;
}

export default Navbar;
