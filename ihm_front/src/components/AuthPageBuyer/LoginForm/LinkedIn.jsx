import React from "react"; 
import { Button } from "@mui/material"; // <-- Il manquait cette ligne !
import { FcGoogle } from "react-icons/fc"; 
import { FaLinkedin } from "react-icons/fa"; 

function LinkedIn(){
    return(
        <Button
        fullWidth
        startIcon={<FaLinkedin size={24} color="#0077B5" />}
        sx={{
          backgroundColor: "#FFF8DC",
          color: "#6A0DAD",
          "&:hover": {
            backgroundColor: "#f5deb3",
          },
        }}
      >
        Continuer avec LinkedIn
      </Button> 
    )
}

export default LinkedIn;