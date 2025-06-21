import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CommandeSearchBar({ searchValue, setSearchValue }) {
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Rechercher..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      sx={{ minWidth: 250 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        )
      }}
    />
  );
}