"use client"

import React, { useState } from 'react';
import './kontakt_oss.css';
import Footer from "../components/Footer/footer";

const KontaktOss: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
  
    // Construct the mailto link
    const mailtoLink = `mailto:karlsson-brodbakst@hotmail.com?subject=Kontakt fra ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`  Melding:
  ${message}
  
  Mvh,
  Navn: ${name}
  E-post: ${email}
    `)}`;
  
    // Open the mailto link
    window.location.href = mailtoLink;
  };
  

  return (
    <div className="kontakt-oss-page">
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

        <form className="kontakt-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Navn/Bedrift:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Skriv ditt navn"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-post:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Skriv din e-post"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Melding:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Skriv din melding"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send melding</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default KontaktOss;
