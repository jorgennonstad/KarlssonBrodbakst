// components/Footer.tsx

import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src="/path/to/logo.png" alt="Company Logo" className="footer-logo" />
        </div>

        <div className="footer-section map-section">
          <h3>Vårt Sted</h3>
          <div className="map-placeholder">
            {/* Placeholder for a map - replace with an embedded map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509429!2d144.9630577157582!3d-37.81627974283485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f7f6b4e38ad3!2sFederation+Square!5e0!3m2!1sen!2sau!4v1511363798296"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="footer-section contact-section">
          <h3>Kontaktinformasjon</h3>
          <p><strong>Telefon:</strong> +47 907 09 117</p>
          <p><strong>E-post:</strong> karlsson-brodbakst@hotmail.com</p>
          <p><strong>Adresse:</strong> Smakfullt hunnsvegen 4B 2821 Gjøvik</p>
          <p><strong>Org. Nr.:</strong> 931 346 113</p>
        </div>

        <div className="footer-section hours-section">
          <h3>Åpningstider</h3>
          <p><strong>Mandag - Fredag:</strong> 09:00 - 17:00</p>
          <p><strong>Lørdag:</strong> 10:00 - 14:00</p>
          <p><strong>Søndag:</strong> Stengt</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
