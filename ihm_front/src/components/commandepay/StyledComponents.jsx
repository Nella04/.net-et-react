import { Button, styled } from '@mui/material';

export const VioletButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#6A0DAD",
  color: "white",
  '&:hover': {
    backgroundColor: "#5a0b9a",
  },
  margin: theme.spacing(1),
}));

export const YellowButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFD700",
  color: "#6A0DAD",
  '&:hover': {
    backgroundColor: "#e6c200",
  },
  margin: theme.spacing(1),
}));