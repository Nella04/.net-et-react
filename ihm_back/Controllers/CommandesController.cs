using Back_IHM.DataContext;
using Back_IHM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_IHM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommandeController : ControllerBase
    {
        private readonly IhmDBContext _context;
        public CommandeController(IhmDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Recuperer les listes des commandes sans aucun parametre
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Commande>>> GetCommandes()
        {
            var commandes = await _context.Commandes.ToListAsync();
            if (commandes.Count == 0)
                return NoContent();
            return Ok(commandes);
        }

        /// <summary>
        /// Recuperer une commande par ID
        /// </summary>
        /// <param name="id_commande"></param>
        /// <returns></returns>
        [HttpGet("{id_commande}")]
        public async Task<ActionResult<Commande>> GetCommandeById(string id_commande)
        {
            var commande = await _context.Commandes.FindAsync(id_commande);
            if (commande == null)
            {
                Console.WriteLine("Aucune commande trouvée");
                return NoContent();
            }
            else
            {
                var article = await _context.Articles.FindAsync(commande.IdArticle);
                if (article == null)
                {
                    Console.WriteLine("Impossible de récuperer les informations sur l'article associé à cette commande");
                    return NoContent();
                }
                else
                {
                    var commande_avec_article = await _context.Commandes
                        .Include(c => c.Article)
                        .Select(c => new
                        {
                            IdCommande = c.IdCommande,
                            DateCommande = c.DateCommande,
                            EtatCommande = c.EtatCommande,
                            IdAcheteur = c.IdAcheteur,
                            IdVendeur = c.IdVendeur,
                            total = c.Quantite * (c.Article != null ? c.Article.Prix : 0),
                            articles = new[]
                            {
                                new
                                {
                                    NomArticle = c.Article != null ? c.Article.NomArticle : "inconnu",
                                    Quantite = c.Quantite,
                                }
                            }
                        })
                        .Where(c => c.IdCommande == id_commande)
                        .ToListAsync();
                    return Ok(commande);
                }
            }
        }

        /// <summary>
        /// Recuperer les commandes filtrer par statut
        /// </summary>
        /// <param name="etat_commande"></param>
        /// <returns></returns>
        [HttpGet("GroupByStatus{etat_commande}")]
        public async Task<ActionResult<Commande>> GetCommandeByStatus(string etat_commande)
        {
            var commande = await _context.Commandes
                .Include(c => c.Article)
                .Select(c => new
                {
                    IdCommande = c.IdCommande,
                    DateCommande = c.DateCommande,
                    EtatCommande = c.EtatCommande,
                    IdAcheteur = c.IdAcheteur,
                    IdVendeur = c.IdVendeur,
                    total = c.Quantite * (c.Article != null ? c.Article.Prix : 0),
                    articles = new[]
                    {
                        new
                        {
                            NomArticle = c.Article != null ? c.Article.NomArticle : "inconnu",
                            Quantite = c.Quantite,
                        }
                    }
                })
                .Where(c => c.EtatCommande == etat_commande)
                .OrderByDescending(c => c.DateCommande)
                .ToListAsync();
            if (commande == null)
            {
                Console.WriteLine("Aucune commande trouvée");
                return NoContent();
            }
            return Ok(commande);
        }

        /// <summary>
        /// Recupperer les commandes d'un acheteur
        /// </summary>
        /// <param name="id_acheteur"></param>
        /// <returns></returns>
        [HttpGet("GroupByPerson{id_personne}")]
        public async Task<ActionResult<Commande>> GetCommandeByAcheteur(string id_personne)
        {
            //var commande = await _context.Commandes.Where(c => c.IdAcheteur == id_personne).OrderByDescending(c => c.DateCommande).ToListAsync();

            var commande = await _context.Commandes
                .Include(c => c.Article)
                .Select(c => new
                {
                    IdCommande = c.IdCommande,
                    DateCommande = c.DateCommande,
                    EtatCommande = c.EtatCommande,
                    IdAcheteur = c.IdAcheteur,
                    IdVendeur = c.IdVendeur,
                    total = c.Quantite * (c.Article != null ? c.Article.Prix : 0),
                    articles = new[]
                    {
                        new
                        {
                            NomArticle = c.Article != null ? c.Article.NomArticle : "inconnu",
                            Quantite = c.Quantite,
                        }
                    }
                })
                .Where(c => c.IdVendeur == id_personne || c.IdAcheteur == id_personne)
                .OrderByDescending(c => c.DateCommande)
                .ToListAsync();
            if (commande == null)
            {
                Console.WriteLine("Aucune commande trouvée");
                return NoContent();
            }
            return Ok(commande);
        }

        /// <summary>
        /// Recupperer les commandes d'un acheteur
        /// </summary>
        /// <param name="id_acheteur"></param>
        /// <returns></returns>
        [HttpGet("GroupByPersonStatus{id_personne}/{statut}")]
        public async Task<ActionResult<Commande>> GetCommandeByPersonStatus(string id_personne, string statut)
        {
            var commande = await _context.Commandes
                .Include(c => c.Article)
                .Select(c => new
                {
                    IdCommande = c.IdCommande,
                    DateCommande = c.DateCommande,
                    EtatCommande = c.EtatCommande,
                    IdAcheteur = c.IdAcheteur,
                    IdVendeur = c.IdVendeur,
                    total = c.Quantite * (c.Article != null ? c.Article.Prix: 0),
                    articles = new[]
                    {
                        new
                        {
                            NomArticle = c.Article != null ? c.Article.NomArticle : "inconnu",
                            Quantite = c.Quantite,
                        }
                    }
                })
                .Where(c => (c.IdAcheteur == id_personne || c.IdVendeur == id_personne) && c.EtatCommande == statut)
                .OrderByDescending(c => c.DateCommande)
                .ToListAsync();
            if (commande == null)
            {
                Console.WriteLine("Aucune commande trouvée");
                return NoContent();
            }
            return Ok(commande);
        }

        /// <summary>
        /// Ajout d'un commande dans la base  de donnees
        /// </summary>
        /// <param name="commande"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPost]
        public async Task<ActionResult<Commande>> AddCommande(Commande commande)
        {
            //Generer l' IDCOmmande aleatoirement à chaque ajout
            const string chars = "1234567890";
            var random = new Random();
            commande.IdCommande =  new string(Enumerable.Repeat(chars.ToLower(), 12).Select(s => s[random.Next(s.Length)]).ToArray());

            if (string.IsNullOrWhiteSpace(commande.IdVendeur) || string.IsNullOrWhiteSpace(commande.IdAcheteur) || string.IsNullOrWhiteSpace(commande.IdArticle))
            {
                Console.WriteLine("Veuillez remplir tous les champs");
                return BadRequest();
            }
            else
            {
                if (await _context.Commandes.FindAsync(commande.IdCommande) != null)
                {
                    Console.WriteLine("Le commande que vous essayez d'ajouter existe déjà");
                    return BadRequest();
                }
                else
                {
                    if (await _context.Commandes.AddAsync(commande) == null)
                    {
                        Console.WriteLine("Echec de l'ajout du commande");
                        return NoContent();
                    }
                    try
                    {
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Commande ajoutée avec succés");
                        return Ok(commande);

                    }
                    catch (DbUpdateException err)
                    {
                        throw new Exception($"impossible d'ajouter le commande : {err}");
                    }
                }
            }
        }

        /// <summary>
        /// Mis a jour d'un commande particulier.On se base sur le fait que l'id ne doit pas etre modifier
        /// </summary>
        /// <param name="id_commande"></param>
        /// <param name="commande"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{id_commande}")]
        public async Task<ActionResult<Acheteur>> UpdateCommande(string id_commande, Commande commande)
        {
            if (string.IsNullOrWhiteSpace(commande.IdCommande) || string.IsNullOrWhiteSpace(commande.IdVendeur)
                || string.IsNullOrWhiteSpace(commande.IdAcheteur) || string.IsNullOrWhiteSpace(commande.IdArticle))
            {
                Console.WriteLine("Veuillez remplir les champs");
                return BadRequest();
            }
            else
            {
                var current_order = await _context.Commandes.FindAsync(id_commande);
                if (current_order == null)
                {
                    Console.WriteLine("La commande à mettre à jour est introuvable");
                    return NotFound();
                }
                else
                {
                    //Le scenario le plus probable ou l'on ne modifie pas l'CompteBancaire
                    if (current_order.IdCommande == commande.IdCommande)
                    {
                        //L'objet existe deja dans la BD mais on indique a Ef qu'il a ete modifie
                        _context.Entry(current_order).State = EntityState.Modified;
                        current_order.DateCommande = commande.DateCommande;
                        current_order.IdVendeur = commande.IdVendeur;
                        current_order.EtatCommande = commande.EtatCommande;
                        current_order.IdAcheteur = commande.IdAcheteur;
                        current_order.IdArticle = commande.IdArticle;
                        current_order.Quantite = commande.Quantite;

                        try
                        {
                            await _context.SaveChangesAsync();
                            Console.WriteLine("Mise à jour de la commande effectuée avec succés");
                            return Ok(commande);
                        }
                        catch (DbUpdateException err)
                        {
                            throw new Exception($"Impossible de mettre à jour la commande : {err}");
                        }
                    }
                    else
                    {
                        if (await _context.Commandes.FindAsync(commande.IdCommande) != null)
                        {
                            Console.WriteLine("L'identifiant de la commande que avez entré existe déjà");
                            return BadRequest();
                        }
                        else
                        {
                            try
                            {
                                if (_context.Commandes.Remove(current_order) == null)
                                {
                                    Console.WriteLine("La suppression de l'ancienne commande a été un echec");
                                    return BadRequest();
                                }
                                else
                                {
                                    await _context.SaveChangesAsync();
                                    Commande new_order  = new Commande
                                    {
                                        IdCommande = commande.IdCommande,
                                        DateCommande = commande.DateCommande,
                                        EtatCommande = commande.EtatCommande,
                                        IdVendeur = commande.IdVendeur,
                                        IdAcheteur = commande.IdAcheteur,
                                        IdArticle = commande.IdArticle,
                                        Quantite = commande.Quantite,
                                    };
                                    if (await _context.Commandes.AddAsync(commande) == null)
                                    {
                                        Console.WriteLine("La mise à jour forcée de la commande a été un echec");
                                        return BadRequest();
                                    }
                                    else
                                    {
                                        try
                                        {
                                            await _context.SaveChangesAsync();
                                            Console.WriteLine("Mise à jour forcée de la commande effectuée avec succes");
                                            return Ok(commande);
                                        }
                                        catch (DbUpdateException err)
                                        {
                                            throw new Exception($"Erreur survenue lors de l'ajout de la commande par mise à jour : {err}");
                                        }
                                    }
                                }
                            }
                            catch (DbUpdateException err)
                            {
                                throw new Exception($"Impossible de faire la mise à jour forcée de la commande: {err}");
                            }
                        }
                    }
                }
            }
        }

        [HttpDelete("{id_commande}")]
        public async Task<ActionResult> DeleteCommande(string id_commande)
        {
            if (string.IsNullOrWhiteSpace(id_commande))
            {
                Console.WriteLine("ID introuvable");
                return BadRequest();
            }
            else
            {
                var commande_to_delete = await _context.Commandes.FindAsync(id_commande);
                if (commande_to_delete == null)
                {
                    Console.WriteLine("La commande à supprimer n'existe pas");
                    return NoContent();
                }
                else
                {
                    try
                    {
                        _context.Commandes.Remove(commande_to_delete);
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Commande supprimée avec succés");
                        return Ok();
                    }
                    catch (DbUpdateException err)
                    {
                        return BadRequest();
                        throw new Exception($"Impossible de supprimer le commande: {err}");

                    }
                }
            }
        }
    }
}
