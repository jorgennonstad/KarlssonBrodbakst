// pages/Kontakt_oss.tsx

import React from 'react';
import './Kontakt_oss.css';
import Footer from "../components/Footer/footer";

const KontaktOss: React.FC = () => {
  return (
    <div className='kontakt-oss-page'>
      <div className="kontakt-oss-container">
        <h1>Kontakt Oss</h1>
        <p className="kontakt-description">
          Vi vil gjerne høre fra deg! Fyll ut skjemaet nedenfor eller ta kontakt via våre kontaktopplysninger.
        </p>

        <div className="kontakt-info">
          <p><strong>Telefon:</strong> +47 907 09 117</p>
          <p><strong>E-post:</strong> karlsson-brodbakst@hotmail.com</p>
          <p><strong>Adresse:</strong> Hunnsvegen 4B, 2821 Gjøvik</p>
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
      <Footer />
    </div>
    
  );
};

export default KontaktOss;
