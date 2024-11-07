import React from 'react';
import './Abonnement.css'; // Add your CSS file

function Abonnement() {
  return (
    <div className="abonnement">
      <div className="abonnement_overlay">
        <h1>190 Kr/mnd</h1>
        <p>Valgfritt brød på døren</p>
        <p>Hver torsdag kl 08:00</p>
        <button className="subscribe-button">Abonner</button>
      </div>
    </div>
  );
}

export default Abonnement;
