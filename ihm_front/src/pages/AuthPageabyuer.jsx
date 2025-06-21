// import React, { useState } from "react";
// import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
// // import AuthLeft from "../components/authpage/AuthLeft";
// // import LoginForm from "../components/authpage/LoginForm";
// // import RegisterForm from "../components/authpage/RegisterForm";
// import AuthLeft from "../components/AuthPageBuyer/AuthLeft";
// import LoginForm from "../components/AuthPageBuyer/LoginForm";
// import RegisterForm from "../components/AuthPageBuyer/RegisterForm";

// const AuthPageBuyer = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const [tab, setTab] = useState(0);

//   const handleChangeTab = (_, newValue) => setTab(newValue);

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: isMobile ? "column" : "row" }}>
//       {!isMobile && <AuthLeft />}
//       <Box
//         sx={{
//           width: isMobile ? "100%" : "50%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           p: 4,
//         }}
//       >
//        <Tabs
//             value={tab}
//             onChange={handleChangeTab}
//             centered
//             textColor="inherit"
//             TabIndicatorProps={{ style: { backgroundColor: "#6A0DAD" } }}
//             sx={{
//                 "& .MuiTab-root": {
//                 color: "#6A0DAD", // couleur du texte
//                 fontWeight: "bold",
//                 },
//                 "& .Mui-selected": {
//                 color: "#6A0DAD", // couleur du texte actif
//                 },
//             }}
//             >
//             <Tab label="Connexion" />
//             <Tab label="Inscription" />
//         </Tabs>


//         {tab === 0 ? <LoginForm switchToRegister={() => setTab(1)} /> : <RegisterForm />}
//       </Box>
//     </Box>
//   );
// };

// export default AuthPageBuyer;
import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthLeft from "../components/AuthPageBuyer/AuthLeft";
import LoginForm from "../components/AuthPageBuyer/LoginForm";
import RegisterForm from "../components/AuthPageBuyer/RegisterForm";

const AuthPageBuyer = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleChangeTab = (_, newValue) => setTab(newValue);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: isMobile ? "column" : "row", position: "relative" }}>
      {!isMobile && <AuthLeft />}

      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          position: "relative", // Pour positionner le bouton dans ce bloc
        }}
      >
        {/* Icône retour */}
        <Tooltip title="Retour à la page d'accueil">
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              position: "absolute",
              top: isMobile ? 8 : 16,
              left: isMobile ? 8 : 16,
              color: "#6A0DAD",
              zIndex: 10,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>

        <Tabs
          value={tab}
          onChange={handleChangeTab}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#6A0DAD" } }}
          sx={{
            "& .MuiTab-root": {
              color: "#6A0DAD",
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              color: "#6A0DAD",
            },
          }}
        >
          <Tab label="Connexion" />
          <Tab label="Inscription" />
        </Tabs>

        {tab === 0 ? <LoginForm switchToRegister={() => setTab(1)} /> : <RegisterForm />}
      </Box>
    </Box>
  );
};

export default AuthPageBuyer;
