import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    Divider,
    Box,
} from "@mui/material";

const RecentOrders = () => {
    const [user, setUser] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const personneString = localStorage.getItem('userlocal');
        if (personneString) {
            const personne = JSON.parse(personneString);
            setUser(personne.idpersonnelocal);
        }
    }, []);

    useEffect(() => {
        if (user) {
            axios
                .get(`https://localhost:7091/api/Vendeurs/Recent/${user}`)
                .then((res) => {
                    setOrders(res.data);
                })
                .catch((err) => {
                    console.error("Erreur lors de la récupération des stats", err);
                });
        }
    }, [user]);

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                bgcolor: "white",
                width: "400px",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#6A0DAD"
                    textAlign="center"
                    gutterBottom
                >
                    Les récents paiements
                </Typography>
                <List disablePadding>
                    {orders.map((order, index) => (
                        <Box key={order.id}>
                            <ListItem
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    py: 1,
                                    fontFamily: "Roboto Mono, monospace",
                                }}
                            >
                                <Typography variant="body1">{order.id}</Typography>
                                <Typography variant="body2" color="#4caf50" fontWeight="bold">
                                    {order.montant}
                                </Typography>
                            </ListItem>
                            {index < 3 && <Divider />}{" "}
                            {/* On met une séparation uniquement avant le dernier élément */}
                        </Box>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default RecentOrders;
