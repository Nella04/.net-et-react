import React, { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import { Grid } from "@mui/material";
import { ShoppingCart, AttachMoney, ErrorOutline } from "@mui/icons-material";
import axios from "axios";

const StatsRow = () => {
    const [user, setUser] = useState('');
    const [stats, setStats] = useState({
        ventesJour: 0,
        gainJour: 0,
        autre: 0,
    });

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
                .get(`https://localhost:7091/api/Vendeurs/Jour/${user}`)
                .then((res) => {
                    setStats(res.data);
                })
                .catch((err) => {
                    console.error("Erreur lors de la récupération des stats", err);
                });
        }
    }, [user]);

    return (
        <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
                <StatsCard
                    icon={<ShoppingCart fontSize="large" color="primary" />}
                    value={stats.ventesJour}
                    label="Vente journalière"
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <StatsCard
                    icon={<AttachMoney fontSize="large" color="secondary" />}
                    value={`Ar ${stats.gainJour}`}
                    label="Gain journalier"
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <StatsCard
                    icon={<ErrorOutline fontSize="large" color="warning" />}
                    value="5"
                    label="Tsy ilaina ito"
                />
            </Grid>
        </Grid>
    );
};

export default StatsRow;
