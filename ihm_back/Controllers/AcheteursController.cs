using Back_IHM.DataContext;
using Back_IHM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_IHM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcheteurController: ControllerBase
    {
        private readonly IhmDBContext _context;
        public AcheteurController(IhmDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Acheteur>>> GetAcheteurs()
        {
            var acheteur_voulu = await _context.Acheteurs.ToListAsync();
            if (acheteur_voulu.Count.Equals(0))
                return NoContent();
            return Ok(acheteur_voulu);
        }

        /// <summary>
        /// Permettre la connexion de l'acheteur grace a son email et son mot de passe
        /// </summary>
        /// <param name="id_personne"></param>
        /// <returns></returns>
        [HttpGet("{id_personne}")]
        public async Task<ActionResult<Acheteur>> Connecter(string id_personne)
        {
            var acheteur = await _context.Acheteurs.FindAsync(id_personne);
            if (acheteur == null)
            {
                Console.WriteLine("L'acheteur n'est pas present dans la base de donnees");
                return BadRequest("L'acheteur n'est pas present dans la base de donnees");
            }
            else
            {
                return Ok(acheteur);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Acheteur>> Inscription(Acheteur acheteur)
        {
            if (string.IsNullOrWhiteSpace(acheteur.CompteBancaire) || string.IsNullOrWhiteSpace(acheteur.Nom) ||
                string.IsNullOrWhiteSpace(acheteur.Email))
            {
                Console.WriteLine("Les informations entrées sont invalides");
                return BadRequest();
            }
            else
            {
                if (await _context.Acheteurs.FindAsync(acheteur.IdPersonne) != null)
                {
                    Console.WriteLine("L'acheteur que vous essayez d'ajouter existe déjà");
                    return BadRequest();
                }
                else
                {
                    if (await _context.Acheteurs.Where(a => a.Email == acheteur.Email).FirstOrDefaultAsync() != null)
                    {
                        Console.WriteLine("L'email que vous essayer d'utiliser existe déjà");
                        return BadRequest("L'email que vous essayer d'utiliser existe déjà");
                    }
                    else
                    {
                        if (await _context.Acheteurs.AddAsync(acheteur) == null)
                        {
                            Console.WriteLine("L'ajout de l'acheteur a été un echec");
                            return NoContent();
                        }
                        try
                        {
                            await _context.SaveChangesAsync();
                            Console.WriteLine("Acheteur ajouté avec succés");
                            return Ok(acheteur);

                        }
                        catch (DbUpdateException err)
                        {
                            throw new Exception($"Impossible d'ajouter l'acheteur : {err}");
                        }
                    }

                }
            }

        }

        [HttpPut("{id_personne}")]
        public async Task<IActionResult> UpdateAcheteur(string id_personne, Acheteur acheteur)
        {
            if (string.IsNullOrWhiteSpace(acheteur.CompteBancaire) || string.IsNullOrWhiteSpace(acheteur.Nom) ||
                 string.IsNullOrWhiteSpace(acheteur.Email))
            {
                Console.WriteLine("Les informations entrées sont invalides");
                return BadRequest();
            }
            else
            {
                var ancien_acheteur = await _context.Acheteurs.FindAsync(id_personne);
                if (ancien_acheteur == null)
                {
                    Console.WriteLine("L'acheteur à mettre à jour n'existe pas");
                    return NotFound();
                }
                else
                {
                    //Le scenario le plus probable ou l'on ne modifie pas l'CompteBancaire
                    if (ancien_acheteur.IdPersonne == acheteur.IdPersonne)
                    {
                        //L'objet existe deja dans la BD mais on indique a Ef qu'il a ete modifie
                        _context.Entry(ancien_acheteur).State = EntityState.Modified;
                        ancien_acheteur.Nom = acheteur.Nom;
                        ancien_acheteur.Email = acheteur.Email;
                        ancien_acheteur.CompteBancaire = acheteur.CompteBancaire;
                        ancien_acheteur.MotDePasse = acheteur.MotDePasse;

                        try
                        {
                            await _context.SaveChangesAsync();
                            Console.WriteLine("Mise à jour de l'acheteur effectué avec succés");
                            return Ok(acheteur);
                        }
                        catch (DbUpdateException err)
                        {
                            throw new Exception($"Impossible de mettre à jour l'acheteur: {err}");
                        }
                    }
                    else
                    {
                        if (await _context.Acheteurs.FindAsync(acheteur.IdPersonne) != null)
                        {
                            Console.WriteLine("L'identifiant de l'acheteur que avez entré est déjà present");
                            return BadRequest();
                        }
                        else
                        {
                            try
                            {
                                if (_context.Acheteurs.Remove(ancien_acheteur) == null)
                                {
                                    Console.WriteLine("La suppression de l'ancien acheteur a été un echec");
                                    return BadRequest();
                                }
                                else
                                {
                                    await _context.SaveChangesAsync();
                                    Acheteur nouveau_acheteur_by_update = new Acheteur
                                    {
                                        IdPersonne = acheteur.IdPersonne,
                                        CompteBancaire = acheteur.CompteBancaire,
                                        Nom = acheteur.Nom,
                                        Email = acheteur.Email,
                                        MotDePasse = acheteur.MotDePasse,
                                    };
                                    if (await _context.Acheteurs.AddAsync(nouveau_acheteur_by_update) == null)
                                    {
                                        Console.WriteLine("La mise à jour forcé de l'acheteur a été un echec");
                                        return BadRequest();
                                    }
                                    else
                                    {
                                        try
                                        {
                                            await _context.SaveChangesAsync();
                                            Console.WriteLine("Mise à jour forcé de l'acheteur effectuée avec succés");
                                            return Ok(acheteur);
                                        }
                                        catch (DbUpdateException err)
                                        {
                                            throw new Exception($"Erreur survenue lors de l'ajout de l'acheteur par mise à jour : {err}");
                                        }
                                    }
                                }
                            }
                            catch (DbUpdateException err)
                            {
                                throw new Exception($"Impossible de faire la mise à jour forcé de l'acheteur: {err}");
                            }
                        }

                    }

                }
            }

        }

        [HttpDelete("{id_personne}")]
        public async Task<IActionResult> DeleteAcheteur(string id_personne)
        {
            var acheteur = await _context.Acheteurs.FindAsync(id_personne);
            if (acheteur == null)
            {
                Console.WriteLine("L'acheteur que vous essayez de supprimer est introuvable");
                return NotFound();
            }
            else
            {
                try
                {
                    _context.Acheteurs.Remove(acheteur);
                    await _context.SaveChangesAsync();
                    Console.WriteLine("Acheteur supprimé avec succés");
                    return NoContent();
                }
                catch (DbUpdateException err)
                {
                    return BadRequest();
                    throw new Exception($"Impossible de supprimer l'acheteur : {err}");

                }
            }

        }
    }
}
