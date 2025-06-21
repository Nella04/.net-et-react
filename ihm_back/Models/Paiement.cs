using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_IHM.Models
{
    [Table("paiement")]
    public class Paiement
    {
        [Key]
        [Column("id_paiement")]
        public string IdPaiement { get; set; }
        [Column("date_paiement")]
        public DateOnly DatePaiement { get; set; }
        [Column("id_commande")]
        public string IdCommande { get; set; }
        [Column("recu")]
        public string Recu { get; set; }
    }
}
