import React, { useEffect, useState } from "react";
import PersonalInfo from "../../components/acheteur/PersonalInfo";
import fakeAcheteur from "../../components/acheteur/fakeAcheteur";
import DashboardMonCompte from "../../components/acheteur/DashboardMonCompte";
import SecurityPage from "../../components/acheteur/SecurityPage";
import CheckAcheteurGuard from "../../components/session/CheckacheteurGuard";
import CommandeTableActions from "../../components/acheteur/CommandeAcheteurActions";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import ResponsiveSidebarAcheteur from "../../components/acheteur/ResponsiveSidebarAcheteur";

const theme = createTheme();

const MonCompte = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUser(fakeAcheteur);
    }, 50);
  }, []);

  const renderContent = () => {
    if (currentPage === "info" && user) {
      return <PersonalInfo user={user} />;
    }
    if (currentPage === "dashboard") {
      return <DashboardMonCompte />;
    }
    if (currentPage === "orders" && user) {
      return <CommandeTableActions />;
    }
    if (currentPage === "security") {
      return <SecurityPage />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <CheckAcheteurGuard />
        <CssBaseline />
        <ResponsiveSidebarAcheteur
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
export default MonCompte;
