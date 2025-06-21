using Back_IHM.DataContext;
using Back_IHM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_IHM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvisAcheteurController: ControllerBase
    {
        private readonly IhmDBContext _context;
        public AvisAcheteurController(IhmDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Recuperer les listes des commandes sans aucun parametre
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvisAcheteur>>> GetAvis()
        {
            var avis = await _context.AvisAcheteurs.ToListAsync();
            if (avis.Count == 0)
                return NoContent();
            return Ok(avis);
        }

        /// <summary>
        /// Recuperation d'un paiement particulier par le parametre id
        /// </summary>
        /// <param name="id_avis"></param>
        /// <returns></returns>
        [HttpGet("{id_avis}")]
        public async Task<ActionResult<AvisAcheteur>> GetPaiement(string id_avis)
        {
            var avis = await _context.AvisAcheteurs.Where(a => a.IdAvis == id_avis).ToListAsync();
            if (avis == null)
            {
                Console.WriteLine("Aucun avis trouvé");
                return NoContent();
            }
            return Ok(avis);
        }

        /// <summary>
        /// Ajout d'un paiement dans la base  de donnees
        /// </summary>
        /// <param name="avis_acheteur"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPost]
        public async Task<ActionResult<AvisAcheteur>> AddAvis(AvisAcheteur avis)
        {
            if (string.IsNullOrWhiteSpace(avis.IdVendeur) || string.IsNullOrWhiteSpace(avis.IdAcheteur)
                || string.IsNullOrWhiteSpace(avis.Commentaire) || string.IsNullOrWhiteSpace(avis.IdAvis))
            {
                Console.WriteLine("Veuillez remplir tous les champs");
                return BadRequest();
            }
            else
            {
                if (await _context.AvisAcheteurs.FindAsync(avis.IdAvis) != null)
                {
                    Console.WriteLine("L'avis que vous essayez d'ajouter existe déjà");
                    return BadRequest();
                }
                else
                {
                    if (await _context.AvisAcheteurs.AddAsync(avis) == null)
                    {
                        Console.WriteLine("Echec de l'ajout de l'avis");
                        return NoContent();
                    }
                    try
                    {
                        await _context.SaveChangesAsync();
                        Console.WriteLine("Avis enregistré avec succés");
                        return Ok(avis);

                    }
                    catch (DbUpdateException err)
                    {
                        throw new Exception($"impossible d'enregistrer l'avis : {err}");
                    }
                }
            }
        }

        /// <summary>
        /// Mis a jour d'un avis particulier.On se base sur le fait que l'id ne doit pas etre modifier
        /// </summary>
        /// <param name="id_avis"></param>
        /// <param name="avis"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{id_avis}")]
        public async Task<ActionResult<AvisAcheteur>> UpdateAvis(string id_avis, AvisAcheteur avis)
        {
            if (string.IsNullOrWhiteSpace(avis.IdVendeur) || string.IsNullOrWhiteSpace(avis.IdAcheteur)
                || string.IsNullOrWhiteSpace(avis.Commentaire) || string.IsNullOrWhiteSpace(avis.IdAvis))
            {
                Console.WriteLine("Veuillez remplir les champs");
                return BadRequest();
            }
            else
            {
                var current_avis = await _context.AvisAcheteurs.FindAsync(id_avis);
                if (current_avis == null)
                {
                    Console.WriteLine("L' avis à mettre à jour est introuvable");
                    return NotFound();
                }
                else
                {
                    // Si  on ne modifie pas l'identifiant
                    if (current_avis.IdAvis == avis.IdAvis)
                    {
                        //L'objet existe deja dans la BD mais on indique a Ef qu'il a ete modifie
                        _context.Entry(current_avis).State = EntityState.Modified;
                        current_avis.IdAcheteur = avis.IdAcheteur;
                        current_avis.IdVendeur = avis.IdVendeur;
                        current_avis.NoteAvis = avis.NoteAvis;
                        current_avis.Commentaire = avis.Commentaire;
                        current_avis.DateAvis = avis.DateAvis;

                        try
                        {
                            await _context.SaveChangesAsync();
                            Console.WriteLine("Mise à jour de l'avis enrigistrée avec succés");
                            return Ok(avis);
                        }
                        catch (DbUpdateException err)
                        {
                            throw new Exception($"Impossible de mettre à jour l' avis: {err}");
                        }
                    }
                    else
                    {
                        // Si on modifie l'identifiant
                        if (await _context.AvisAcheteurs.FindAsync(avis.IdAvis) != null)
                        {
                            Console.WriteLine("L'identifiant de l'avis que vous avez entré est déjà present");
                            return BadRequest();
                        }
                        else
                        {
                            try
                            {
                                if (_context.AvisAcheteurs.Remove(current_avis) == null)
                                {
                                    Console.WriteLine("La suppression de l'ancien avis a été un echec");
                                    return BadRequest();
                                }
                                else
                                {
                                    await _context.SaveChangesAsync();
                                    AvisAcheteur new_avis = new AvisAcheteur
                                    {
                                        IdAvis = avis.IdAvis,
                                        DateAvis = avis.DateAvis,
                                        IdVendeur = avis.IdVendeur,
                                        IdAcheteur = avis.IdAcheteur,
                                        NoteAvis = avis.NoteAvis,
                                        Commentaire = avis.Commentaire,
                                    };
                                    if (await _context.AvisAcheteurs.AddAsync(avis) == null)
                                    {
                                        Console.WriteLine("Echec de la mise à jour forcé de l'avis");
                                        return BadRequest();
                                    }
                                    else
                                    {
                                        try
                                        {
                                            await _context.SaveChangesAsync();
                                            Console.WriteLine("Mise à jour forcé du paiement effectuée avec succés");
                                            return Ok(avis);
                                        }
                                        catch (DbUpdateException err)
                                        {
                                            throw new Exception($"Erreur survenue lors de l'ajout de l'avis par mise à jour : {err}");
                                        }
                                    }
                                }
                            }
                            catch (DbUpdateException err)
                            {
                                throw new Exception($"Impossible de faire la mise à jour forcé de l'avis: {err}");
                            }
                        }
                    }
                }
            }
        }

        [HttpDelete("{id_avis}")]
        public async Task<ActionResult> DeletePaiement(string id_avis)
        {
            var avis_to_delete = await _context.AvisAcheteurs.FindAsync(id_avis);
            if (avis_to_delete == null)
            {
                Console.WriteLine("l'avis à supprimer est introuvable");
                return NoContent();
            }
            else
            {
                try
                {
                    _context.AvisAcheteurs.Remove(avis_to_delete);
                    await _context.SaveChangesAsync();
                    Console.WriteLine("Avis supprimé avec succés");
                    return Ok();
                }
                catch (DbUpdateException err)
                {
                    return BadRequest();
                    throw new Exception($"Echec de suppression de l' avis: {err}");

                }
            }
        }
    }
}
