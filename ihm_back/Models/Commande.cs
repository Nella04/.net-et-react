using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_IHM.Models
{
    [Table("commande")]
    public class Commande
    {
        [Key]
        [Column("id_commande")]
        public string IdCommande { get; set; }
        [Column("date_commande")]
        public DateOnly DateCommande { get; set; }
        [Column("etat_commande")]
        public string EtatCommande { get; set; }
        [Column("id_vendeur")]
        public string IdVendeur { get; set; }
        [Column("id_acheteur")]
        public string IdAcheteur { get; set; }
        [Column("codebar")]
        public string IdArticle { get; set; }
        [Column("quantite")]
        public int Quantite { get; set; }
        [ForeignKey(nameof(IdArticle))]
        public Article? Article { get; set; }
    }
}
