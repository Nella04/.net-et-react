using Back_IHM.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_IHM.DataContext
{
    public class IhmDBContext : DbContext
    {
        public IhmDBContext(DbContextOptions<IhmDBContext> options) : base(options) { }
        public DbSet<Article> Articles { get; set; }

        public DbSet<Vendeur> Vendeurs { get; set; }

        public DbSet<Acheteur> Acheteurs { get; set; }

        public DbSet<Personne> Personnes { get; set; }

        public DbSet<Commande> Commandes { get; set; }

        public DbSet<Paiement> Paiements { get; set; }

        public DbSet<AvisAcheteur> AvisAcheteurs { get; set; }
    }
}
