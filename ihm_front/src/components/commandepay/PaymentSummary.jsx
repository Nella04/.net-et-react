import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { YellowButton } from './StyledComponents';

export const PaymentSummary = ({ selectedCommands, commands, calculateTotal, handlePayment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ mb: 3, backgroundColor: "#FFF8DC", border: `1px solid #6A0DAD` }}>
        <CardContent>
          <Typography variant="h6" gutterBottom style={{ color: "#6A0DAD" }}>
            Récapitulatif de Paiement
          </Typography>
          <Box sx={{ mb: 2 }}>
            {selectedCommands.map(commandId => {
              const command = commands.find(c => c.idCommande === commandId);
              return (
                <Typography key={commandId}>
                  Commande {commandId}: {command?.total.toLocaleString()} Ar
                </Typography>
              );
            })}
          </Box>
          <Typography variant="h6">
            Total à payer: <strong>{calculateTotal().toLocaleString()} Ar</strong>
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <YellowButton
              variant="contained"
              onClick={handlePayment}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Payer {selectedCommands.length} commande(s)
            </YellowButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};