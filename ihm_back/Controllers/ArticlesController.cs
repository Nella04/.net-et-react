using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back_IHM.DataContext;
using Back_IHM.Models;
using Microsoft.CodeAnalysis.Elfie.Serialization;

namespace Back_IHM.Controllers
{
    /// <summary>
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IhmDBContext _context;

        public ArticlesController(IhmDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            var article_voulu = await _context.Articles.ToListAsync();
            if (article_voulu.Count.Equals(0))
                return NoContent();
            return Ok(article_voulu);
        }

        /// <summary>
        /// Recuperer un article particulier  par son codebar
        /// </summary>
        /// <param name="codebar"></param>
        /// <returns></returns>
        [HttpGet("{codebar}")]
        public async Task<ActionResult<Article>> GetArticleByCodeBar(string codebar)
        {
            var article_voulu = await _context.Articles.FindAsync(codebar);
            if (article_voulu == null)
            {
                Console.WriteLine("Article introuvable");
                return NotFound();
            }
            else
            {
                var vendeur_de_article = await _context.Vendeurs.FindAsync(article_voulu.VendeurId);
                if (vendeur_de_article == null)
                {
                    Console.WriteLine("Impossible de récuperer les informations sur le vendeur de l'article");
                    return NoContent();
                }
                else
                {
                    //Trop la flemme de faire des LINQ donc un objet anonyme pour faciliter le taff
                    var article_avec_vendeur = await (
                        from article in _context.Articles
                        join vendeur in _context.Vendeurs on article.VendeurId equals vendeur.IdPersonne
                        where article.CodeBar == codebar
                        select new
                        {
                            Article = article,
                            Vendeur = vendeur
                        }
                        ).FirstOrDefaultAsync();
                    return Ok(article_avec_vendeur);
                }
            }
        }

        /// <summary>
        /// Obtenir article par categorie
        /// </summary>
        /// <param name="categorie"></param>
        /// <returns></returns>
        [HttpGet("getByCategorie/{categorie}")]
        public async Task<ActionResult<Article>> GetArticleByCategorie(string categorie)
        {
            var article_by_categorie = await _context.Articles.Where(article=>article.Categorie==categorie).GroupBy(article => article.Categorie).ToListAsync();
            if (article_by_categorie.Count == 0)
            {
                Console.WriteLine("Aucun article n'appartient à cette categorie");
                return NoContent();
            }
            else
                return Ok(article_by_categorie);
        }

        /// <summary>
        /// Obtenir article par categorie
        /// </summary>
        /// <param name="id_vendeur"></param>
        /// <returns></returns>
        [HttpGet("getByVendeur/{id_vendeur}")]
        public async Task<ActionResult<Article>> GetArticleByVendeur(string id_vendeur)
        {
            var article_by_vendeur = await _context.Articles.Where(article => article.VendeurId == id_vendeur).GroupBy(article => article.VendeurId).ToListAsync();
            if (article_by_vendeur.Count == 0)
            {
                Console.WriteLine("Aucun article trouvé pour ce vendeur");
                return NoContent();
            }
            else
                return Ok(article_by_vendeur);
        }

        /// <summary>
        /// <param name="article"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        /// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// POST: api/Articles
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Article>> AddArticle(ArticleDTO articleDTO)
        {
            if(string.IsNullOrWhiteSpace(articleDTO.NomArticle) || string.IsNullOrWhiteSpace(articleDTO.Marque) || string.IsNullOrWhiteSpace(articleDTO.Description) ||
                string.IsNullOrWhiteSpace(articleDTO.Categorie) || string.IsNullOrWhiteSpace(articleDTO.CodeBar) || string.IsNullOrWhiteSpace(articleDTO.VendeurId))
            {
                Console.WriteLine("Les informationns entrées sont invalides");
                return BadRequest("Champs requis manquantes!");
            }

            var vendeur = await _context.Vendeurs.FindAsync(articleDTO.VendeurId);
            if (vendeur == null)
            {
                Console.WriteLine("Le vendeur de l'article est introuvable");
                return NotFound("Le vendeur de l'article est introuvable");
            }

            if(await _context.Articles.FindAsync(articleDTO.CodeBar) != null)
            {
                Console.WriteLine("Ce code d'article existe déjà");
                return BadRequest();
            }

            byte[]? imageBytes = null;
            if (!string.IsNullOrWhiteSpace(articleDTO.Image))
            {
                try
                {
                    imageBytes = Convert.FromBase64String(articleDTO.Image);
                }
                catch
                {
                    Console.WriteLine("Image invalide!");
                    return BadRequest("Image invalide!");
                }
            }

            var article = new Article
            {
                CodeBar = articleDTO.CodeBar,
                NomArticle = articleDTO.NomArticle,
                Description = articleDTO.Description,
                Marque = articleDTO.Marque,
                Prix = articleDTO.Prix,
                Categorie = articleDTO.Categorie,
                VendeurId = articleDTO.VendeurId,
                Image = imageBytes
            };
            await _context.SaveChangesAsync();
            Console.WriteLine("Articles ajouté avec succés");
            return Ok(article);
        }

        /// <summary>
        /// PUT: api/Articles/5
        /// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// </summary>
        /// <param name="codebar"></param>
        /// <param name="article"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>{codebar}")]
        [HttpPut("{codebar}")]
        public async Task<ActionResult<Article>> UpdateArticle(string codebar, Article article)
        {
            if(string.IsNullOrWhiteSpace(article.CodeBar) || string.IsNullOrWhiteSpace(article.Marque) || string.IsNullOrWhiteSpace(article.Description) ||
                string.IsNullOrWhiteSpace(article.Marque) || string.IsNullOrWhiteSpace(article.NomArticle) || string.IsNullOrWhiteSpace(article.VendeurId)
                || article.Prix == 0)
            {
                Console.WriteLine("Les informations entrées sont invalides");
                return BadRequest();
            }
            else
            {
                var ancien_article = await _context.Articles.FindAsync(codebar);
                if (ancien_article == null)
                {
                    Console.WriteLine("L'article que vous essayez de mettre à jour n'existe pas");
                    return NotFound();
                }
                else
                {
                    if (await _context.Vendeurs.FindAsync(article.VendeurId) == null)
                    {
                        Console.WriteLine("Le vendeur de l'article est introuvable");
                        return BadRequest("Le vendeur de l'article est introuvable");

                    }
                    else
                    {
                        if (ancien_article.CodeBar == article.CodeBar)
                        {
                            _context.Entry(ancien_article).State = EntityState.Modified;
                            ancien_article.NomArticle = article.NomArticle;
                            ancien_article.Description = article.Description;
                            ancien_article.Marque = article.Marque;
                            ancien_article.Categorie = article.Categorie;
                            ancien_article.Prix = article.Prix;
                            ancien_article.Image = article.Image;
                            ancien_article.VendeurId = article.VendeurId;
                            try
                            {
                                await _context.SaveChangesAsync();
                                Console.WriteLine("Article mis à jour avec succés");
                                return Ok(ancien_article);
                            }
                            catch (DbUpdateException err)
                            {
                                return BadRequest();
                                throw new Exception($"Impossible de mettre à jour l'article: {err}");
                            }
                        }
                        else
                        {
                                _context.Articles.Remove(ancien_article);
                                try
                                {
                                    await _context.SaveChangesAsync();
                                    Article new_article = new Article
                                    {
                                        CodeBar = article.CodeBar,
                                        NomArticle = article.NomArticle,
                                        Description = article.Description,
                                        Marque = article.Marque,
                                        Categorie = article.Categorie,
                                        Prix = article.Prix,
                                        Image = article.Image,
                                        VendeurId = article.VendeurId
                                    };
                                    if (await _context.Articles.AddAsync(new_article) == null)
                                    {
                                        Console.WriteLine("L'ajout forcing de l'article à été un echec");
                                        return BadRequest();
                                    }
                                    else
                                    {
                                        await _context.SaveChangesAsync();
                                        Console.WriteLine("Mise à jour forcing de l'article effectuée avec succés");
                                        return Ok(new_article);
                                    }
                                }
                                catch (DbUpdateException err)
                                {
                                    return BadRequest();
                                    throw new Exception($"Impossible de forcer l'update de l'article: {err}");
                                }

                        }
                    }
                }
                 
            }
        }


        /// <summary>
        /// Suppression de l'article
        /// </summary>
        /// <param name="codebar"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpDelete("{codebar}")]
        public async Task<ActionResult<Article>> DeleteArticle(string codebar)
        {
            var article_to_delete = await _context.Articles.FindAsync(codebar);
            if (article_to_delete == null)
            {
                Console.WriteLine("L'article que vous essayez d'effacer n'existe pas");
                return NotFound();
            }
            else
            {
                _context.Articles.Remove(article_to_delete);
                try
                {
                    await _context.SaveChangesAsync();
                    Console.WriteLine("Suppression de  l'article effectuee  avec success");
                    return Ok(article_to_delete);
                }catch(DbUpdateException err)
                {
                    return NoContent();
                    throw new Exception($"Impossible d'effacer l'article: {err}");
                }
               
            }
            
        }

    }
}

