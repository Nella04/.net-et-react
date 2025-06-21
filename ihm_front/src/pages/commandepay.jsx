import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  useTheme
} from '@mui/material';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import { VioletButton, YellowButton } from '../components/commandepay/StyledComponents';
import { CommandTable } from '../components/commandepay/CommandTable';
import { PaymentSummary } from '../components/commandepay/PaymentSummary';
import { PaymentModal } from '../components/commandepay/PaymentModal';

const CommandList = () => {
  const [commands, setCommands] = useState([]);
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [cardCode, setCardCode] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [receiptUrl, setReceiptUrl] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('https://localhost:7091/api/Commande/GroupByStatusvalide');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCommands(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommands();
  }, []);

  const handleSelectCommand = (commandId) => {
    const selectedIndex = selectedCommands.indexOf(commandId);
    let newSelected = [...selectedCommands];

    if (selectedIndex === -1) {
      newSelected.push(commandId);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedCommands(newSelected);
  };

  const toggleRowExpand = (commandId) => {
    setExpandedRows(prev => ({
      ...prev,
      [commandId]: !prev[commandId]
    }));
  };

  const calculateTotal = () => {
    return selectedCommands.reduce((total, commandId) => {
      const command = commands.find(c => c.idCommande === commandId);
      return total + (command ? command.total : 0);
    }, 0);
  };

  const handlePayment = () => {
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setCardCode('');
  };

//   const generateReceipt = () => {
//     const doc = new jsPDF();
    
//     // Add title
//     doc.setFontSize(20);
//     doc.setTextColor(106, 13, 173);
//     doc.text('Reçu de Paiement', 105, 20, null, null, 'center');
    
//     // Add date
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    
//     // Add commands
//     let yPosition = 50;
//     doc.setFontSize(14);
//     doc.text('Commandes payées:', 14, 40);

//     selectedCommands.forEach(commandId => {
//       const command = commands.find(c => c.idCommande === commandId);
//       if (command) {
//         doc.setFontSize(12);
//         doc.text(`Commande: ${command.idCommande}`, 14, yPosition);
//         doc.text(`Montant: ${command.total.toLocaleString()} Ar`, 14, yPosition + 10);
//         yPosition += 20;
//       }
//     });
    
//     // Add total
//     doc.setFontSize(14);
//     doc.text(`Total: ${calculateTotal().toLocaleString()} Ar`, 14, yPosition + 10);
    
//     // Add thank you message
//     doc.setFontSize(12);
//     doc.text('Merci pour votre achat!', 105, yPosition + 30, null, null, 'center');
    
//     return doc.output('datauristring');
//   };

const generateReceipt = async (selectedCommands) => {
    const doc = new jsPDF();
    
    // Couleurs
    const violet = "#6A0DAD";
    const jaune = "#FFD700";
    const jauneClair = "#FFF8DC";
  
    // Logo et en-tête
    doc.setFillColor(jauneClair);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(violet);
    doc.text("MarketPlace Pro", 105, 20, { align: 'center' });
    
    // Sous-titre
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Une plateforme d'achat et de vente d'articles", 105, 28, { align: 'center' });
    doc.text("Achetez des articles au meilleur prix, ou devenez vendeur pour booster vos revenus !", 105, 33, { align: 'center' });
    
    // Ligne de séparation
    doc.setDrawColor(violet);
    doc.setLineWidth(0.5);
    doc.line(15, 40, 195, 40);
  
    // Récupération des données utilisateur
    const userData = JSON.parse(localStorage.getItem("userlocal"));
    const acheteurResponse = await fetch(`https://localhost:7091/api/Acheteur/Connexion/Google${userData.emaillocal}`);
    const acheteurData = await acheteurResponse.json();
  
    // Section Informations Acheteur
    doc.setFontSize(14);
    doc.setTextColor(violet);
    doc.text("Informations Acheteur", 15, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${acheteurData.nom}`, 15, 60);
    doc.text(`Email: ${acheteurData.email}`, 15, 65);
    doc.text(`Téléphone: ${acheteurData.telephone || 'Non spécifié'}`, 15, 70);
    doc.text(`Compte bancaire: ${acheteurData.compteBancaire}`, 15, 75);
  
    let yPosition = 85;
  
    // Pour chaque commande sélectionnée
    for (const commandId of selectedCommands) {
      const commandeResponse = await fetch(`https://localhost:7091/api/Commande/${commandId}`);
      const commandeData = await commandeResponse.json();
      
      const articleResponse = await fetch(`https://localhost:7091/api/Articles/${commandeData.idArticle}`);
      const articleData = await articleResponse.json();
  
      // Section Commande
      doc.setFontSize(14);
      doc.setTextColor(violet);
      doc.text("Détails de la Commande", 15, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Date: ${commandeData.dateCommande}`, 15, yPosition);
      doc.text(`Référence: ${commandeData.idCommande}`, 15, yPosition + 5);
      doc.text(`Quantité: ${commandeData.quantite}`, 15, yPosition + 10);
      yPosition += 20;
  
      // Section Article
      doc.setFontSize(14);
      doc.setTextColor(violet);
      doc.text("Article Acheté", 15, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.text(`Nom: ${articleData.article.nomArticle}`, 15, yPosition);
      doc.text(`Description: ${articleData.article.description}`, 15, yPosition + 5);
      doc.text(`Marque: ${articleData.article.marque}`, 15, yPosition + 10);
      doc.text(`Catégorie: ${articleData.article.categorie}`, 15, yPosition + 15);
      doc.text(`Prix unitaire: ${articleData.article.prix.toLocaleString()} Ar`, 15, yPosition + 20);
      doc.text(`Total: ${(articleData.article.prix * commandeData.quantite).toLocaleString()} Ar`, 15, yPosition + 25);
      yPosition += 35;
  
      // Section Vendeur
      doc.setFontSize(14);
      doc.setTextColor(violet);
      doc.text("Informations Vendeur", 15, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.text(`Nom: ${articleData.vendeur.nom}`, 15, yPosition);
      doc.text(`Email: ${articleData.vendeur.email}`, 15, yPosition + 5);
      doc.text(`Téléphone: ${articleData.vendeur.telephone || 'Non spécifié'}`, 15, yPosition + 10);
      doc.text(`Type: ${articleData.vendeur.type}`, 15, yPosition + 15);
      yPosition += 25;
  
      // Ligne de séparation entre les commandes
      if (commandId !== selectedCommands[selectedCommands.length - 1]) {
        doc.setDrawColor(jaune);
        doc.setLineWidth(0.3);
        doc.line(15, yPosition, 195, yPosition);
        yPosition += 10;
      }
    }
  
    // Total général
    doc.setFontSize(14);
    doc.setTextColor(violet);
    doc.text("Total Général", 150, yPosition);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`${calculateTotal(selectedCommands, commands).toLocaleString()} Ar`, 180, yPosition, { align: 'right' });
    yPosition += 15;
  
    // Remerciement
    doc.setFontSize(12);
    doc.setTextColor(violet);
    doc.text("Merci pour votre confiance !", 105, yPosition, { align: 'center' });
    doc.text("Votre satisfaction est notre priorité.", 105, yPosition + 5, { align: 'center' });
    yPosition += 15;
  
    // Contacts
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Contactez-nous:", 15, yPosition);
    doc.text("Email: contact@marketplacepro.mg", 15, yPosition + 5);
    doc.text("LinkedIn: linkedin.com/company/marketplacepro", 15, yPosition + 10);
    doc.text("Facebook: facebook.com/marketplacepro", 15, yPosition + 15);
  
    // Pied de page
    doc.setFillColor(jauneClair);
    doc.rect(0, 280, 210, 20, 'F');
    doc.setFontSize(8);
    doc.setTextColor(violet);
    doc.text("© 2025 MarketPlace Pro - Tous droits réservés", 105, 287, { align: 'center' });
  
    return doc.output('datauristring');
  };


  const handleConfirmPayment = async () => {
    if (!cardCode.trim()) {
      alert('Veuillez entrer votre code de carte bancaire');
      return false;
    }
  
    // Génère le reçu PDF
    const receiptUrl = await generateReceipt(selectedCommands);
    
    // Prepare data for API
    const paymentData = selectedCommands.map(commandId => {
      const command = commands.find(c => c.idCommande === commandId);
      return {
        idPaiement: `pay-${commandId}-${Date.now()}`,
        datePaiement: new Date().toISOString().split('T')[0],
        idCommande: commandId,
        recu: receiptUrl
      };
    });
  
    console.log('Data to be sent to API:', paymentData);
    
    return receiptUrl;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress style={{ color: "#6A0DAD" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">Erreur: {error}</Typography>
      </Box>
    );
  }

  if (commands.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h6">Aucune commande valide trouvée</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#FFF8DC", minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#6A0DAD" }}>
          Mes Commandes Validées
        </Typography>
      </motion.div>

      <CommandTable
        commands={commands}
        selectedCommands={selectedCommands}
        expandedRows={expandedRows}
        handleSelectCommand={handleSelectCommand}
        toggleRowExpand={toggleRowExpand}
        setSelectedCommands={setSelectedCommands}
        handlePayment={handlePayment}
      />

      {selectedCommands.length > 0 && (
        <PaymentSummary
          selectedCommands={selectedCommands}
          commands={commands}
          calculateTotal={calculateTotal}
          handlePayment={handlePayment}
        />
      )}

            <PaymentModal
            openPaymentModal={openPaymentModal}
            handleClosePaymentModal={() => {
                setOpenPaymentModal(false);
                setCardCode('');
                setReceiptUrl('');
                window.location.reload();//satria tokony miala teo iny commande iny
            }}
            calculateTotal={calculateTotal}
            cardCode={cardCode}
            setCardCode={setCardCode}
            handleConfirmPayment={() => {
                const url = handleConfirmPayment();
                if (url) {
                setReceiptUrl(url);
                return true;
                }
                return false;
            }}
            receiptUrl={receiptUrl}
            />
    </Box>
  );
};

export default CommandList;