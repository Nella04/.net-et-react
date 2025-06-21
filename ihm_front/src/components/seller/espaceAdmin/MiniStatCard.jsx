import React, { useState, useEffect } from "react";
import { Card, Box, Typography, Grid } from "@mui/material";
import { ShoppingCart, ListAlt, StarRate } from "@mui/icons-material";
import axios from "axios";

const MiniStatCard = () => {
    const [user, setUser] = useState('');
    const [stats, setStats] = useState({
        articles: 0,
        commandes: 0,
        avis: 0,
    });

    useEffect(() => {
        const personneString = localStorage.getItem('userlocal');
        if (personneString) {
            const personne = JSON.parse(personneString);
            const id = personne.idpersonnelocal;
            setUser(id);
            axios
                .get(`https://localhost:7091/api/Vendeurs/MiniStats/${user}`)
                .then((res) => setStats(res.data))
                .catch((err) => console.error(err));
        }
    }, [user]);

    const statList = [
        {
            icon: <ShoppingCart color="primary" />,
            label: "Articles",
            value: stats.articles,
        },
        {
            icon: <ListAlt color="secondary" />,
            label: "Commandes en attentes",
            value: stats.commandes,
        },
        {
            icon: <StarRate color="warning" />,
            label: "Avis Clients",
            value: stats.avis,
        },
    ];
    return (
        <Grid container spacing={2}>
            {statList.map((stat, index) => (
                <Grid
                    item
                    xs={12}
                    sm={4}
                    key={index}
                    width={375}
                    height={50}
                    marginBottom={3}
                >
                    <Card
                        sx={{
                            borderRadius: 3,
                            display: "flex",
                            height: "100%",
                            backgroundColor: "white",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                            bgcolor: "white",
                            alignItems: "center",
                            p: 2,
                        }}
                    >
                        <Box mr={2}>{stat.icon}</Box>
                        <Box>
                            <Typography variant="h6">{stat.value}</Typography>
                            <Typography color="textSecondary">{stat.label}</Typography>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
export default MiniStatCard;
