import React, { useEffect, useState } from "react";
import DashboardVendeur from "../../components/seller/espaceAdmin/DashboardVendeur";
import GestionArticle from "../../components/seller/gestion_article/GestionArticle";
import SellerProfile from "../../components/seller/SellerProfile";
import fakeSeller from "../../components/seller/fakeSeller";
import CheckVendeurGuard from "../../components/session/CheckVendeurGuard";
import GestionCommande from "../../components/seller/GestionCommande";
import SecuritySeller from "../../components/seller/SecuritySeller";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveSidebarVendeur from "../../components/seller/ResponsiveSidebarVendeur";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const MaPage = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUser(fakeSeller);
    }, 50);
  }, []);

  const renderContent = () => {
    if (currentPage === "dashboard") {
      return <DashboardVendeur />;
    }

    if (currentPage === "commande") {
      return <GestionCommande />;
    }

    if (currentPage === "article") {
      return <GestionArticle />;
    }

    if (currentPage === "profile") {
      return <SellerProfile />;
    }

    if (currentPage === "security") {
      return <SecuritySeller />;
    }

    if (currentPage === "logout") {
      return <p>Deconnexion</p>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <CheckVendeurGuard />
        <CssBaseline />
        <ResponsiveSidebarVendeur
          isOpen={sidebarOpen}
          activePage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          onClose={() => setSidebarOpen(false)}
        />
      </ThemeProvider>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <h1>{currentPage === "info" ? " " : ""}</h1>
        {renderContent()}
      </Box>
    </Box>
  );
};
export default MaPage;
