import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Snackbar,
  Alert,
  CircularProgress,
  Slide,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [userInfo, setUserInfo] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  const fetchSellerInfo = async (idVendeur) => {
  try {
    const response = await axios.get(`https://localhost:7091/api/Vendeurs/${idVendeur}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du vendeur ${idVendeur}`, error);
    return null;
  }
};

  function CorrectionEtatCommande(mot){
  if (mot==="valide"){
    return "validé";
  }
  return mot;
};

  // aseho ny données
  useEffect(() => {
    const fetchOrders = async () => {
      try {
          // Récupérer l'acheteur depuis le localStorage
        const userLocalapi = JSON.parse(localStorage.getItem("userlocal"));
        const idAcheteurapi = userLocalapi?.idpersonnelocal;
       // const etat="validé";
        // const response = await axios.get(`https://localhost:7091/api/Commande/GroupByStatusvalide`);
        const response = await axios.get(`https://localhost:7091/api/Commande/GroupByPersonStatus${idAcheteurapi}/valide`);
        setOrders(response.data);
        console.log(response.data);
        
        // ho an'ny acheteur
        const userLocal = JSON.parse(localStorage.getItem("userlocal"));
        if (userLocal && userLocal.emaillocal) {
          const userResponse = await axios.get(`https://localhost:7091/api/Acheteur/Connexion/Google${userLocal.emaillocal}`);
          setUserInfo(userResponse.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
        showSnackbar('Error fetching orders', 'error');
      }
    };

    fetchOrders();
  }, []);

  // mombamban'ny commande
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const details = {};
      for (const orderId of selectedOrders) {
        try {
          const response = await axios.get(`https://localhost:7091/api/Commande/${orderId}`);
          details[orderId] = response.data;
          console.log("article",response.data);
        } catch (error) {
          console.error(`Error fetching details for order ${orderId}:`, error);
        }
      }
      setOrderDetails(details);
    };

    if (selectedOrders.length > 0) {
      fetchOrderDetails();
    }
  }, [selectedOrders]);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handlePaymentClick = () => {
    if (selectedOrders.length === 0) {
      showSnackbar('veiller introduire au moins un commande', 'warning');
      return;
    }
    setPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = async () => {
    if (!cardNumber.trim()) {
      showSnackbar('vellier entrez votre code ', 'error');
      return;
    }

    try {
      // generation de pdf
      // const pdf = await generateReceipt(); //vokatrilay async
      // // const pdf = generateReceipt();
      // const pdfBlob = pdf.output('blob');
      // const pdfBase64 = await blobToBase64(pdfBlob);

      const pdf = await generateReceipt(); // ⚠️ ajout du await
    const pdfBlob = pdf.output('blob');
    const pdfBase64 = await blobToBase64(pdfBlob);

      // atao paiement amin'ny commande rehetra
      const paymentData = selectedOrders.map(orderId => {
        const order = orders.find(o => o.idCommande === orderId);
        return {
          idPaiement: `pay-${orderId}`,
          datePaiement: new Date().toISOString().split('T')[0],
          idCommande: orderId,
          recu: pdfBase64.split(',')[1] // Remove data:application/pdf;base64, prefix
        };
      });

      // données atao amin'ny paiment jerena hoe mety ve
      console.log('Payment data ready to be sent:', paymentData);

      // for (const payment of paymentData) {
      //   await axios.post('https://localhost:7091/api/Paiement', payment);
      // }

      for (const payment of paymentData) {
      // 1. Insertion du paiement
      await axios.post('https://localhost:7091/api/Paiement', payment);

      // 2. Récupération de la commande associée
      const order = orders.find(o => o.idCommande === payment.idCommande);

      // 3. Extraction des données de l'article (s'il y en a un)
      const article = order.articles[0]; // en supposant qu’il n’y a qu’un seul article
      const idArticle = order.idArticle;   // utilisation de l’opérateur ?. par sécurité
      // const quantite = article?.quantite;
      const quantite=2;

      // 4. Préparation des données à envoyer pour mettre à jour l'état
      const updatedOrder = {
        idCommande: order.idCommande,
        dateCommande: order.dateCommande,
        etatCommande: "paye",
        idVendeur: order.idVendeur,
        idAcheteur: order.idAcheteur,
        idArticle: idArticle,
        quantite: quantite
      };

      console.log("commande à mettre à jour: ", updatedOrder);

      // 5. Appel PUT pour modifier la commande
      await axios.put(`https://localhost:7091/api/Commande/${order.idCommande}`, updatedOrder);
    }
      // raha nety
      showSnackbar('paiement reussit! et recu generée!', 'success');
      
      // fermer la boite de dialogue de averina hatramin'ny voalohany
      setPaymentDialogOpen(false);
      setCardNumber('');
      setSelectedOrders([]);
      window.location.reload();
    } catch (error) {
      console.error('Error processing payment:', error);
      showSnackbar('Error processing payment', 'error');
    }
  };

  //transforamtion du pdf
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  //generation du pdf
const generateReceipt = async () => {
  const doc = new jsPDF();
  const selectedOrderData = orders.filter(order => selectedOrders.includes(order.idCommande));
  const totalAmount = selectedOrderData.reduce((sum, order) => sum + order.total, 0);

  // Couleurs
  const violet = "#6A0DAD";
  const jaune = "#FFD700";
  const jauneClair = "#FFF8DC";

  // Fonction pour dessiner l'en-tête
  const drawHeader = (pageNumber) => {
    doc.setFontSize(10);
    doc.setTextColor(violet);
    doc.text('Reçu d\'achat', 105, 20, { align: 'center' });
    
    if (pageNumber === 1) {
      // Logo "e+Varotra" seulement sur la première page
      doc.setFillColor(jauneClair);
      doc.setDrawColor(violet);
      doc.roundedRect(90, 30, 60, 20, 3, 3, 'FD');
      
      doc.setFontSize(16);
      doc.setTextColor(violet);
      doc.text('e', 95, 40);
      
      doc.setTextColor(jaune);
      doc.text('+', 100, 40);
      
      doc.setTextColor(violet);
      doc.text('Varotra', 95, 40);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Plateforme d\'achat et vente d\'articles.', 105, 70, { align: 'center' });
      doc.text('Achetez au meilleur prix ou devenez vendeur pour booster vos revenus!', 105, 78, { align: 'center' });
    }
  };

  // Fonction pour dessiner le pied de page
  const drawFooter = (isLastPage = false) => {
    const pageHeight = doc.internal.pageSize.height;
    
    if (isLastPage) {
      doc.setFontSize(16);
      doc.setTextColor(violet);
      doc.text('Merci pour votre achat!', 105, pageHeight - 50, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Nous apprécions votre confiance aujourd\'hui et comptons sur vous demain.', 
               105, pageHeight - 40, { align: 'center' });
    }

    // Contact et copyright sur toutes les pages
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('© 2025 e+Varotra - Tous droits réservés', 105, pageHeight - 10, { align: 'center' });
  };

  // Fonction pour vérifier l'espace disponible
  const checkSpace = (y, requiredSpace) => {
    const pageHeight = doc.internal.pageSize.height;
    return (pageHeight - y - 30) > requiredSpace; // 30 pour marge basse
  };

  // Fonction pour ajouter une nouvelle page si nécessaire
  const addPageIfNeeded = (y, requiredSpace) => {
    if (!checkSpace(y, requiredSpace)) {
      doc.addPage();
      drawHeader(doc.internal.getNumberOfPages());
      return 20; // Retourne la nouvelle position Y
    }
    return y;
  };

  // Première page avec en-tête
  drawHeader(1);
  let yPos = 80;

  // Information utilisateur
  doc.setFontSize(16);
  doc.setTextColor(violet);
  doc.text('Information client', 20, yPos);
  yPos += 10;
  
  if (userInfo) {
    yPos = addPageIfNeeded(yPos, 30);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${userInfo.nom}`, 20, yPos);
    doc.text(`Email: ${userInfo.email}`, 20, yPos + 10);
    doc.text(`Compte bancaire: ${userInfo.compteBancaire}`, 20, yPos + 20);
    yPos += 30;
  }

  // Information des commandes
  yPos = addPageIfNeeded(yPos, 20);
  doc.setFontSize(16);
  doc.setTextColor(violet);
  doc.text('Détails des commandes', 20, yPos);
  yPos += 10;

  selectedOrderData.forEach((order, index) => {
    const spaceNeeded = 40 + (order.articles.length * 8);
    yPos = addPageIfNeeded(yPos, spaceNeeded);

    doc.setFontSize(14);
    doc.setTextColor(violet);
    doc.text(`Commande #${index + 1}`, 20, yPos);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`ID: ${order.idCommande}`, 20, yPos + 10);
    doc.text(`Date: ${order.dateCommande}`, 20, yPos + 20);
    doc.text(`Total: ${order.total.toFixed(2)}Ar`, 20, yPos + 30);
    
    doc.setTextColor(100, 100, 100);
    doc.text('Articles:', 20, yPos + 40);
    
    order.articles.forEach((article, artIndex) => {
      doc.text(`- ${article.nomArticle} (Quantité: ${article.quantite})`, 30, yPos + 50 + (artIndex * 8));
    });
    
    yPos += 50 + (order.articles.length * 8) + 10;
  });

  // Information des vendeurs (tous les vendeurs)
  yPos = addPageIfNeeded(yPos, 20);
  doc.setFontSize(16);
  doc.setTextColor(violet);
  doc.text('Information des vendeurs', 20, yPos);
  yPos += 10;

  // Récupérer tous les vendeurs uniques
  const uniqueSellerIds = [...new Set(selectedOrderData.map(order => order.idVendeur))];
  const allSellers = await Promise.all(uniqueSellerIds.map(id => fetchSellerInfo(id)));

  allSellers.forEach((seller, sellerIndex) => {
    yPos = addPageIfNeeded(yPos, 40);

    doc.setFontSize(14);
    doc.setTextColor(violet);
    doc.text(`Vendeur #${sellerIndex + 1}`, 20, yPos);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    if (seller) {
      doc.text(`Nom: ${seller.nom}`, 20, yPos + 10);
      doc.text(`Type: ${seller.type}`, 20, yPos + 20);
      doc.text(`Email: ${seller.email}`, 20, yPos + 30);
    } else {
      doc.text('Information vendeur non disponible', 20, yPos + 10);
    }
    
    yPos += 50;
  });

  // Total à payer
  yPos = addPageIfNeeded(yPos, 30);
  doc.setFontSize(16);
  doc.setTextColor(violet);
  doc.text('Récapitulatif de paiement', 20, yPos);
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total à payer: ${totalAmount.toFixed(2)}Ar`, 20, yPos + 20);

  // Ajouter le pied de page sur toutes les pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(i === totalPages);
  }

  // Ouvrir le PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');

  return doc;
};



//   const generateReceipt = async () => {
//   const doc = new jsPDF();
  
//   // Couleurs
//   const violet = "#6A0DAD";
//   const jaune = "#FFD700";
//   const jauneClair = "#FFF8DC";

//   // Dimensions
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const margin = 15;
//   let yPos = 20;

//   // Logo de l'entreprise
//   doc.setFillColor(jauneClair);
//   doc.setDrawColor(violet);
//   doc.roundedRect(margin, yPos, 40, 40, 3, 3, 'FD');
  
//   doc.setFontSize(24);
//   doc.setTextColor(violet);
//   doc.text("e", margin + 8, yPos + 15);
  
//   doc.setTextColor(jaune);
//   doc.text("+", margin + 15, yPos + 15);
  
//   doc.setTextColor(violet);
//   doc.setFontSize(12);
//   doc.text("Varotra", margin + 5, yPos + 25);

//   // Informations système
//   doc.setFontSize(10);
//   doc.setTextColor(0, 0, 0);
//   doc.text("Plateforme d'achat et de vente d'articles", margin + 50, yPos + 10);
//   doc.text("Achetez au meilleur prix ou devenez vendeur", margin + 50, yPos + 16);
  
//   yPos += 45;

//   // Ligne de séparation
//   doc.setDrawColor(violet);
//   doc.setLineWidth(0.5);
//   doc.line(margin, yPos, pageWidth - margin, yPos);
//   yPos += 10;

//   // Informations client
//   doc.setFontSize(14);
//   doc.setTextColor(violet);
//   doc.text("Informations Client", margin, yPos);
  
//   doc.setFontSize(10);
//   doc.setTextColor(0, 0, 0);
//   doc.text(`Nom: ${userInfo.nom}`, margin, yPos + 10);
//   doc.text(`Email: ${userInfo.email}`, margin, yPos + 16);
//   doc.text(`Compte bancaire: ${userInfo.compteBancaire}`, margin, yPos + 22);
  
//   yPos += 35;

//   // Détails des commandes
//   const selectedOrderData = orders.filter(order => selectedOrders.includes(order.idCommande));
  
//   doc.setFontSize(14);
//   doc.setTextColor(violet);
//   doc.text("Détails des Commandes", margin, yPos);
//   yPos += 10;

//   selectedOrderData.forEach((order, index) => {
//     // Nouvelle page si nécessaire
//     if (yPos > 250) {
//       doc.addPage();
//       yPos = 20;
//     }

//     doc.setFontSize(12);
//     doc.setTextColor(violet);
//     doc.text(`Commande #${index + 1}`, margin, yPos);
    
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Référence: ${order.idCommande}`, margin, yPos + 8);
//     doc.text(`Date: ${order.dateCommande}`, margin, yPos + 16);
    
//     // Articles
//     doc.text("Articles:", margin, yPos + 24);
//     order.articles.forEach((article, artIndex) => {
//       doc.text(`- ${article.nomArticle} (${article.quantite}x ${article.prix.toFixed(2)}Ar)`, 
//                margin + 10, yPos + 32 + (artIndex * 8));
//     });
    
//     // Total commande
//     doc.setFontSize(11);
//     doc.setTextColor(violet);
//     doc.text(`Total: ${order.total.toFixed(2)}Ar`, pageWidth - margin, yPos + 32 + (order.articles.length * 8), { align: 'right' });
    
//     yPos += 40 + (order.articles.length * 8);
    
//     // Séparateur entre commandes
//     if (index < selectedOrderData.length - 1) {
//       doc.setDrawColor(jaune);
//       doc.setLineWidth(0.3);
//       doc.line(margin, yPos, pageWidth - margin, yPos);
//       yPos += 10;
//     }
//   });

//   // Total général
//   const totalAmount = selectedOrderData.reduce((sum, order) => sum + order.total, 0);
  
//   doc.setFontSize(14);
//   doc.setTextColor(violet);
//   doc.text("Total Général", pageWidth - margin - 40, yPos);
//   doc.setFontSize(12);
//   doc.text(`${totalAmount.toFixed(2)}Ar`, pageWidth - margin, yPos, { align: 'right' });
  
//   yPos += 20;

//   // Informations vendeur (premier vendeur)
//   if (selectedOrderData.length > 0) {
//     const sellerInfo = await fetchSellerInfo(selectedOrderData[0].idVendeur);
    
//     // Nouvelle page si nécessaire
//     if (yPos > 220) {
//       doc.addPage();
//       yPos = 20;
//     }

//     doc.setFontSize(14);
//     doc.setTextColor(violet);
//     doc.text("Informations Vendeur", margin, yPos);
    
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
    
//     if (sellerInfo) {
//       doc.text(`Nom: ${sellerInfo.nom}`, margin, yPos + 10);
//       doc.text(`Type: ${sellerInfo.type}`, margin, yPos + 18);
//       doc.text(`Contact: ${sellerInfo.email}`, margin, yPos + 26);
//     } else {
//       doc.text("Informations vendeur non disponibles", margin, yPos + 10);
//     }
    
//     yPos += 40;
//   }

//   // Message de remerciement
//   doc.setFontSize(14);
//   doc.setTextColor(violet);
//   doc.text("Merci pour votre confiance !", pageWidth / 2, yPos, { align: 'center' });
//   doc.setFontSize(10);
//   doc.text("Votre satisfaction est notre priorité absolue.", pageWidth / 2, yPos + 8, { align: 'center' });
  
//   yPos += 20;

//   // Coordonnées
//   doc.setFontSize(10);
//   doc.setTextColor(0, 0, 0);
//   doc.text("Contactez-nous:", margin, yPos);
//   doc.text("Email: contact@evarotra.mg", margin, yPos + 8);
//   doc.text("Téléphone: +261 34 00 000 00", margin, yPos + 16);
//   doc.text("Facebook: e+Varotra", margin, yPos + 24);

//   // Pied de page
//   doc.setFillColor(jauneClair);
//   doc.rect(0, 280, pageWidth, 20, 'F');
//   doc.setFontSize(8);
//   doc.setTextColor(violet);
//   doc.text("© 2025 e+Varotra - Tous droits réservés", pageWidth / 2, 287, { align: 'center' });

//   // Génération du PDF
//   const pdfBlob = doc.output('blob');
//   const pdfUrl = URL.createObjectURL(pdfBlob);
  
//   // Retourne l'URL pour affichage dans le modal
//   return pdfUrl;
// };

  const calculateTotal = () => {
    return orders
      .filter(order => selectedOrders.includes(order.idCommande))
      .reduce((sum, order) => sum + order.total, 0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress style={{ color: '#6A0DAD' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#FFF8DC', minHeight: '100vh' }}>
      <Zoom in={true}>
        <Typography variant="h4" gutterBottom sx={{ color: '#6A0DAD', fontWeight: 'bold', mb: 4 }}>
          Tes commandes validés pour le moment
        </Typography>
      </Zoom>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {orders.length === 0 ? (
            <Fade in={true}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#6A0DAD' }}>
                  aucun commande validé pour le moment
                </Typography>
              </Paper>
            </Fade>
          ) : (
            <List>
              {orders.map((order, index) => (
                <Grow in={true} key={order.idCommande} timeout={index * 100}>
                  <Card sx={{ mb: 3, borderLeft: `4px solid #6A0DAD`, boxShadow: 3 }}>
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item xs={1}>
                          <Checkbox
                            checked={selectedOrders.includes(order.idCommande)}
                            onChange={() => handleSelectOrder(order.idCommande)}
                            sx={{ color: '#6A0DAD', '&.Mui-checked': { color: '#6A0DAD' } }}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              {/*tsy manana accès hahita ny idcommande zany izy*/}
                              {/* <Typography variant="h6" sx={{ color: '#6A0DAD' }}>
                                Order #{order.idCommande}
                              </Typography> */}
                              <Typography variant="body2" color="text.secondary">
                                Date: {order.dateCommande}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                état: {CorrectionEtatCommande(order.etatCommande)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Total : {order.total.toFixed(2)}Ar
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                vendeur: {order.idVendeur}
                              </Typography>
                            </Grid>
                          </Grid>
                          
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#6A0DAD' }}>
                              Articles:
                            </Typography>
                            <List dense>
                              {order.articles.map((article) => (
                                <ListItem key={article.codeBar} sx={{ py: 0 }}>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: '#FFD700', width: 24, height: 24 }}>
                                      {article.quantite}
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={`nom:${article.nomArticle}`}
                                    // secondary={`Code: ${article.codeBar}`}
                                  />
                                  {/* <ListItemText
                                    primary={`nom:${article}`}//ceci est un objet
                                  />
                                 <ListItemText primary={`Nom : ${JSON.stringify(article)}`} /> */}

                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </List>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" sx={{ color: '#6A0DAD', mb: 2 }}>
                liste à payer
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                {orders
                  .filter(order => selectedOrders.includes(order.idCommande))
                  .map(order => (
                    <ListItem key={order.idCommande} sx={{ py: 1 }}>
                      <ListItemText 
                        primary={`Order #${order.idCommande}`} 
                        secondary={`${order.articles.length} item(s)`} 
                      />
                      <Typography>{order.total.toFixed(2)}Ar</Typography>
                    </ListItem>
                  ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" sx={{ color: '#6A0DAD' }}>
                  {calculateTotal().toFixed(2)}Ar
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                onClick={handlePaymentClick}
                disabled={selectedOrders.length === 0}
                sx={{
                  bgcolor: '#6A0DAD',
                  '&:hover': { bgcolor: '#5A0B9D' },
                  color: '#FFD700',
                  fontWeight: 'bold',
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 3
                }}
              >
                Proceder le paiement
              </Button>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)}>
        <DialogTitle sx={{ bgcolor: '#6A0DAD', color: '#FFD700' }}>
          Information de paiement
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" gutterBottom>
            payé le(s) {selectedOrders.length} commande(s)  avec le total de :
          </Typography>
          <Typography variant="h5" sx={{ color: '#6A0DAD', textAlign: 'center', my: 2 }}>
            {calculateTotal().toFixed(2)}Ar
          </Typography>
          
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="1234 5678 9012 3456"
          />
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            votre code du carte bancaire:{userInfo.compteBancaire}.
          </Typography>{/*eto izy tokony omena accès manova*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)} sx={{ color: '#6A0DAD' }}>
            annuler
          </Button>
          <Button 
            onClick={handlePaymentSubmit} 
            variant="contained"
            sx={{ bgcolor: '#6A0DAD', color: '#FFD700' }}
            disabled={!cardNumber.trim()}
          >
            Confirmer le paiment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderList;