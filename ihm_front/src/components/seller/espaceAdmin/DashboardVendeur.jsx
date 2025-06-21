import React, { useState } from "react";
import StatsRow from "./StatsRow";
import SalesAnalytics from "./SalesAnalytics";
import RecentOrders from "./RecentOrders";
import MiniStatCard from "./MiniStatCard";
import PageCommande from "../../../pages/commande/PageCommande";
import GestionArticle from "../gestion_article/GestionArticle";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";

const Sectone = styled.div`
  margin-top: 15px;
  width: 100%;
`;

const Secttwo = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  height: 100%;
`;

const Secthree = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  height: 100%;
`;

const Sectfour = styled(Box)`
  margin-top: 20px;
  width: 100%;
  overflow-x: hidden;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DashboardVendeur = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (currentPage === "commande") return <PageCommande />;
  if (currentPage === "article") return <GestionArticle />;

  return (
    <Box
      p={2}
      bgcolor="#FFF8DC"
      minHeight="80vh"
      sx={{
        overflowX: "hidden",
      }}
    >
      <Sectone>
        <StatsRow />
      </Sectone>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={8}>
          <Secttwo>
            <SalesAnalytics />
          </Secttwo>
        </Grid>

        <Grid item xs={12} md={4}>
          <Secthree>
            <RecentOrders />
          </Secthree>
        </Grid>
      </Grid>

      <Sectfour>
        <MiniStatCard />
      </Sectfour>
    </Box>
  );
};

export default DashboardVendeur;