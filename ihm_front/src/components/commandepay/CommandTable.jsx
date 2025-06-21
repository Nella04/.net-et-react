import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Collapse,
  Box,
  Typography,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { VioletButton } from './StyledComponents';

export const CommandTable = ({
  commands,
  selectedCommands,
  expandedRows,
  handleSelectCommand,
  toggleRowExpand,
  setSelectedCommands,
  handlePayment
}) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#6A0DAD" }}>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedCommands.length > 0 && selectedCommands.length < commands.length
                }
                checked={
                  commands.length > 0 && selectedCommands.length === commands.length
                }
                onChange={() => {
                  if (selectedCommands.length === commands.length) {
                    setSelectedCommands([]);
                  } else {
                    setSelectedCommands(commands.map(c => c.idCommande));
                  }
                }}
                sx={{ color: 'white', '&.Mui-checked': { color: '#FFD700' } }}
              />
            </TableCell>
            <TableCell sx={{ color: 'white' }}>ID Commande</TableCell>
            <TableCell sx={{ color: 'white' }}>Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Vendeur</TableCell>
            <TableCell sx={{ color: 'white' }}>Total</TableCell>
            <TableCell sx={{ color: 'white' }}>Articles</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commands.map((command) => (
            <React.Fragment key={command.idCommande}>
              <TableRow
                hover
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#FFF8DC' },
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCommands.indexOf(command.idCommande) !== -1}
                    onChange={() => handleSelectCommand(command.idCommande)}
                    sx={{ color: "#6A0DAD", '&.Mui-checked': { color: "#6A0DAD" } }}
                  />
                </TableCell>
                <TableCell>{command.idCommande}</TableCell>
                <TableCell>{command.dateCommande}</TableCell>
                <TableCell>{command.idVendeur}</TableCell>
                <TableCell>{command.total.toLocaleString()} Ar</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => toggleRowExpand(command.idCommande)}
                    sx={{ color: "#6A0DAD" }}
                  >
                    {expandedRows[command.idCommande] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  {command.articles.length} article(s)
                </TableCell>
                <TableCell>
                  <VioletButton
                    size="small"
                    onClick={() => {
                      setSelectedCommands([command.idCommande]);
                      handlePayment();
                    }}
                  >
                    Payer
                  </VioletButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                  <Collapse in={expandedRows[command.idCommande]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        Détails des Articles
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nom Article</TableCell>
                            <TableCell>Code Barre</TableCell>
                            <TableCell>Quantité</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {command.articles.map((article, index) => (
                            <TableRow key={index}>
                              <TableCell>{article.nomArticle}</TableCell>
                              <TableCell>{article.codebar}</TableCell>
                              <TableCell>{article.quantite}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};