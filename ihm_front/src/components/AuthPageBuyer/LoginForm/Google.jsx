import React from "react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup } from "./firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Google() {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const email = user.email;
        // alert(`Bienvenue ${user.displayName}`);

        try {
          const response = await axios.get(
            `https://localhost:7091/api/Acheteur/Connexion/Google${email}`
          );

          const data = response.data;

          if (data && data.idPersonne && data.email) {
            const userLocal = {
              idpersonnelocal: data.idPersonne,
              emaillocal: data.email,
              rolelocal: "acheteur"
            };

            localStorage.setItem("userlocal", JSON.stringify(userLocal));

            navigate("/articles");
          } else {
            // alert("Utilisateur introuvable.");
            Swal.fire({
                                            title: 'Erreur !',
                                            text: 'echec de connexion!',
                                            icon: 'error',
                                            confirmButtonColor: '#6A0DAD',
                                            confirmButtonText: 'OK'
                                          });
          }
        } catch (error) {
          console.error("Erreur lors de la requête backend :", error);
          // alert("Erreur lors de la vérification.");
                      Swal.fire({
                                            title: 'Erreur !',
                                            text: 'echec de connexion !',
                                            icon: 'error',
                                            confirmButtonColor: '#6A0DAD',
                                            confirmButtonText: 'OK'
                                          });
        }
      })
      .catch((error) => {
        console.error("Erreur Google Auth :", error);
        // alert("Échec de la connexion !");
                    Swal.fire({
                                            title: 'Erreur !',
                                            text: 'erreur de verificatiton de google!',
                                            icon: 'error',
                                            confirmButtonColor: '#6A0DAD',
                                            confirmButtonText: 'OK'
                                          });
      });
  };

  return (
    <Button
      fullWidth
      startIcon={<FcGoogle size={24} />}
      onClick={handleGoogleSignIn}
      sx={{
        mb: 1,
        backgroundColor: "#FFF8DC",
        color: "#6A0DAD",
        "&:hover": {
          backgroundColor: "#f5deb3",
        },
      }}
    >
      Continuer avec Google
    </Button>
  );
}

export default Google;
