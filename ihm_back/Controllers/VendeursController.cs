using System.Collections.Specialized;
using Back_IHM.DataContext;
using Back_IHM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_IHM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendeursController : ControllerBase
    {
        private readonly IhmDBContext _context;
        public VendeursController(IhmDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Recuperer les listes des vendeurs sans aucun paramètre
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendeur>>> GetVendeurs(){
            var vendeur_voulu = await _context.Vendeurs.ToListAsync();
            if (vendeur_voulu.Count == 0)
                return NoContent();
            return Ok(vendeur_voulu);
        }

        /// <summary>
        /// Recuperation d'un vendeur particulier par le parametre id_vendeur
        /// </summary>
        /// <param name="id_vendeur"></param>
        /// <returns></returns>
        [HttpGet("{id_vendeur}")]
        public async Task<ActionResult<Vendeur>> GetVendeurById(string id_vendeur)
        {
            var vendeur = await _context.Vendeurs.FindAsync(id_vendeur);
            if (vendeur == null)
            {
                Console.WriteLine("Le vendeur que vous voulez n'existe pas");
                return NoContent();
            }
            return Ok(vendeur);
        }

        /// <summary>
        /// Ajout d'un vendeur
        /// </summary>
        /// <param name="vendeur"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPost]
        public async Task<ActionResult<Vendeur>> AddVendeur(Vendeur vendeur)
        {
            if(string.IsNullOrWhiteSpace(vendeur.CompteBancaire) || string.IsNullOrWhiteSpace(vendeur.Statut) || string.IsNullOrWhiteSpace(vendeur.Nom)
                || string.IsNullOrWhiteSpace(vendeur.MotDePasse) || string.IsNullOrWhiteSpace(vendeur.Email) ||
                string.IsNullOrWhiteSpace(vendeur.Type))
            {
                Console.WriteLine("Les informations entrées sont invalides");
                return BadRequest();
            }
            else
            {
                if(await _context.Vendeurs.FindAsync(vendeur.IdPersonne) != null)
                {
                    Console.WriteLine("Le vendeur que vous essayez d'ajouter existe déjà");
                    return BadRequest();
                }
                else
                {
                    if (await _context.Vendeurs.AddAsync(vendeur) == null)
                    {
                        Console.WriteLine("L'ajout du vendeur a été un echec");
                        return NoContent();
                    }
                    try
                    {
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Vendeur ajouté avec succés");
                        return Ok(vendeur);

                    }
                    catch (DbUpdateException err)
                    {
                        throw new Exception($"impossible d'ajouter le vendeur : {err}");
                    }
                }
            }
        }

        /// <summary>
        /// Mis a jour d'un vendeur particulier.On se base sur le fait que l'id_vendeur ne doit pas etre modifier
        /// </summary>
        /// <param name="id_vendeur"></param>
        /// <param name="vendeur"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{id_vendeur}")]
        public async Task<ActionResult<Vendeur>> UpdateVendeur(string id_vendeur, Vendeur vendeur)
        {
            if(string.IsNullOrWhiteSpace(vendeur.CompteBancaire) || string.IsNullOrWhiteSpace(vendeur.Statut) || string.IsNullOrWhiteSpace(vendeur.Nom) ||
                string.IsNullOrWhiteSpace(vendeur.MotDePasse) || string.IsNullOrWhiteSpace(vendeur.Email) ||
                string.IsNullOrWhiteSpace(vendeur.Type) || string.IsNullOrWhiteSpace(vendeur.IdPersonne))
            {
                Console.WriteLine("les informations entrées sont invalides");
                return BadRequest();
            }
            else
            {
                var ancien_vendeur = await _context.Vendeurs.FindAsync(id_vendeur);
                if (ancien_vendeur == null)
                {
                    Console.WriteLine("Le vendeur à mettre à jour n'existe pas");
                    return NotFound();
                }
                else
                {
                    //Le scenario le plus probable ou l'on ne modifie pas l'id
                    if (ancien_vendeur.IdPersonne == vendeur.IdPersonne)
                    {
                        //L'objet existe deja dans la BD mais on indique a Ef qu'il a ete modifie
                        _context.Entry(ancien_vendeur).State = EntityState.Modified;
                        ancien_vendeur.Nom = vendeur.Nom;
                        ancien_vendeur.Type = vendeur.Type;
                        ancien_vendeur.Statut = vendeur.Statut;
                        ancien_vendeur.MotDePasse = vendeur.MotDePasse;
                        ancien_vendeur.Email = vendeur.Email;
                        ancien_vendeur.CompteBancaire = vendeur.CompteBancaire;
                        try
                        {
                            await _context.SaveChangesAsync();
                            Console.WriteLine("Mise à jour du vendeur effectuée avec succés");
                            return Ok(vendeur);
                        }
                        catch (DbUpdateException err)
                        {
                            throw new Exception($"Impossible de mettre à jour le vendeur: {err}");
                        }
                    }
                    else
                    {
                        if(await _context.Vendeurs.FindAsync(vendeur.IdPersonne) != null)
                        {
                            Console.WriteLine("L'identifiant du vendeur que avez entré est déjà present");
                            return BadRequest();
                        }
                        else
                        {
                            try
                            {
                                if (_context.Vendeurs.Remove(ancien_vendeur) == null)
                                {
                                    Console.WriteLine("La suppression de l'ancien vendeur est un echec");
                                    return BadRequest();
                                }
                                else
                                {
                                    await _context.SaveChangesAsync();
                                    Vendeur nouveau_vendeur_by_update = new Vendeur
                                    {
                                        IdPersonne = vendeur.IdPersonne,
                                        CompteBancaire = vendeur.CompteBancaire,
                                        Nom = vendeur.Nom,
                                        Type = vendeur.Type,
                                        Statut = vendeur.Statut,
                                        Email = vendeur.Email,
                                        MotDePasse = vendeur.MotDePasse,
                                    };
                                    if (await _context.Vendeurs.AddAsync(nouveau_vendeur_by_update) == null)
                                    {
                                        Console.WriteLine("La mise à jour forcée de vendeur a été un echec total");
                                        return BadRequest();
                                    }
                                    else
                                    {
                                        try
                                        {
                                            await _context.SaveChangesAsync();
                                            Console.WriteLine("Mise à jour forcée du vendeur effectuée avec succés");
                                            return Ok(vendeur);
                                        }
                                        catch (DbUpdateException err)
                                        {
                                            throw new Exception($"Erreur survenue lors de l'ajout du vendeur par mise à jour : {err}");
                                        }
                                    }
                                }
                            }
                            catch (DbUpdateException err)
                            {
                                throw new Exception($"Impossible de faire la mise à jour du vendeur: {err}");
                            }
                        }
                    }
                }
            }
        }

        [HttpDelete("{id_vendeur}")]
        public async Task<ActionResult> DeleteVendeur(string id_vendeur)
        {
            if (string.IsNullOrWhiteSpace(id_vendeur))
            {
                Console.WriteLine("Informations du compte bancaire non valides");
                return BadRequest();
            }
            else
            {
                var vendeur_to_delete = await _context.Vendeurs.FindAsync(id_vendeur);
                if (vendeur_to_delete == null) 
                {
                    Console.WriteLine("le vendeur à supprimer n'existe pas");
                    return NoContent();
                }
                else
                {
                    try
                    {
                        _context.Vendeurs.Remove(vendeur_to_delete);
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Vendeur supprimé avec succés");
                        return Ok();
                    }
                    catch (DbUpdateException err) 
                    {
                        return BadRequest();
                        throw new Exception($"Impossible de supprimer le vendeur: {err}");
                    }
                }
            }
        }
    }
}
