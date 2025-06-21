using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace Back_IHM.Models
{
    [Table("personne")]
    public abstract class  Personne
    {
        [Key]
        [Column("id_personne")]
        public string IdPersonne { get; set; }
        [Column("compte_bancaire")]
        public string CompteBancaire { get; set; }
        [Column("nom")]
        public string Nom { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("mot_de_passe")]
        public string MotDePasse { get; set; }
    }
}
