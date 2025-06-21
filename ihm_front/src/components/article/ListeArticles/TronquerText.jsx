
import React from "react";

function tronquerText(texte){
    if(!texte)return'';
    return texte.length>35 ? texte.slice(0,35)+ '...':texte;
  };

export default tronquerText;