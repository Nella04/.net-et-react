using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_IHM.Models
{
    [Table("article")]
    public class Article
    {
        [Key]
        [Column("codebar")]
        public string CodeBar { get; set; }

        [Column("nom_article")]
        public string NomArticle { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("marque")]
        public string Marque { get; set; }

        [Column("prix")]
        public int Prix { get; set; }

        [Column("categorie")]
        public string Categorie { get; set; }

        [Column("image")]
        public byte[]? Image { get; set; }

        [Column("id_vendeur")]          
        public string VendeurId { get; set; }

    }
}
