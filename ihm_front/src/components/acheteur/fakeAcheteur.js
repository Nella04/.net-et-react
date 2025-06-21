import acheteur from "../../assets/acheteur.jpg"

const fakeAcheteur = {

    id_acheteur : "ACH001", 
    email_acheteur : "chris@gmail.com", 
    nom_acheteur : "Chris Tinah", 
    phone_acheteur : "+261 38 123 45 698", 
    address_acheteur : "Lot II A Mada", 
    gender_acheteur : "Feminin", 
    profilePicture : acheteur,  
    orders : [
        {
            id_commande : "CMD001", 
            date_commande : "2025-04-20", 
            montant : 12000, 
            etat_commande : "Payee", 
            items : [
                { name : 'Tshirt bleu', quantite : 1}, 
                { name : 'Jupe noire', quantite : 2}, 
            ]
        }, 
        {
            id_commande : "CMD002", 
            date_commande : "2025-05-20", 
            montant : 18000, 
            etat_commande : "Livree",
            items : [
                { name : 'Table à manger', quantite : 1}, 
            ]
        }, 
        {
            id_commande : "CMD007", 
            date_commande : "2025-08-20", 
            montant : 50000, 
            etat_commande : "En cours",
            items : [
                { name : 'Pomme de terre', quantite : '20kg'}, 
                { name : 'Courgette', quantite : '10kg'}, 
            ]
        }, 
        
        
    ], 
    paiementMethode : [
        {
            type : "Visa", 
            code : "1234"
        }
    ], 
    security : {
        lastLogin : "2025-05-01 10:00", 
        twoFactorEnabled : false
    }, 
    wishlist : [
        "Chaussure converse"
    ]
}; 
export default fakeAcheteur ; 