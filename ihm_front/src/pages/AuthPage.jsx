// // AuthPage.jsx
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   InputAdornment,
//   IconButton,
//   useMediaQuery,
//   Tabs,
//   Tab,
//   Divider,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import GoogleIcon from "@mui/icons-material/Google";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// const AuthPage = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [tab, setTab] = useState(0);

//   const handleTogglePassword = () => setShowPassword(!showPassword);
//   const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
//   const handleChangeTab = (_, newValue) => setTab(newValue);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         overflow: "hidden",
//         flexDirection: isMobile ? "column" : "row",
//       }}
//     >
//       {/* Partie gauche */}
//       {!isMobile && (
//         <Box
//           sx={{
//             width: "50%",
//             backgroundColor: "#6A0DAD",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "white",
//             p: 4,
//           }}
//         >
//           <Box textAlign="center">
//             <Typography variant="h4" gutterBottom>
//               Bienvenue sur
//             </Typography>
//             <Box
//               sx={{
//                 backgroundColor: "#FFF8DC",
//                 display: "inline-block",
//                 borderRadius: 2,
//                 px: 2,
//                 py: 1,
//               }}
//             >
//               <Typography variant="h5" fontWeight="bold">
//                 <span style={{ color: "#6A0DAD" }}>e</span>
//                 <span style={{ color: "#FFD700" }}>+</span>
//                 <span style={{ color: "#6A0DAD" }}>Varotra</span>
//               </Typography>
//             </Box>
//             <Typography variant="body1" mt={2}>
//               Une plateforme d'achat et de vente d'articles.
//               <br />
//               Devenez vendeur et boostez votre vente !
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       {/* Partie droite */}
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
//         <Tabs value={tab} onChange={handleChangeTab} centered>
//           <Tab label="Connexion" />
//           <Tab label="Inscription" />
//         </Tabs>

//         {tab === 0 && (
//           <motion.div
//             key="login"
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             style={{ width: "100%", maxWidth: 400 }}
//           >
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Adresse e-mail"
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Mot de passe"
//               variant="outlined"
//               type={showPassword ? "text" : "password"}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleTogglePassword}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ mt: 2, backgroundColor: "#6A0DAD" }}
//             >
//               Connexion
//             </Button>
//             <Divider sx={{ my: 2 }}>ou</Divider>
//             <Button
//               fullWidth
//               startIcon={<GoogleIcon />}
//               sx={{ mb: 1, backgroundColor: "#FFF8DC", color: "#6A0DAD" }}
//             >
//               Continuer avec Google
//             </Button>
//             <Button
//               fullWidth
//               startIcon={<LinkedInIcon />}
//               sx={{ backgroundColor: "#FFF8DC", color: "#6A0DAD" }}
//             >
//               Continuer avec LinkedIn
//             </Button>
//             <Typography variant="body2" mt={2} color="primary">
//               Mot de passe oublié ?
//             </Typography>
//             <Typography variant="body2" mt={2}>
//               Vous n'avez pas encore de compte ?
//               <Button onClick={() => setTab(1)} sx={{ ml: 1, color: "#6A0DAD" }}>
//                 Créer
//               </Button>
//             </Typography>
//           </motion.div>
//         )}

//         {tab === 1 && (
//           <motion.div
//             key="register"
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             style={{ width: "100%", maxWidth: 400 }}
//           >
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Adresse e-mail"
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Mot de passe"
//               variant="outlined"
//               type={showPassword ? "text" : "password"}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleTogglePassword}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Confirmer le mot de passe"
//               variant="outlined"
//               type={showConfirmPassword ? "text" : "password"}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleToggleConfirmPassword}>
//                       {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ mt: 2, backgroundColor: "#6A0DAD" }}
//             >
//               Inscription
//             </Button>
//             <Divider sx={{ my: 2 }}>ou</Divider>
//             <Button
//               fullWidth
//               startIcon={<GoogleIcon />}
//               sx={{ mb: 1, backgroundColor: "#FFF8DC", color: "#6A0DAD" }}
//             >
//               Continuer avec Google
//             </Button>
//             <Button
//               fullWidth
//               startIcon={<LinkedInIcon />}
//               sx={{ backgroundColor: "#FFF8DC", color: "#6A0DAD" }}
//             >
//               Continuer avec LinkedIn
//             </Button>
//           </motion.div>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default AuthPage;





import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, IconButton, Tooltip } from "@mui/material";
import AuthLeft from "../components/authpage/AuthLeft";
import LoginForm from "../components/authpage/LoginForm";
import RegisterForm from "../components/authpage/RegisterForm";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AuthPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [tab, setTab] = useState(0);
   const navigate = useNavigate();

  const handleChangeTab = (_, newValue) => setTab(newValue);

  return (
    
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: isMobile ? "column" : "row" }}>
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

export default AuthPage;

