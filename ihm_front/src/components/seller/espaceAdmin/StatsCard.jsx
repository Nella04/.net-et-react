import { Card, Box, Typography } from "@mui/material";
import React from "react";


const StatsCard = ({ icon, value, label}) => {
    return (
        <Card elevation={3} sx={{ display : 'flex', alignItems : 'center', padding : 2, 
            borderRadius : 3, boxShadow : '0 2px 8px rgba(0, 0, 0, 0.05)', 
            bgcolor : 'white'
        }}>
            <Box sx={{ 
                pagging : 1.5, 
                borderRadius : '50%', 
                display : 'flex', 
                alignItems : 'center', 
                justifyContent : 'center', 
                mr : 2,
                width : '200px'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h5" fontWeight="bold">
                    {value}
                </Typography>
                <Typography color="text.secondary">
                    {label}
                </Typography>
            </Box>
        </Card>
    )
}
export default StatsCard; 