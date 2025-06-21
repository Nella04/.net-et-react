using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_IHM.Models
{
    [Table("avis_acheteur")]
    public class AvisAcheteur
    {
        [Key]
        [Column("id_avis")]
        public string IdAvis { get; set; }
        [Column("date")]
        public DateOnly DateAvis { get; set; }
        [Column("id_acheteur")]
        public string IdAcheteur { get; set; }
        [Column("note")]
        public int NoteAvis { get; set; }
        [Column("id_vendeur")]
        public string IdVendeur { get; set; }
        [Column("commentaire")]
        public string Commentaire { get; set; }
    }
}
