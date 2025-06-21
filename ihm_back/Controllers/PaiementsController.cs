using Back_IHM.DataContext;
using Back_IHM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_IHM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaiementController: ControllerBase
    {
        private readonly IhmDBContext _context;
        public PaiementController(IhmDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Recuperer les listes des commandes sans aucun parametre
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paiement>>> GetPaiements()
        {
            var paiements = await _context.Paiements.ToListAsync();
            if (paiements.Count == 0)
                return NoContent();
            return Ok(paiements);
        }

        /// <summary>
        /// Recuperation d'un paiement particulier par le parametre id
        /// </summary>
        /// <param name="id_paiement"></param>
        /// <returns></returns>
        [HttpGet("{id_paiement?}")]
        public async Task<ActionResult<Commande>> GetPaiement(string id_paiement)
        {
            var paiement = await _context.Paiements.Where(p => p.IdPaiement == id_paiement).ToListAsync();
            if (paiement == null)
            {
                Console.WriteLine("Aucune commande trouvée");
                return NoContent();
            }
            return Ok(paiement);
        }

        /// <summary>
        /// Ajout d'un paiement dans la base  de donnees
        /// </summary>
        /// <param name="paiement"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPost]
        public async Task<ActionResult<Paiement>> AddPaiement(Paiement paiement)
        {
            if (string.IsNullOrWhiteSpace(paiement.IdPaiement) || string.IsNullOrWhiteSpace(paiement.IdCommande)
                || string.IsNullOrWhiteSpace(paiement.Recu))
            {
                Console.WriteLine("Veuillez remplir tous les champs");
                return BadRequest();
            }
            else
            {
                if (await _context.Paiements.FindAsync(paiement.IdPaiement) != null)
                {
                    Console.WriteLine("Le paiement que vous essayez d'enregistrer existe déjà");
                    return BadRequest();
                }
                else
                {
                    if (await _context.Paiements.AddAsync(paiement) == null)
                    {
                        Console.WriteLine("Echec de l'ajout du paiement");
                        return NoContent();
                    }
                    try
                    {
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Paiement effectué avec succés");
                        return Ok(paiement);

                    }
                    catch (DbUpdateException err)
                    {
                        throw new Exception($"impossible d'ajouter le paiement : {err}");
                    }
                }
            }
        }

        /// <summary>
        /// Mis a jour d'un commande particulier.On se base sur le fait que l'id ne doit pas etre modifier
        /// </summary>
        /// <param name="id_paiement"></param>
        /// <param name="paiement"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{id_paiement}")]
        public async Task<ActionResult<Acheteur>> UpdatePaiement(string id_paiement, Paiement paiement)
        {
            if (string.IsNullOrWhiteSpace(paiement.IdCommande) || string.IsNullOrWhiteSpace(paiement.IdPaiement)
                || string.IsNullOrWhiteSpace(paiement.Recu))
            {
                Console.WriteLine("Veuillez remplir les champs");
                return BadRequest();
            }
            else
            {
                var current_paiement = await _context.Paiements.FindAsync(id_paiement);
                if (current_paiement == null)
                {
                    Console.WriteLine("La commande à mettre à jour est introuvable");
                    return NotFound();
                }
                else
                {
                    // Si  on ne modifie pas l'identifiant
                    if (current_paiement.IdPaiement == paiement.IdPaiement)
                    {
                        //L'objet existe deja dans la BD mais on indique a Ef qu'il a ete modifie
                        _context.Entry(current_paiement).State = EntityState.Modified;
                        current_paiement.IdCommande = paiement.IdCommande;
                        current_paiement.DatePaiement = paiement.DatePaiement;
                        current_paiement.Recu = paiement.Recu;

                        try
                        {
                            await _context.SaveChangesAsync();
                            Console.WriteLine("Mise à jour du paiement effectué avec succés");
                            return Ok(paiement);
                        }
                        catch (DbUpdateException err)
                        {
                            throw new Exception($"Impossible de mettre à jour le paiement: {err}");
                        }
                    }
                    else
                    {
                        if (await _context.Paiements.FindAsync(paiement.IdPaiement) != null)
                        {
                            Console.WriteLine("L'identifiant du paiement que avez entre existe déjà");
                            return BadRequest();
                        }
                        else
                        {
                            try
                            {
                                if (_context.Paiements.Remove(current_paiement) == null)
                                {
                                    Console.WriteLine("La suppression de l'ancien paiment a été");
                                    return BadRequest();
                                }
                                else
                                {
                                    await _context.SaveChangesAsync();
                                    Paiement new_paiement = new Paiement
                                    {
                                        IdPaiement = paiement.IdPaiement,
                                        IdCommande = paiement.IdCommande,
                                        DatePaiement = paiement.DatePaiement,
                                        Recu = paiement.Recu,
                                    };
                                    if (await _context.Paiements.AddAsync(paiement) == null)
                                    {
                                        Console.WriteLine("La mise à jour forcée du paiement a été un echec.");
                                        return BadRequest();
                                    }
                                    else
                                    {
                                        try
                                        {
                                            await _context.SaveChangesAsync();
                                            Console.WriteLine("Mise à jour forcée du paiement effectuée avec succés");
                                            return Ok(paiement);
                                        }
                                        catch (DbUpdateException err)
                                        {
                                            throw new Exception($"Erreur survenue lors de l'ajout du paiement par mise à jour : {err}");
                                        }
                                    }
                                }
                            }
                            catch (DbUpdateException err)
                            {
                                throw new Exception($"Impossible de faire la mise à jour forcée du paiement: {err}");
                            }
                        }
                    }
                }
            }
        }

        [HttpDelete("{id_paiement}")]
        public async Task<ActionResult> DeletePaiement(string id_paiement)
        {
            if (string.IsNullOrWhiteSpace(id_paiement))
            {
                Console.WriteLine("ID introuvable");
                return BadRequest();
            }
            else
            {
                var paiement_to_delete = await _context.Paiements.FindAsync(id_paiement);
                if (paiement_to_delete == null)
                {
                    Console.WriteLine("Le paiement à supprimer est introuvable");
                    return NoContent();
                }
                else
                {
                    try
                    {
                        _context.Paiements.Remove(paiement_to_delete);
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Paiement supprimé avec succés");
                        return Ok();
                    }
                    catch (DbUpdateException err)
                    {
                        return BadRequest();
                        throw new Exception($"Impossible de supprimer le paiement: {err}");

                    }
                }
            }
        }
    }
}
