namespace Back_IHM.Models
{
    public class ArticleDTO
    {
        public string CodeBar { get; set; }
        public string NomArticle { get; set; }
        public string Description { get; set; }
        public string Marque { get; set; }
        public string Categorie { get; set; }
        public string VendeurId { get; set; }
        public int Prix {  get; set; }
        public string? Image {  get; set; }
    }
}
