// pages/Kontakt_oss.tsx

import React from 'react';
import './kontakt_oss.css';

const KontaktOss: React.FC = () => {
  return (
    <div className="kontakt-oss-container">
      <h1>Kontakt Oss</h1>
      <p className="kontakt-description">
        Vi vil gjerne høre fra deg! Fyll ut skjemaet nedenfor eller ta kontakt via våre kontaktopplysninger.
      </p>

      <div className="kontakt-info">
        <p><strong>Telefon:</strong> +47 123 45 678</p>
        <p><strong>E-post:</strong> kontakt@eksempel.no</p>
        <p><strong>Adresse:</strong> Eksempelgate 12, 1234 Oslo, Norge</p>
      </div>

      <form className="kontakt-form">
        <div className="form-group">
          <label htmlFor="name">Navn:</label>
          <input type="text" id="name" name="name" placeholder="Skriv ditt navn" />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input type="email" id="email" name="email" placeholder="Skriv din e-post" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Melding:</label>
          <textarea id="message" name="message" placeholder="Skriv din melding"></textarea>
        </div>
        <button type="submit" className="submit-button">Send melding</button>
      </form>
    </div>
  );
};

export default KontaktOss;
