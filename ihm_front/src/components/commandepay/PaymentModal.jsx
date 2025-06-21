import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { VioletButton } from './StyledComponents';

export const PaymentModal = ({
  openPaymentModal,
  handleClosePaymentModal,
  calculateTotal,
  cardCode,
  setCardCode,
  handleConfirmPayment,
  receiptUrl // pour le pdf
}) => {
  const [showPdf, setShowPdf] = useState(false);

  const handlePayment = async () => {
    const paymentSuccess = await handleConfirmPayment();
    if (paymentSuccess) {
      setShowPdf(true);
    }
  };

  return (
    <Modal
      open={openPaymentModal}
      onClose={handleClosePaymentModal}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        outline: 'none',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {!showPdf ? (
          <>
            <Typography id="payment-modal-title" variant="h6" component="h2" sx={{ mb: 2, color: "#6A0DAD" }}>
              Confirmation de Paiement
            </Typography>
            <Typography id="payment-modal-description" sx={{ mb: 3 }}>
              Montant total: {calculateTotal().toLocaleString()} Ar
            </Typography>
            <TextField
              fullWidth
              label="Code de carte bancaire"
              variant="outlined"
              value={cardCode}
              onChange={(e) => setCardCode(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={handleClosePaymentModal} sx={{ color: "#6A0DAD" }}>
                Annuler
              </Button>
              <VioletButton
                variant="contained"
                onClick={handlePayment}
                disabled={!cardCode.trim()}
              >
                Confirmer le Paiement
              </VioletButton>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#6A0DAD" }}>
              Reçu de Paiement
            </Typography>
            <iframe 
              src={receiptUrl} 
              width="100%" 
              height="500px"
              style={{ border: 'none' }}
              title="Reçu de paiement"
            />
            <Button 
              onClick={handleClosePaymentModal}
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#6A0DAD", color: "white" }}
            >
              Fermer
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};


