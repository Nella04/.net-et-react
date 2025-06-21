import emailjs from '@emailjs/browser';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Envoie un email via EmailJS depuis le frontend
 * @param {string} email - L'adresse du destinataire
 * @param {string} sujet - Le sujet de l'email
 * @param {string} message - Le contenu du message
 * @returns {Promise<{success: boolean, message: string}>}
 */


//service_qahmgov
// API keys
// Public Key
// j51Q3yGODaF5Enr-S
// Private Key
// faBtGo1MXovoCObUF0fpl


export async function envoyerEmailReactPur(email, sujet, message) {
  if (!emailRegex.test(email)) {
    return { success: false, message: "Adresse email invalide." };
  }

  const params = {
    to_email: email,
    title: sujet,     // changé de sujet → title
    message,
    email,            // pour le Reply To
  };

  try {
    const result = await emailjs.send(
      'service_qahmgov',
      'template_f1tcg6m',
      params,
      'j51Q3yGODaF5Enr-S'
    );

    return { success: true, message: "Email envoyé avec succès." };
  } catch (error) {
    return { success: false, message: `Erreur : ${error.text || error.message}` };
  }
}

