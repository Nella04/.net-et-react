import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

//component
import Navbar from "./components/Navbar";

//import FormulaireEmail from "./components/mail/FormulaireEmail";
import FormulaireEmail from "./components/mail/FormulaireEmail";

//page
import Apropos from "./pages/Apropos";
import Accueil from "./pages/Accueil";
import Articles from "./pages/Articles";
import Vendeurs from "./pages/Vendeurs";
import AuthPage from "./pages/AuthPage";
import AuthPageBuyer from "./pages/AuthPageabyuer";
import CommandeLayout from "./utils/commande/CommandeLayout";
import MonCompte from "./pages/acheteur/MonCompte";
import SellerPage from "./pages/sellerPage/SellerPage";
import AjoutArticle from "./pages/AjoutArticle";
import CommandList from "./pages/commandepay";
import OrderList from "./pages/paimentcommande";

const colors = {
  primary: "#6A0DAD", // violet
  secondary: "#FFD700", // jaune  
  background: "#FFF8DC", // jaune clair
};



export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/vendeurs" element={<Vendeurs />} />
          <Route path="/authentification" element={<AuthPage />} />
          <Route path="/authentification acheteur" element={<AuthPageBuyer />} />
          {/* Diary */}
          <Route path="/acheteur" element={<MonCompte />} />
          <Route path="/commande" element={<CommandeLayout />} />
          <Route path="/seller" element={<SellerPage />} />
          {/* Diary */}
          <Route path="/ajout article" element={<AjoutArticle />} />
          <Route path="/ss" element={<CommandList />} />
          <Route path="/s" element={<OrderList />} />
          <Route path="/a" element={<FormulaireEmail/>} />

        </Routes>
      </div>
    </Router>
  );
}
