import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductsCard from "./gestion_article/ProductsCard";
import ProductsDetailsModal from "./gestion_article/ProductsDetailsModal";
import AjoutArticle from "./gestion_article/AjoutArticle";
import AddIcon from "@mui/icons-material/Add";
import {
  Button, Pagination, Box
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import DeleteArticle from "./gestion_article/DeleteArticle";

// --- S T Y  E S ---
const Container = styled.div`
  padding: 2rem;
  overflow: hidden;
   background-color: #FFF8DC;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

// --- C O M P O S A N T S ---
const ProductsPage = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCodeBar, setSelectedCodeBar] = useState('');
  const [modalOpen, setModalOpen] = useState(articles);
  const [showDialog, setShowDialog] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [user, setUser] = useState('');
  const articlesPerPage = 4;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const fetchArticles = () => {
    axios
      .get(`https://localhost:7091/api/Articles/ParVendeur/${user}`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de l'appel de l'API", err);
      });
  };

  useEffect(() => {
    const personneString = localStorage.getItem('userlocal');
    if (personneString) {
      const personne = JSON.parse(personneString);
      setUser(personne.idpersonnelocal);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const handleAdd = (addArticle) => {
    axios.post(`https://localhost:7091/api/Articles`, addArticle)
      .then(() => {
        fetchArticles();
        setShowDialog(false);
        toast.success('Article ajouté avec succès');
      })
      .catch(err => {
        console.error('Error updating article:', err);
        toast.error("Erreur lors de la mise à jour de l\'article");
      });
  }

  const handleUpdate = (updatedArticle) => {
    axios.put(`https://localhost:7091/api/Articles/${updatedArticle.codeBar}`, updatedArticle)
      .then(() => {
        toast.success('Article mis à jour avec succès');
        fetchArticles();
        setSelectedArticle(null);
      })
      .catch(err => {
        console.error('Error updating article:', err);
        toast.error("Erreur lors de la mise à jour de l\'article");
      });
  };

  const handleOpenDeleteModal = (codeBar) => {
    setSelectedCodeBar(codeBar);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = (codeBar) => {
    axios.delete(`https://localhost:7091/api/Articles/${codeBar}`)
      .then(() => {
        setArticles(prevArticles => prevArticles.filter(articles => articles.codeBar !== codeBar));
        toast.success('Article supprimé avec succès');
      })
      .catch(err => {
        console.error('Erreur de la suppression de l\' article:', err);
        toast.error('Erreur lors de la suppression de l\' article');
      });
    setSelectedCodeBar('');
    setOpenDeleteModal(false);
  }

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const paginated = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <Container>
      <Header>
        <Button
          onClick={() => setShowDialog(true)}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#5e35b1",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#864fb1",
            },
            ml: 0.2,
          }}
        >
          Ajouter
        </Button>
      </Header>

      {showDialog && (
        <AjoutArticle
          open={showDialog}
          user={user}
          onClose={() => setShowDialog(false)}
          onSubmit={handleAdd}
        />
      )}

      <h1>Mes Articles</h1>

      <Grid>
        {Array.isArray(paginated) && paginated.length > 0 && paginated.map((article) => (
          <ProductsCard
            key={article.codeBar}
            article={article}
            onDelete={handleOpenDeleteModal}
            onDetails={handleOpenModal}
          />
        ))}
      </Grid>

      {/* <p>
        Page {currentPage} sur {totalPages}
      </p> */}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        >
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastArticle >= articles.length}
          >
            Suivant
          </Button>
        </Pagination>
      </Box>

      {selectedArticle && (
        <ProductsDetailsModal
          open={modalOpen}
          article={selectedArticle}
          onClose={() => {
            setSelectedArticle(null);
            setModalOpen(false);
          }}
          onSave={handleUpdate}
        />
      )}

      {selectedCodeBar && openDeleteModal && (
        <DeleteArticle
          open={openDeleteModal}
          codeBar={selectedCodeBar}
          onClose={() => {
            setSelectedArticle(null);
            setOpenDeleteModal(false);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};
export default ProductsPage;
