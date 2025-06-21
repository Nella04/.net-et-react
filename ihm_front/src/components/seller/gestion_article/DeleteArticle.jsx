import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Backdrop, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '70%', md: '50%' },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    backdropFilter: 'blur(5px)',
    maxHeight: '90vh',
    overflow: 'auto'
};

const DeleteArticle = ({ open, onClose, codeBar, onConfirm }) => {
    useEffect(() => {
        console.log("id: ", codeBar);
    }, [codeBar]);

    const handleConfirm = () => {
        onConfirm(codeBar);
    };

    if (codeBar === "") return null;
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Box sx={style}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}>
                    {/* Header */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                            Vous allez supprimer cette article
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: 'danger.main',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Footer */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: 2
                    }}>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            color="secondary"
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            variant="contained"
                            color="error"
                        >
                            Oui, supprimer
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteArticle;