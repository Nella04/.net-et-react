import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const SalesAnalytics = () => {
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);

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
                .get(`https://localhost:7091/api/Vendeurs/SeptMois/${user}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error("Erreur lors du chargement des ventes :", error);
                });
        }
    }, [user]);

    return (
        <Card
            elevation={3}
            sx={{
                height: 300,
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                bgcolor: "white",
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight="bold" color="#6A0DAD" gutterBottom>
                    LES VENTES DES SEPT DERNIERS MOIS
                </Typography>
                <Box sx={{ width: "100%", height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mois" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="ventes"
                                stroke="#FFD700"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SalesAnalytics;
