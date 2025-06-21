import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Pagination, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

// --- S T Y L E S ---
const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Ref = styled.span`
  font-size: 18px;
  color: #444;
  font-weight: bold;
`;

const Date = styled.span`
  font-size: 14px;
  color: #888;
`;

const Status = styled.span`
  background-color: ${({ status }) =>
    status === "Livree"
      ? "#c8e6c9"
      : status === "En cours"
      ? "#fff9c4"
      : "#eeeeee"};
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 20px;
  color: #555;
  font-weight: 500;
`;

const Total = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #5c6bc0;
`;

const ItemList = styled.ul`
  margin-top: 10px;
  color: #666;
`;

const Item = styled.li`
  font-size: 14px;
  color: #666;
`;

// ---  C O M P O S A N T S ---
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ordersPerPage = isMobile ? 3 : 6;
  const idPersonne = "P1234";

  useEffect(() => {
    axios
      .get(`https://localhost:7091/api/Commande/GroupByPerson${idPersonne}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la chargement des commandes: ", error);
      });
  }, []);

  const filterOrders = orders?.filter(
    (order) =>
      order.articles?.some((item) =>
        item.nomArticle.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) || order.idCommande?.includes(searchTerm)
  );

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = filterOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>Aucune commande pour le moment</p>;
  }
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <Title>Historique des commandes</Title>

        <input
          type="text"
          placeholder="Rechercher une commande ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            maxWidth: "300px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid rgb(39, 5, 43)",
            fontSize: "16px",
            marginLeft: "500px",
            marginTop: "20px",
          }}
        ></input>
      </div>

      <OrderList>
        {paginatedOrders.map((order) => (
          <OrderCard key={order.idCommande}>
            <InfoBlock>
              <Ref>Commande: {order.idCommande}</Ref>
              <Date>{order.dateCommande}</Date>
              <Status status={order.etatCommande}>{order.etatCommande}</Status>
            </InfoBlock>
            <ItemList>
              {order.articles?.map((article, index) => (
                <Item key={index}>
                  {article.quantite} * {article.nomArticle}
                </Item>
              ))}
            </ItemList>
            <Total>{(order.total ?? 0).toFixed(2)} Ar</Total>
          </OrderCard>
        ))}
      </OrderList>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};
export default OrderHistory;
