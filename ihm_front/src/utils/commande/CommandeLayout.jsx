import React, { useState } from "react";
import PageCommande from "../../pages/commande/PageCommande";
import SidebarCommande from "../../components/commande/SidebarCommande";
import CheckVendeurGuard from "../../components/session/CheckVendeurGuard";

const CommandeLayout = () => {
    const [filtreEtat, setFiltreEtat] = useState ("all"); 
    return (
        <div style={{
            display : "flex",
            height : "100vh", 
            overflow : "hidden"
        }}><CheckVendeurGuard/>
            <SidebarCommande onFilter={setFiltreEtat} />
            <div style={{
                flex : 1
            }}>
                <PageCommande filtreEtat={filtreEtat} />
            </div>
        </div>
    ); 
}; export default CommandeLayout; 