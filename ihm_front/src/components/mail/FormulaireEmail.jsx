import React, { useState } from 'react';
import { envoyerEmailReactPur } from './envoyerEmailReactPur';

const FormulaireEmail = () => {
  const [email, setEmail] = useState('');
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');
  const [resultat, setResultat] = useState('');

  const handleEnvoyer = async () => {
    const res = await envoyerEmailReactPur(email, sujet, message);
    setResultat(res.message);
  };

  return (
    <div>
      <h2>Envoyer un email</h2>
      <input type="email" placeholder="Adresse email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Sujet" value={sujet} onChange={e => setSujet(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleEnvoyer}>Envoyer</button>
      {resultat && <p>{resultat}</p>}
    </div>
  );
};

export default FormulaireEmail;
// import react from react;

//  function FormulaireEmail(){
//   return(
//     <h1>on essaie</h1>
//   )
// }
// export default FormulaireEmail