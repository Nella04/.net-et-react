import React from "react";
import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import {useNavigate} from "react-router-dom"


const ClickableCard = ({ icon : Icon, label, onClick }) => {
    const navigate = useNavigate(); 

    return (
        <Card elevation={2} sx={{
            borderRadius : 3, minHeight : 100, display : 'flex', 
            flexDirection : 'column', justifyContent : 'center', 
            backgroundColor : '#f9fafb', boxShadow : '0 2px 8px rgba(0, 0, 0, 0.05)', 
            bgcolor : 'white', 
        }}
        >
            <CardActionArea onClick={onClick}>
                <CardContent sx={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                    <Box sx={{ display : 'flex', alignItems : 'center', gap : 1 }}>
                        <Icon sx={{ fontSize : 28, color : 'primary.main'}} />
                        <Typography variant="h6">
                            {label}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
export default ClickableCard; 