import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const PaiementForm = ({ montant, onSubmit }) => {
  const [codePaiement, setCodePaiement] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!codePaiement.trim()) {
      toast.error("Veuillez entrer un code de paiement");
      return;
    }

    onSubmit({ codePaiement });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Le montant à payer pour l'achat de votre commande est : <br /> <strong> {montant.total} Ar</strong>
      </Typography>

      <TextField
        fullWidth
        label="Code de paiement"
        variant="outlined"
        value={codePaiement}
        onChange={(e) => setCodePaiement(e.target.value)}
        margin="normal"
        style={{ border : '#6A0DAD'}}
      />

      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor : '#6A0DAD'}}
        fullWidth
        sx={{ mt: 2 }}
      >
        Valider le paiement
      </Button>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default PaiementForm;