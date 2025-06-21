using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_IHM.Models
{
    [Table("vendeur")]
    public class Vendeur : Personne
    {
        [Column("type_vendeur")]
        public string Type { get; set; }
        [Column("statut_vendeur")]
        public string Statut { get; set; }
    }
}
